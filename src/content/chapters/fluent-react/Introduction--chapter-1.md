---
bookName: "Fluent React"
chapterTitle: "Introduction & Chapter 1"
updatedAt: 2024-10-15
---

# Introduction & Chapter 1

## Introduction

This book is not for people who want to learn how to use React.
but who are more interested in how React works.
first half talks about react
second half talks about frameworks, what problems tthey solve, how the solve them, and will go deeper by buiding a framework that solves (server rendering, routing, data fetching)
finally we look at alternatives like vue, solid, angular, quik, and more.

## Chapter 1. The Entry-Level Stuff

React was made to be used by all, This book dives much deeper into React, underlying mechanism, advanced patterns, and best practices.
knowing how React works instead of learning how to use React.
this book will help you understand React at the level of a library/framework author instead of an end-user.
In this chapter, we’ll talk about why React exists, how it works, and what problems it solves. We’ll cover its initial inspiration and design, and follow it from its humble beginnings at Facebook to the prevalent solution that it is today.

## Why Is React a Thing? updates

We wanted to be able to see things update instantly without having to wait for a new page to be rendered and loaded.
We wanted the web and its pages to feel snappier and more “instant”.
The problem was that these instant updates were pretty hard to do at scale for a number of reasons:

1. Performance: we were prone to perform work that triggered browsers to recalculate a page’s layout (called a reflow) and repaint the page.

2. Reliability: Keeping track of state and making sure that the state was consistent across a rich web experience was hard to do.

3. Security: We had to be sure to sanitize all HTML and JavaScript that we were injecting into the page to prevent exploits like (xss) & (csrf)

## The World Before React

### Button Example

consider a button click: when a user clicks a button, we want to update the user interface to reflect that the button has been clicked.
you have to consider 4 different states:-

1. Pre-click: the button is in its default state and has not been clicked.
2. Pending: the button has been clicked but the action has not yet completed.
3. succeeded: we may want to revert the button to its pre-click state, or indicate success.
4. failed: we may want to revert the button to its pre-click state, or indicate failure.

updating the user interface would require the following steps:

1. Find the button in the host environment (often the browser) using some type of element locator API (document.querySelector or document.getElementById.)
2. Attach event listeners to the button to listen for click events.
3. Perform any state updates in response to events.
4. When the button leaves the page, remove the event listeners and clean up any state.

```tsx
<button
  id="likeButton"
  data-pending="false"
  data-liked="false"
  data-failed="false"
>
  Like
</button>
```

(this is what the button looks like, using javascript we add a click listener to it to update the state from idle to pending to success/fail, and disable the button if it is pending)

with this approach some questions still remain:

Q: can you depend on the disabled prop as pending state?

A: no, because the button can be disabled for other reasons (user not logged in, ...etc)

Q: would it be better to use data-state with values (liked, unliked, pending, ...etc) instead of data-pending/liked/failed ?

A: it would feel the same and you would need a large switch to handle different cases.

Q: (How) can we test the button in isolation ?

Q: Wouldn’t it be better if we can create the button in JavaScript and append it to the dom, This would make it easier to test and would make the code more self-contained? what if the parent is not the dom? do we have to keep track of each button parent?

### Another Example, Form

We have a list of items and we want to add new items to the list with a form.

### Problems with the code

(_code example_)

#### Error-prone

- using a form on submit can be overwritten.
- using addEventListener may accumulate listeners.
- where and when do we remove listeners?

#### unpredictable

- the data we need is mixed between HTML and Javascript.
- what if we have multiple elements with the same Id?
- what if we use classes instead of Ids?
- what if the parent doesn't exist?
- what if the parent is not a \<ul>, can we add \<li> to other parents?
- client-side Javascipt can add or remove items from our app.

the form app is full of side effects and is unpredictable, while in react side-effects are marked and isolated.

Inefficient
rendering all the items each time we add an item on the screen is inefficent, and can be computationally expensive (because of layout shifts and reflows), especially on low-end devices.
we may try batching the updates to the dom?

this is a very manual process that doesn't scale well.
we need some level of abstraction to be able to make interactive, scalable UIs safely and reliably.

React helps us in to solve the problem of scale, creating a lot of buttons that need to be interactive and updating the user interface in a testible, reproducible, declarative, performant, predictable, and reliable way.

React helps us make the state more predictable by fully owning it and rendering based on it, instead of the browser owning it (as many factors can change the data in the browser)

### JQuery

Simpler than native dom updates, as the data is bound to the ui by default, and data updates happen in-place.

- Allows direct and global modification to the dom from anywhere: even imported or third-party scripts, which can lead to unpredictable behaviour, hard to maintain and debug code, and changes that are difficult to track

  modern frameworks work without directly updating the dom, thus they are more predictable and structured, the only down side to this pattern at the time was that we were unable to "know" the current state of the application as the app grew in complexity. (_not very clear 😕_)

- Hard to test: because jquery was hard to isolate, as it depended heavely on the browser environment and shared the ownership of the ui with the browser (instead of a one-way data flow).

- Very heavy on the browser: as jquery was very large, it was very taxing to the loading speed of the websites using it.

  a common practice was using a configrator to only include the parts you need, which helped include less code but added more complexity.

- Redundancy with modern browsers: as the browsers have evolved, most of the functionality provided by jquery was nativily and consistently supported accross browsers, making jquery redundent in the modern web scene.

- Performance considerations: it may be running slower than native JS APIs, which may make a difference in large projects.

### Backbone

<!-- (_search this_) -->

was one of the first solutions to the problem of state being devided across JS and the browser, reusability, testability ...etc.

uses MVC pattern.

### MVC

- Model: holds the data and the business rules, is isolated from the views (ui) and controllers.

- View: the user interface, displayes the data from the model and sends actions to the controller.

  the view is passive, i.e. does not save or fetch data, nor handles user interactions, instead passes interaction to the controller and only displayes data from the view.

- Controller: takes actions from the view, processes it, updates the model, and notifies the view of the update.

the primary advantage of the MVC pattern is separation of concerns, make the app more modular and easier to maintain, scale, and test.

used in Django, ruby on rails, Asp.Net MVC ...etc.

### Disadvantages of MVC

<!-- (_search this_) -->

- Struggles with complex interactivity and state management: as controllers pile up, the code can get mixed and filled with conflicting controllers or controllers that controller unrelated views.

- Two-way data binding: if not managed carefully can lead to unintended side effects, can also have the views get out of sync from the model and vice versa, or having unclear separation of concerns and the ownership of the data.

- Tight coupling: models, views and controllers are supposed to be separate, but in some cases the can be tightly coupled, making it harder to change and maintain code.

backbone allowed developers to colocate data and logic as properties of an object, making it much easier to have structure and reusability.
it was also more testable as it returned basic objects, wich are easy to test in isolation.

### Negatives of Backbone.js

- Verbose and boilerplate code.

- Lack of two-way data binding (_????_): which means that if the data changes the dom doesn't update automatically and vice versa (you need to update it explicitly) (could be achived through plugins)

- Event-driven architecture: data updates can trigger many events throughout the application. This cascade of events can become unmanageable, leading to a situation where it’s unclear how changing a single piece of data will affect the rest of the app. (_which isn't to meta framework specific problem, but what do I know?_)

Lack of composability: no built-in features for nesting views, making composable UIs hard to make

<!-- (_search for this_) -->

### Knockout.js

 <!-- (_search this_) -->

it is on of the first if not the first reactive JS library, where it uses "observables" and "bindings" for that.

reactivity is defined as valuse updating when state changes in an observable manner. (like signals in vue, solid, svelte, qwik, and modern angular (>=v17))

it also uses the MVVM pattern, where observables are sources of data (models) and bindings are user interfaces (views) that consume the data.

### The MVVM pattern

<!-- (_search this_) -->

is an architictural design pattern (like MVC) that is popular in apps with rich user interfaces (e.g. WPF & Xamarin)

- Model: represents the data and the logic.
  responsible for storing, fetching, and processing the data (even from external sources (DB, service, ...etc.))
  is unaware of the View or the ViewModel

- View: is the UI of the app.
  is passive and doesn't contain any logic, instead it binds to the viewModel, updating automatically through bindings.

- ViewModel: acts as a bridge between the Model and the View.
  exposes data in a display-ready format, and actions that handle UI interactions for the view to bind to.
  is unaware of the View it is used with.

all that is also about separation of concerns as well, which leads to:

- Testability: it is easier to test the ViewModel in isolation from the view.

- Reusability: you can use the same ViewModel with multiple views.

- Maintainability: With a clear separation, it’s easier to manage, extend, and refactor code.

- Data Binding: The pattern excels in platforms that support data binding, reducing the amount of code required to update the UI.

the main deference between MVC and MVVM is the coupling (or the lack there of) and data biniding (automatic UI updates)

knockout exports APIs for data bindings and observables that are used to create component-like functions (ViewModels) that contain state and logic that are later bound to UI elements (Views).

ViewModels often grow to be very large and complex (_skill issue_)(_maybe he is not talking about knockout?_)

it was also very easy to test in isolation.

### AngularJS

<!-- (_search this_) -->

developed by google in 2010

had a significant impact on the web dev landscape due to new ideas and features:

- Two-way data binding: binding data from the model to the ui and from the ui to the model, so when either one changes the other updates as well.

  other libraries like JQuery and Backbone relied on manually updating the dom on data change.

- Modular architecture: before import / export syntax in JS, you didn't really have a way to split you code, angular modules alloed you to do exactly that, where each module can be its own file and developed, tested, and maintained independently from the others.

  other modules could depend on each other through dependency injection, a design pattern where a dependency is injected rather than created and angular can take care of creating it and passing it to the desired module, which helped with modularity and reusability.

where bakbone allowed for more freedom, it required more code and was less opinionated, where angular was very opinionated and introduced structure, which resulted in greater developer velocity.

(_two-way data binding FTW._)

### AngularJS’ trade-offs

- Performance: the change detection cycle in large and complex apps would result in slow updates and laggy interfaces.

- Complexity: angular added alot of new concepts (directives, controllers, services, dependency injection, factories, and more.) that made it harder to learn especially for beginners.

- Migration issues to Angular 2+: because it was no backwards compatiable and required code to be rewritten in typescript.

- Complex syntax in templates: as it allowed mixing logic and template syntax together, which made debugging much harder and violated the the principle of separation of concerns.

- Absence of type-safety: as it was not yet written in typescript.

- Confusing $scope model: an angular specific object passed to modules responsible for data binding but had strange behavior, also it could inherit logic from its parents, which led to unexpected side effects, also the inhertance model and scope hierarchy were often at odds with JS lexical scoping rules.

- Limited development tools: debugging, performance profiling, ...etc.

## Enter React

react introduced many new concepts like component architecture, unidirectional data flow, vDom, and more unique ideas that proved worthy.

Declarative versus imperative code: it provides us a way to write code that expresses what we want to see, while then taking care of how it happens.

react takes care of creating elements, attaching state, batching updates, adding elements to the dom ...etc. so in the end the single source of truth is our JS code with react

The virtual DOM is a lightweight representation of the Dom that react uses to keep track of changes in a component so it can re-render them only when necessary, thus minimizing direct dom updates.

when react first renders the UI it creates the vDom, whenever a change in state happens react compares the vDom before and after the update in a process called "reconciliation" to determine which parts have changes and mark them as dirty, then react computes a minimal effective set of updates to make on the actual dom.

<!-- (_does updating the dom using e.g. el.textContent rerenders the whole dom again ?_) -->

The component model: breaking the app into smaller pieces and using them to build a large component tree, which allows for:-

more reusablity (DRY code)
separation of concerns.
logic and UI colocation
React can add optimizations like batching, memoizations, using keys.

Immutable state: each state in react is treated as a new distinct snapshot. This makes tracking state changes and debugging much easier, also it prevents state mutations from interfering with or corrupting each other.
It also allows for powerful dev tools like time travel debugging with replay.io.

## Releasing react

React was first released internally, and was adopted by facebook and instagram.

React was then open-source 2013 and was met with huge backlash as people disliked JSX and the idea of putting HTML into JS, dubbed "rethinkink best practices", it was then slowly adopted by Netflix, Airbnb, The New York Times to become the web standard

(_“React.js: the Documentary” by Honeypot._)

### The Flux Architecture

Flux is an architectural design pattern for building client-side web applications, popularized by Facebook. It uses a unidirectional data flow, which makes the flow of data within the app more predictable.

### Key concepts of the Flux architecture

Actions: simple objects containing data and an type property. they represent inputs to he system like user interactions, server responses, and form inputs. They are dipatched through a central dispatcher.

```js
{
type: 'ADD_TODO',
text: 'Learn Flux Architecture'
}
```

Dispatcher: the central hub of the Flux architecture, It receives actions and dispatches them to the stores in the application. where every store registers itself and its callback with the dispatcher. When an action is dispatched, it is sent to all registered callbacks.

```js
Dispatcher.dispatch(action);
```

Stores: contain the application state and logic similar to Models in MVC, but the manage the state of multple objects. They are registered at the dipatcher with a callback to handle actions. When the store is updated it emits a change request to alert views of the change.

```js
// Todo Store
function handleActions(action) {
  switch (action.type) {
    case "ADD_TODO":
      this.todos.push(action.text);
      this.emit("change");
      break;
    default:
    // no op
  }
}
```

Views: are React components. They listen to change events from the stores and update themselves when the data they depend on changes. They can also create new actions to update the system state, forming a unidirectional cycle of data flow.

### Benefits of the Flux Architecture

Single source of truth: which is the stores, This centralized state management makes the application’s behavior more predictable and easier to understand. as having multiple, interdependent sources of truth, can cause complications and lead to bugs and inconsistent state across the app.

Testability.

Separation of concerns.

## Wrap-Up: So… Why Is React a Thing?

declarative code.
fewer Dom updates.
component architechture.
open source and free.
vast ecosystem and lots of tools.
platform agnostic.
backed by a big company (Meta)

## Chapter 1 Review

we covered a brief history of React, its initial value proposition, and how it solves the problems of unsafe, unpredictable, and inefficient user interface updates at scale. We also talked about the component model and why it has been revolutionary for interfaces on the web.
