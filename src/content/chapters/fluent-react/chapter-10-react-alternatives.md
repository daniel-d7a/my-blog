---
bookName: "Fluent React"
chapterTitle: "Chapter 10. React Alternatives"
updatedAt: 2024-10-15
---

# Chapter 10. React Alternatives

this chapter talks about react alternatives that provide the same functionality using other mechanisms, the chapter discusses vue, angular, svelte, solid, and qwik.

## vue

- interactivity system is based on JS proxies.
- updates the Dom via effects that run when the state changes.
- uses fine grained subscriptions to perform updates.
- uses vDom
- vue is exploring a new compilation strategy called vapor mode that doesn't rely on vDom
- you can simply include the Vue library in your HTML file in a \<script\> tag and start writing Vue components
- vue provides a cli tool for scaffolding new projects.

## angular

- uses a change detection system that runs periodically for reactivity using a library called zone.js
- provides structrual directives like \*ngIf and \*ngFor (similar to vue)
- angular is going to ditch the change detection system in favour of signals

## svelte

- Svelte is a compiler that transforms your declarative components into efficient imperative code that surgically updates the DOM.
- used to have 2 reactivity systems, and is transitioning to signals in svelte 5
- (i didn't understand half of what he talked about here, use the docs for more info)

## Solid

- uses a fine-grained reactivity system with reactive primitives (signals) to automatically track dependencies and update the DOM directly
- when a reactive value is updates only the dom nodes that use it are rerendered, unlike react which rereunes the whole component on state change.

## Qwik

- it views web pages as a collection of components that can be independently loaded over the network and interacted with on-demand. This approach significantly reduces the initial load time of the page
- the only JS loaded on initial load is the Qwik loader, which is a constant size around ~1kb.
- Qwik loads a bare minimum amount of JavaScript initially, but then loads components and other behaviors as they are needed.
- supports resumability, which is far superiour than hydration.
- uses JSX.
- allows developers to write react components via a qwikify utility.

## Common Patterns

all frameworks we talked about share some common pattern although the vary in their philosophies, methodologies, and implementation details.

### Component-Based Architecture

Components encapsulate their own state and logic, and they can be composed together to build complex UIs. This modularity promotes code reuse, separation of concerns, and improved maintainability.

### Declarative Syntax

in a declarative approach, developers specify what the UI should look like for a given state, and the framework takes care of updating the UI to match that state. This abstracts away the imperative DOM manipulations that can make UI development tedious and error-prone.

### Updates

All these libraries and frameworks provide a mechanism to respond to updates in the application state and alter the UI accordingly. React and Vue use a virtual DOM diffing algorithm to make these updates. Svelte, on the other hand, compiles components to imperative code that updates the DOM directly. Angular uses a change detection mechanism based on Zones and observables.

### Lifecycle Methods

All these libraries and frameworks provide lifecycle methods or hooks, which are functions that get called at different stages in a component’s life, such as when it’s first created, when it’s updated, and when it’s about to be removed from the DOM. Developers can use these methods to run side effects, clean up resources, or make updates based on changes in props.

### Ecosystem and Tooling

Each of these frameworks and libraries is supported by a rich ecosystem of tools, libraries, and resources. They all have support for modern JavaScript features and tooling, including ES6 syntax, modules, and build tools like Webpack and Babel. They also have excellent TypeScript support, allowing developers to write type-safe code and take advantage of TypeScript’s powerful features.

## React Is Not Reactive

React does not follow the traditional model of reactivity, and its approach is distinctly different.

In a traditional reactive system, dependencies between computations are automatically tracked as your code runs. When a reactive dependency changes, all computations that depend on it are automatically re-run to reflect this change. This is typically done using techniques such as data-binding, observables, or signals and slots.

When state changes, instead of immediately rendering updates, React schedules a re-render, and during that re-render, the entire component function is run again with the new state.

React is often identified with the following equation:
v = f(s)

That is, the view is equal to a function of its state. This equation itself describes React’s non-reactive nature: the view is a function of the state, but it’s not automatically updated when the state changes. Instead, the view is updated when the function is re-executed with the new state.

computed values in signals land are actually recomputed when the signals they depend on change, in react they reevaluated as the whole component is rerendered and every non-state variable is recalculated.

## The Future of React

the React team has expressed that they are “not excited” about signals and opt for an alternate approach to arrive at similar performance benefits that signals provide.

the React team at Meta believe that signals, like memo, may be an implementation detail that everyday developers who use React ought not have to think about. The React team believes that the superior way is where developers don’t concern ourselves with signals, memo, or any details, but that React should be able to figure out the optimal way to render the UI.

### React Forget

Forget is a toolchain for React similar to a linter that has its --fix flag enabled: it enforces the rules of React and then automatically transforms React code to be optimal through intelligently memoizing values that will not change throughout the lifecycle of an application

This is a similar approach to what Svelte does, but instead of compiling to imperative code, Forget compiles to more performant React code.

What are these rules of React? Let’s recap:

1. React components are expected to be pure functions.
2. Some hooks and custom event handlers are not required to be pure.
3. Forbidden actions within pure functions include:
   • mutating variables/objects not newly created within the function
   • reading properties that may change
4. Allowed actions include:
   • reading props or state
   • throwing errors
   • mutating newly created objects/bindings, and
5. Lazy initialization is an exception allowing mutation for the purpose of initialization.
6. Objects or closures created during render should not be mutated after render completes, except mutable objects stored in state.

Forget at the time of writing is in evaluation at Meta and exceeding expectations in use on Instagram and WhatsApp.

#### Forget versus signals

it is hard to compare the performance or the tradeoffs of one versus the other as forget is not yet available for the public. However, we can posit that if Forget indeed memoizes everything that doesn’t change, fine-grained reactivity from signals may still be superior to coarse-grained reactivity with React + Forget because signals live in a parallel universe outside of the component
hierarchy. This, when an update happens, React will still have to walk the entire component tree and compare the new and old values of each component’s props to determine which components need to be re-rendered. This is not the case with signals, where only the reactive portions of the UI are updated without needing to walk a tree. This preliminary data does suggest that even with Forget, React may still be slower than libraries where signals are the default, but this is too early to tell.
