---
bookName: "Fluent React"
chapterTitle: "Chapter 7. Concurrent React"
updatedAt: 2024-10-15
---

# Chapter 7. Concurrent React

(the details about react fiber architecture arelikely to change in the future, so we only focus on main idea)

## The Problem with Synchronous Rendering

rendering in sync blocks the main thread which can lead to a poor UI experience, and has no sense of priority which can lead to critical UI updates being blocked by less iportant ones.

concurrent rendering allows react to prioritize more important updates such as user interactions, and makes it able to break down the rendering process into smaller chunks to be processed incrementally.

## Revisiting Fiber

The Fiber Reconciler improves the responsiveness and performance of React applicationsthis by breaking the rendering process into smaller, more manageable units of work called fibers. This allows React to pause, resume, and prioritize rendering tasks, making it possible to defer or schedule updates based on their importance. This improves the responsiveness of the application and ensures that critical updates are not blocked by less important tasks.

## Scheduling and Deferring Updates

it is a system that allows the reconciler to schedule updates either immedietly or later, using browser APIs like "setTimeout", "MessageChannel", and others.

for example, in a real time chat app we want to prioritize user interactions (typing and submitting messages) while ensuring that incoming messages are rendered without blocking the UI.

by default, react will give default priority to updating the text input as well as rendering messages list, thus blocking the UI to render the messages in case a new message arrives.

to defer rendering messages we can wrap it in a "startTransition", which gives it lower priority, so it can render without blocking the UI.

## Diving Deeper

### The Scheduler

is a standalone package that provides timing-related utilities, independent of the Fiber reconciler. it enables the reconciler to prioritize and organize updates base on their urgency using render lanes.

the scheduler's main task is managing the yeilding of the main thread by scheduling microtasks.

microtasks are a concept in JS event loop, the event loop manages async tasks by operating on 2 queues, micro and macro tasks.

the macro task queue handles tasks such as events, timeouts and intervals, IO operations. these tasks are processed one at atime, and the next task is picked up only after the current one is completed.

the micro task queue handles micro tasks (duh!). A microtask is a smaller, more immediate task. examples include promises, Object.observe, and MutationObserver.

after the JS engine processes a macro task, it checks the micro task queue if it has any tasks, if so it processes them all before moving on. thus micro tasks are given priority and handled before any macro tasks like rendering or handling events.

a micro task can add more micro tasks to the event loop, leading to a situation called starvation, where the micro task queue never ends.

react assigns a micro task for processing the fiber tree root.

### Render Lanes

A lane is a unit of work that represents a priority level and can be processed by React as part of its rendering cycle.

the conceptof render lanes was introduced in react 18 as a replacement for expiration times scheduling mechanism.

some lanes are:

SyncHydrationLane: for click events during hydration.
SyncLane: for click events.
InputContinuousHydrationLane: for continuous events like hover and scroll during hydration.
InputContinuousLane: for continuous events after hydration
DefaultLane: for network updates, timeouts, and the initial render.
TransitionHydrationLane: for transitions during hydration.
TransitionLanes: for transitions after hydration.
RetryLanes: for suspense retries

(these lanes are subject and likely to change. however, the main idea is still the same)

### How Render Lanes Work

react collects all updates that have been scheduled since the last render and assigns them lanes based on priority.

to determine the priority react need to determine the type of the update, user interaction, internal update due to changes in props or state, a server response, ...etc. then it estimates the priority based on the type.

in some cases the developer can override the default priority using "useTransition" and "useDeferredValue" and other react APIs, in such cases react assignes the new priority instead of the default one using a bitamask.

react processes the lanes one by one starting with the highest priority lane, updates in the same lane are batched together and processed in a single pass.

after processing the updates, they are commited to the DOM, effects are run, and other optimizations take place.

this process is repeated for eaveevery render.

many details take place in this cycle such as entanglement which decided when 2 lanes need to be processed together, flushing effects before / after updates, rebasing updates, ...etc.

## useTransition

this is a react hook that allows us to wrap heavy and disruptive UI updates in a transition, which is in a less priority lane than regular updates in order to maintain smoother user experience.

the hook returns a booean to indicate weather the transition finished or not, and a startTransition function to wrap our updates with it.

## useDeferredValue

this is a react hook that allows us to defer the update of some state involved in computationally heavy tasks. resultin in smoother UI.

it uses trasnitions internally to delay the update of the state value to allow high priority updates to finish first.

similar to the idea of "stale-while-revalidate" where the old data is kept untill the update is finished and the new data is ready to be displayed.

### Purpose of useDeferredValue

it allows react to interrupt and stop older rerenders of components if the deferred data changes

for computationally heavy components, instead of passing the state we can pass deffered state so we make sure that the heavy component doesn't block the UI while updating. (the component should be memoized though)

better suited to react than throttling or debouncing as it dowsn't depend on fixed time delay, but can also work with them.

usage examples include searching or filtering a large list, rendering complex animations, updates comming from the server.

### When Not to Use useDeferredValue

by deferring updates, the displayed data may be slightly out of date, keep this in mind.

any user interactions should not be deferred as they are the main focus of the app, we defer other updates to prioritize user interactions.

the best way to improve performance is writing performant and efficient code.

## Problems with Concurrent Rendering

tearing is where the UI becomes inconsistent due to updates being processed out of order. This can happen when a component depends on some value that is updated while it’s still rendering, causing applications to be rendered with inconsistent data.

### Tearing

by having a value update while rendering, and having multiple instances of an expensive component that takes some time to render, we can see tearing as the different instances render with different values. as react will prioritize user interaction over syncing the data with the external store.

the solution is using useSyncExternalStore.

the first argument is a subscribe function that allows us to tell react when exactly to rerender the components, it also returns a cleanup function.

the second argument is a function that returns the current data from the extrnal store, this function should be sync and side effect free, the return of this function is the result of calling the hook.

(_this part in my opinion is not very well explained and contradicts the info I got from reading from the docs._)

the main task of useSyncExternalStore is to ensure consistent state across concurrent renders, and force a synchronous rerender when the store changes.
