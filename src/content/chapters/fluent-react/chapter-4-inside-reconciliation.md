---
bookName: "Fluent React"
chapterTitle: "Chapter 4. Inside Reconciliation"
updatedAt: 2024-10-15
---

# Chapter 4. Inside Reconciliation

we will see what ReactDOM.createRoot(element).render() does. Specifically, we’ll explore how React builds its virtual DOM and then updates the real DOM through a process called reconciliation.

## Understanding Reconciliation

React’s virtual DOM is a blueprint of our desired UI state. React takes this blueprint and, through a process called reconciliation, makes it a reality in a given environment; usually a web browser, but possibly other environments like shells, Native platforms like iOS and Android, and more.

the first thing react does with a JSX component is transpiling it into regular JS functions (React.createElement). On the first render the output is directly commited to the dom using a minimal set of updates that are batched into as few dom updates as possible.

## Batching

<!-- ```ts
const handleClick = () => {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
};
``` -->

react can batch updates by creating a new vDom tree with the updated values, after reconciling with what is already diplayed, react will determine that only one update is needed to go from the initial UI state to the desired UI state.

## Prior Art

react previously used a stack reconciler, which used a stack based algorithm to compare the old and the new vDom trees and update the dom.

the problem with the stack reconciler was that it rendered the updates sequentially and in the order they were recieved, without being able to set priorities to some updates over the others, interrupt, pause or defer work. Thus rendering less priority tasks before higher priority tasks.

some examples of high priority tasks are tasks where the user interacts with the UI, like using form inputs. clicking buttons ...etc.

this would result in laggy UI and a janky user interface.

not being able to pause or interrupt rendering meant that even if there was a sense of priority, we can not cancel the current task to render something more important.

## The Fiber Reconciler

instead of using a stack datastructure, react now uses a fiber tree in the new fiber reconciler.

a fiber is: React’s internal data structure that represents the actual
component tree at a point in time.

react manages 2 fiber trees to be able to effeciently update the dom.

### Fiber as a Data Structure

The Fiber reconciler allows updates to be prioritized and executed
concurrently.

the Fiber data structure is a representation of a component instance
and its state, including props, state, children, parent, siblings, position in the tree, as well as meta data used internally by the reconciler to prioritize and execute updates.

Fiber reconciliation involves comparing the current Fiber tree with the next Fiber tree and figuring out which nodes need to be updated, added, or removed.

first, the reconciler creates a fiber for each component in the vDom.

the fiber reconciler uses double buffering, where it has 2 fiber trees, one is currently being shown to the user, and the other is being built using the new values behind the scenes, when the second one finishes, they switch places and the process is repeated.

this process removes unnecessary updates to the dom, removing flicker. If a new, higher priority task shows up, we can restart rendering because it happens off-screen, we can also pause it or stop it at all with out affecting what the user can see.

### Fiber Reconciliation

happens on 2 phases, render and commit.

#### The render phase

starts when a component's state changes, react starts making the changes in the alternate tree off-screen, by recursively stepping through each fiber and marking nodes as dirty if they need to change. This happens by a function called "beginWork".

```ts
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null;
```

it takes the current fiber as read-only node to compare it to the corresponding node in the alternate tree.

the node to update in the alternate tree, this will be marked as dirty, if it needs to be changed.

renderLanes is basically a bitmask that represents the priority of the update (it replaces _renderExpirationTime_), as react divids updates into lanes based on their priority, and whenever a new change occures it is assigned a lane. The function uses these lanes to make sure that high priority tasks are done before lower priority tasks.

it also helps react manage long running updates by dividing them into smaller managable chunks, it also allows react to determine which updates should be processed first, and which updates can be deferred until later. (concurrency)

when it finishes we call another fucntion called "completeWork"that has the same signiture as "beginWork", it traverses the tree from the bottom up making the actual changes to fiber nodes, outside of the dom. When it reaches the top we can say that the render phase is complete.

#### The commit phase

in this phase we commit the actual changes to the dom and switch the current tree with the alternate tree as the new current tree. we also run any side effects in this phase.

#### The mutation phase

part one of the commit phase, where react identifies the actual changes needed to update the dom (based on the fiber tag) and commits them to the dom.

side effects run in this order

- Placement effects: adding new components to the dom tree.

- Update effects: when a component's props or state change.

- Deletion effects: when a component is removed from the dom.

Layout effects: these effect occure before the browser has a chance to paint the actual layout, here we add side effects that change the layout of the page, managed by "useLayoutEffect".

after rendering the UI we can run passive effects, managed by "useEffect", that do not contribute to the inital render or getting the minimal set of updates need to update the interface.

#### The layout phase

part two of the commit phase, where we calculate a new layout for the dom (based on the fiber tag).

## Chapter 4 Review

we learned about the react reconciler, old and new, and how they work, we also learned about fibers and fiber trees which are important data structures that enable effecient and interruptable rendering, rendering that consists of the render phase and the commit phase.
