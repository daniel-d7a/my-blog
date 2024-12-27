---
bookName: "Fluent React"
chapterTitle: "Chapter 5. Common Questions and Powerful Patterns"
updatedAt: 2024-10-15
---

# Chapter 5. Common Questions and Powerful Patterns

## memoization with React.memo

memoiztion is an optimization technique that caches a functions output based on its input, so if it is called again with the same inputs the cached data is returned.

memoization only works on pure functions that produce the same output given the same input. functions that rely on side effects can't be cached as the result of the side effect can't be guranteed.

memoization is useful for expensive computations and rendering large components.

if a react component rerenders, all of its children rerender, causing update effects if thier props changed, or placement effect if they didnt exist, or no effect at all but a rerender non the less of the props didn't change. using react.memo we can prevent the children that haven't changed from rerendering unnecessarily if their props didn't change.

react.memo taks a component and returns a new component that doesn't rerender if its props are the same between the last and the current renders.

### Getting Fluent in React.memo

react.memo uses shallow comparisons (like many other comparisons in react and other libraries) to determine if the props have changed or not. If the props are of reference types, their data may not have changed but the refernce could have, leading to a redundent rerender.

to overcome this issue, we can use "useMemo" or "useCallback" to stabilze the reference to our reference type data.

a common pitfall is passing inline event handler like "onClick" to components.

### It’s a Guideline, Not a Rule

react.memo is only a hint to the reconciler not to rerender the component if the props are the same, but there are other reasons a component may rerender, such as changes to the component tree, changes in the data in a context, ...etc.

React is intended to be a declarative abstraction of our user interface where we describe what we want, and React figures out the best how to do it. React.memo is a part of this.

the component returned by react.memo has a $$type of REACT_MEMO_TYPE and the same type as the original component, it also has a compare function which the user can provide as a custom way if determinig if the component needs to rerender or not.

How react memo works with the reconciler

1. Initial Check: we check if the current node is null, if so, then the component is being mounted for the first time.

2. Type and Fast Path Optimization: if the component doesn't supply default props nor a compare function, then react identifies it as a simple component eligible for a fast path and more efficient rerenders, and returns a SimpleMemoComponent fiber.

3. Development Mode Checks: extra work done during dev only like checking prop types and warning the user about using deprecated features (like default props in function components).

4. Creating New Fiber: if it is a new compoenent, a new fiber is created and returned.

5. Updating Existing Fiber: if the component is updating, we perform more dev mode checks, then check if it actually need updating, i.e. the props are different, or using the custom compare function (if provided).

6. Bailing Out of Update: if the component is the same, i.e. the compare function returned true and the ref is the same (_does changing the ref update the component?_), we can skip rerendering the component.

7Updating Work-In-Progress Fiber: if the component need to be updated, react flags the fiber with "PerformedWork" flag and creates a new fiber with the new props.

## Memoization with use memo

used to memoize a specific calculation to avoid expensive recalculations.

the first param is a function that does an expensive calculation that we want to memoize, the second param is a dependency array of values to check for changes to evaluate the function.

memoizing simple calculations or scalar values can do more harm than good, as we add more code and checks for memoization while the actual calculations are much simpler.

useCallback does the same thing but for functions (creating the function itself)

memoizing handlers passed to native elements is useless as react already optimized native elements through several processes:

Direct pass-through: react listens top all events at the top level node in the document using a single listener (per event), when an event occures, react uses event bubbling to detect the actual target and delegate the event to it and run any handlers attached to it as if they were natively attached to it. this approach reduses memory usage and the overhead of managing and removing several event listeners for each instance of the event on each element.

Rerendering behavior: native components do rerender when thier parent component's state changes, but it is a fast computation that we need not worry about.

No virtual DOM comparison for functions: thenew handler simply replaces the old one.

Event pooling: using the same event object for different events to reduce memory usage and garbage collection overhead.

function props in custom components behave like regular props and cause rerenders just as such.

react forget is a toolchain that will be able to identify areas where memeoization is benefitial. making hooks like "useMemo" and "useCallback" redundent. by allowing react to compare values based on (_semantic value changes_) without deep comparisons.

not yet availabel for public use, used only internaly by Meta at facebook and instagram, with great feedback so far.

## lazy loading

one performance bottelneck in web apps is large bundle (JS) size, which has to be downloaded even if we only use a small portion of it. That slows down page loads (initial and subsequent)

a large JS file adde to the head of the document can slow down the whole document, a common solution is to use the async attribute to download the file asyncronously, so it downlads in parallel with the rest of the document.

also large JS files increase data usage, which can be a problem for users with limited or slow data plans (aka egyptians)

a recommended solution is to split the JS file shipped to users, so we can only load the JS needed for a particular page.

## useState vs useReducer

useState is better suited to manage a single piece of state, while useReducer is more suitable for more complex state.

(_useState uses useReducer internally, we can also implement useReducer using useState_)

using useReducer is more verbise but has 3 large benifits to it:

1. separating state update logic from the component, so it can be reused and tested in isolation, following the single responsibilty principle.

2. updating state is more explicit, rather than buired in layers of of JSX.

3. useReducer is an (_event sourced model_), maeaning that it models the events that happen in the system, which allows for powerful patterns like undo/redo, optimistic updates, analytic tracking, time travel debugging, keeping track/logging events.

### Immer and Ergonomics

updating state in react is supposed to be immutable, that means that useState and useReducer mst must always return new objects, this can be a bit hard if we have deeply nested state or an array of objects. Immer is a library that provides many hooks and functions to allow us to mutate a draft of the state while taking care of returning a new state immutabily

## Powerful patterns

Software design patterns are commonly used solutions to recurring problems in software development. They provide a way to solve problems that have been encountered and solved by other developers, saving time and effort. They are often expressed as templates or guidelines for creating software that can be used in different situations. Software design patterns are typically described using a common vocabulary and notation, which makes them easier to understand and communicate among developers. They can be used to improve the quality, maintainability, and efficiency of software systems.

### benifits of software design patterns

1. Reusability: they provide reusable soultions to common problems

2. Standardization: they provide a standered way of solving problems, making it easier to commuicate and understand.

3. Maintainability: they provide a way to structure code that is easy to maintain and modify.

4. Efficiency: they provide efficient solutions to common problems, which can improve the performance.

### common patterns in react

#### Presentational/Container Components

spiting a component into 2 components, one for presentation (UI) and one that contains logic and state.

promotes single responsibilty, separation of concerns, and testability.

nowadays, this pattern can be easily replaced with hooks, which provide the same benifits with more simplicity.

#### Higher Order Components (HOC)

just like a higher order function, a HOC takes a component and returns a new component, they are used to share behaviour between components.

#### render props

used when we have a component that controls some state internally and we want to use that state in some other component.

we pass the using component to the component holding state as a function returning JSX in a prop (usually called render) or as children, in the state holding component we return this function passing it any state we want to expose.

the state holding components are headless components with no UI and only have logic (state, effects, event listeners, ...etc), making it behave like a context.

promotes the DRY principle, could be easily replaced by hooks that encapsulate the same state and logic.
