---
image: "../../assets/books/fluent-react.png"
name: "fluent react"
tags: "react, book"
description: "this is some text about the book"
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

# Chapter 2. JSX

we’ll learn about JSX, which is a syntax extension for JavaScript that allows us to write HTML-like code within our JavaScript code. Back when React was introduced in 2013, it was the first thing people noticed and heavily criticized, so it makes sense to zero-in on it this early in the book.

JSX stands for JavaScript Syntax eXtension. It’s also sometimes called JavaScript XML.

## JavaScript XML?

JSX is a syntax extension for javaScript that allows developers to write HTML like code in JS.
it is not a separate language, it is a language extinsion that is transformed into regular JS code by a compiler or a transpiler.
orginally developed by Meta for react, but was adopted by other libraries.

### Differences from regular HTML

- uses { } to embed JS in HTML
- uses camel case instead of regular attribute names
- HTML elements are written in lower case, while custom components are written in title case: div is HTML, Div is a React component.
  it is possible to create react apps without JSX at all (using React.createElement() or jsx functions), but the result is ugly and hard to maintain.

### Benefits of JSX

- Easier to read and write.
- Improved security: because it sanitizes the resulting HTML to disallow the creation of new elements .
- Strong typing: using typescript, JSDoc, or propTypes.
- Encourages component-based architecture(_lies and deception, this is mentioned nowhere at all_)
- Widely used: by React and its community as well as other libraries and frameworks.

### Drawbacks of JSX

- Learning curve(_not in my opinion, I actually think it has one of the easiest learning curves_)
- Requires tooling: as it must be compiled to normal JS code to run in the browser, unlike other alternatives like vue which can run in the browser using a simple script.
- Mixing of concerns: some argue against the mixing of logic (JS) and UI (HTML).
- Partial JavaScript compatibility: as it allows for inline expressions but not inline blocks (if, switch, for ...etc) which can be difficult for new developers to grasp.

JSX is adopted by other frameworks such as (_vue?_), qwik, solid, and many more. it has also influenced other areas of development such as IOS with swift ui (_in turn it must have influenced flutter and jetpack compose_).

## Under the Hood

### How Does Code Work?

to computers, code is just text. computers need to turn it into useful information to be able to excute it.

instead of using complex RegEx to identify keywords and variable names, most languages use some sort of a compiler, which is a piece of sotware that transforms code from a high level language into something the processor can run.

the compilation process involves many steps including but not limited to: lexical analysis, parsing, semantic analysis, optimization, and code generation.

in JS the compilation process is devided into 3 steps:

- Tokenization (lexing): breaking up a string of characters into meaningful tokens according to some rules to detect keywords and variable names ...etc.
  a lexer is a tokenizer that keeps state about the parent and/or the child.
  the last step is mapping the keywords found to enumerable values like numbers (const = 0, let = 1 ...etc)

- Parsing: taking the tokens and converting them into an abstract syntax tree (AST) which is a data structure that represents the structure of the code.

- Code generation: from the AST, a compiler can produce machine code that is able to be excuted on the processor in a highly sophisticated and complex operation.

<!-- (_kent c. dods course on egghead.io where he explains react under the hood_)
(_study how JS is interperted, or how a compiler works in general_)
(_the programming language project in elouent JS_) -->

### Types of compilers

- Native compilers: produce machine code that can be executed directly by the target platform’s processor. used in standalone applications or system-level software.

- Cross-compilers: roduce machine code for a different platform than the one compiling the code. used in embedded systems development or when targeting specialized hardware.

- Just-in-Time (JIT) compilers: translate code into machine code at runtime, rather than ahead of time. used in virtual machines, such as the JVM, and can offer performance advantages over interpreters.

- Interpreters: execute source code directly, without compilation, slower but allow for greater flexability.

to excute JS, most browsers translate JS into an intermediate representation sucha s byte code (_search this_) then use a JIT compiler.

using a JIT compiler allows for on the fly optimizations based on real time usage, some engines employ multiple stages of compilation, starting with a quick, non-optimized compilation to begin execution swiftly, followed by more optimized compilation for frequently executed code segments.

runtimes nterface with engines to provide more contextual helpers and features for their environment.

browser runtimes add globals like document and window, others like node deno and bun add other low level features like interacting with file system

### Extending JavaScript Syntax with JSX

we can either make a new engine to compile and run JSX directly, but that is hard to make and we would have to persuade people and browers to use it, or we can deal with the JSX before it reaches the engine by transforming JSX into regular JS then running that JS on any available runtime or engine (aka using babel).

other examples in this form of transformation are typescript to ES6, ES6 to ES5 using babel, traceur, and swc

<!-- (_search these_) -->

what babel does is often refered to as "transpilation":"transform and compilation", as transpilation as transforming from a high level language to a high level language (languages on a similar abstraction level), also known as source to source compilation.

## The JSX Pragma

JSX uses the "<" sign as a pragma, preprocessor directive that that provide additional information to the compiler, to indicate a function call to React.createElement or jsxs function, that takes the component name, props, and children.

other common pragmas in JS are "use strict", "use client" and "use server"

## Expressions

JSX can run JS expressions if put inside curly braces.
we can use Math functions, array functions like map and filter, conditional checks and many many more.

we can't run statements like if, switch, and others as they return nothing and are considered side effects

## Chapter Review

we’ve covered a fair amount of ground on the topic of JSX. At this point we should be feeling pretty confident about the topic to the point where we can confidently explain aspects of it to people.

# Chapter 3. The Virtual DOM

## An Intro to the Virtual DOM

DOM is an HTML document modeled as a JS object. It is the browser's runtime model of the document that consists of Node elements.

vDom is a light weight representation of the real DOM that consists of plain JS objects.

the way it is used is that whenever we update the UI using "setState" or any other mechanism, the vDom is updated first then the real Dom is updated to match it in a process called "reconciliation".

the reason behind that is that updating th Dom is slow and expensive, and the Dom needs to recalculate the layout of the page (reflow), repaint the screen, and do other performance intensive tasks. while updating the vDom is much faster as it doesn't include any changes to the page layout, it is also optimized using various algorithms that are decoupled from the browser and any other environment.

for example, accessing an element's offsetWidth property can cause a reflow, because it is a computed property.

updating the vDom uses a diffing algorithm to compare the old vDom and the new vDom to determine a minimal set of changes to be applied on the real Dom in a batched and optimized way.

## The Real DOM

When an HTML page is loaded into a web browser, it is parsed and converted into a tree of nodes and objects as a live representation of the webpage.

each Dom node has many properties and methods to manipulate it using JS, like "querySelector".

using "querySelector" and some other dom selectors can have an impact over performance, sbecause the selector has to traverse the dom from the top all the way down, it also need to check every node for validity against the selector.

a better alternative is "getElementById" as Ids are unique through the document, and don't require validation, also browsers (_most likely_) use a hash table to store nodes with Ids as an (Id, node) pairs, making the retrival of elements by Id even faster, although some hash collisions can happen as Id uniqueness is not guranteed.

using react and specifically react components we need to worry less about the performance of our selectors, and about managing state in a voltile environment such as the dom, as it is affected by many external factors such as client side scripts, network, user interactions...etc.

### Pitfalls of the Real DOM

Some of these pitfalls include performance issues, cross-browser compatibility, and security vulnerabilities (XSS).

#### Performance

reading calculated props, like "offsetWidth"or "getBoundingClientRect" can cause a reflow, which may seem simple, but in a large and complex app can be quite expensive and lead to
(_layout thrashing_), resulting in a laggy and sluggish UI experience.

we can see the effects of calling computed props using the (_performance tab_) (_layout and paint_)

using the vDom handles dealling with the dom quickly and efficently.

to increase performance, we can batch our reads, cache the result in a variable, or use (_requestAnimationFrame_).

adding and element to a list, or changing the style or the props of one item using the dom forces the browser to recalculate the layout and repaint all the elements, wich can cause performance issues in large lists.

(_flash lists_)

the vDom mitigates these problems (by identifying the changing elements and updating them only).

web performance is a critical topic especially on low-end devices like phones and tablets, or older devices in general.

better performance allowes for better accebillity, leading to better conversion rates, and more overall success.

(_An excellent article titled “Milliseconds make millions” on the Google web blog web.dev_)

#### Cross-browser compatibility

Different browsers model documents differently, which can lead to inconsistencies and bugs in web applications. this was far more common around the time react was released, (other libraries like JQuery were used to fix this).

some elements and/or props where not supported by all browsers, so we had to write workarounds and fallbacks for many platforms.

- Unified interface: e.g. the event system, is some browsers the element may be called "target", other browsers may call it "srcElement". react provides a unified interface using its SyntheticEvent system that wraps the native browser event.

- Event delegation: Instead of attaching event listeners directly to elements, React listens for events at the root level. This approach sidesteps issues where some events might not be available on certain elements in older browsers.

- Cross-functional enhancements: browsers handle some events differently, reactnormalizes the behavior of those events across input elements

Access to native events: f developers need the original browser event, it’s available via "event.nativeEvent", ensuring flexibility without sacrificing the benefits of the abstraction.

### Document Fragments

are lightweight containers for dom nodes, acts like a temporary staging area where you can make multiple changes without affecting the main DOM. you can append the Document Fragment to the DOM, triggering a single reflow and repaint. Document fragments are very close to React’s virtual DOM in this way.

they allow for some performance benifits like:

Batched updates: making multiple changes to the dom only results in one reflow, regardless of how many elements where added.

Memory efficiency: nodes added to a fragment are removed from thier parents, optimizing memory usage.

No redundant rendering: since fragments are not actuall parts of the dom, they don't affect styles nor trigger scripts untill they are appended to the actuall dom.

using fragments instead of direct dom manipulation results in smoother interactions and faster render times.

with the addition of efficeint diffs where react can compare the old and the new vDoms to calculate a minimal set of changes to apply to the real dom, using the vDom results in the same performance benifts accross the entire app's UI, while abstracting its technical details.

### How the Virtual DOM Works

React Elements: elements in the vDom are reactELements that consist of:

- \$$typeof: a symbol used to ensure that an element is a valid react element and indicate the type of the component, can represent (fragments, portals, profilers, context providers, and of course, elements)

- type: type of element, could be a string if the in case of HTML tags, or a function (or a class) in case of user defined components, if the type is a function, react will invoke the function passing it its props and using the return value as its children, going deeper untill it reaches a scaler value that it renders as a text node, or null or undeined then nothing is rendered.

- ref: used to request a refernce to the underlying dom node for direct dom manipulation if needed.

- props: contains all the attributes and props of a component.

- \_owner: internal property used by react to determine the component that created this element, and to know which component
  should be responsible for updating it when state or props change.

- \_store: internal property used by react to store additional private data about the element.

### Virtual DOM Versus Real DOM

(some lengthy paragrphs about shit we already talked about a few times already)

### Efficient Updates

(_react's diffing algorithm_)
react's diffing algorithm rules

- If the nodes at the root level of the two trees are different, React will replace the entire tree with the new one.
- If the nodes at the root level are the same, React will update the attributes of the node if they have changed.
- If the children of a node are different, React will update only the children that have changed. React does not recreate the entire subtree; it onlyupdates the nodes that have changed.
- If the children of a node are the same, but their order has changed, React will reorder the nodes in the real DOM without actually recreating them.
- If a node has been removed from the tree, React will remove it from the real DOM.
- If a new node has been added to the tree, React will add it to the real DOM.
- If a node’s type has changed (e.g., from a div to a span), React will remove the old node and create a new node of the new type.
- If the node has a key prop, React uses it to know if it should replace the node or not. It can be useful when you need to reset the state of the components.

react doesn't know what components depend on what data, so if a parent component rerenders, it will rerender all of its children even if thier props stay the same, which can lead to performance issues and components rerendering unnecessarilly.

## Chapter 3 Review

we talked the differences between the real DOM and the virtual DOM in web development, as well as the advantages of using the latter in React.

we talked about the limitations of the real dom and its issues, then we moved to the vDom and saw how it adresses most of these issues.

we talked about the differences between dom nodes and react elements,
and finally we saw how react diffing algorithm can lead to unnecessary rerenders.

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

# Chapter 6. Server-Side React

## Limitations of Client-Side Rendering

### SEO

web crawlers and indexers can't index the pages well, as some of them can't run JS, or if they run it it may not run as expected.

alot of search engine crawlers are proprietary and unknown to the public.

(_article about how some web crawlers deal with client rendered apps_)

crawlsers can't index client rendered apps as because the server only return an empty HTML shell that gets populated with content via JS, while in server rendered apps the server returns a fully built HTML page with content, data, meta data, and links, making it easy for the crawlers to do their job.

### Performance 2

in client side apps we need to download, parse and excute a JS file after the HTML file we just got, this leads to delay in showing content measure known as (time to interactive), this impacts user engagement and bounce rate (how fast users bounce off the website as it takes too long to load), which can further impact SEO.

this also creates network waaterfalls as we have to download and parse HTML, then download, parse, and excute the JS, render the initial UI, then fetch data for the webiste, update the UI then the website can be ready for interactivity.

on lower powered devices, it may take a while to run the JS making for a slow and unresponsive user experience. using server side rendering we make sure the data sent by the server is minimal to avoid any performance overhead.

react's bundle size is about 136kb, and react basically owns the dom in client rendered apps, meaning we can't have a web page unless we wait for react to be downloaded and excuted. (_even in production ??_)

JS's role is to enhance the web page, not be a web page. server side rendering allows us to ship the basic content and features to the browsers, while advanced features, animations, interactivity is added later with JS, this principle is known as progressive enhancement.

### Security

the major security issue with client side apps is CSRF, because most client side apps are hosted on servers we don't control, so we can't send or validate CSRF tokens.

if we serve the client app from a server we own we might as well benifit from using it for CSRF and server side rendering

## The Rise of Server Rendering

### Benefits of Server Rendering

faster time to first contentful paint, because HTML from the server can be displayed immediately. instead of wating for JS to create the UI.

improved accessibilty, espicially for user with slower devices as they don't need to run a large JS bundle.

improved SEO.

improved security.

server rendered HTML is static and contains no JS, so no event listeners or any dynamic functionality, so it need so be hydrated with JS.

## Hydration

the process of attaching event listeners to server rendered HTML to make it interactive.

the steps for hydration are as follows:

after downloading the static HTML and while displaying it we download the JS bundle.

using the function "hydrateRoot" from react, we can attach any dynamic code to the rendered HTML.

during hydration react matches the server rendered HTML with the structure defined by JS, if the mismatch react cannot hydrate the application.

### Hydration Considered Harmful

some people criticize hydration for being slow, and because hydration is done after the initial render, the server rendered HTML is not responsive yet, and we need to rerender the UI after hydration, which can add a delay between when the user sees the app and when the user can actually use it.

an alternative solution is (_resumability_), where HTML is rendered on the server and JS is serilaized on the serrver as well, then they are sent to the browser, which now has all the information about interactivity and can resume working where the server left off.

the question with resumability is whether the complixity of implementing it is worth the extra performance, as the benifits are not clear yet.

## Creating Server Rendering

we can simply start by using a SSR framework like next or remix.

or we can use express along with "react-dom/server" to serve the app as a HTML string, then on the client side we can use "hydrateRoot" to hydrate the app and move control from the server to the client.

## Server Rendering APIs in React

(_this part goes in depth into the APIs provided by react to allow for server rendering, and it gets pretty complex and useless pretty quickly, so i will only review the most important parts of it_)

### renderToString

is a synchronousfunction provided by "react-dom/server" that allows us to render a react component into an HTML string, that can be sent to the client.

it works by traversing the tree of react elements, which has enough data about the structure of the elements, then renders it into a string recursively

this is a synchronous and blocking function, which means that if the tree is large and deep it can take a lot of time and create some delay for other clients.

it has a few disadvantages:

Performance: it is synchronous and blocking, so it can block the event loop for your other users. it also returns a HTML string which can be memory intensive for large apps, which in some sever cases cause the server to stop working under heavy load.

Lack of streaming support: the entire HTML string must be generated before it could be sent to the client, this can result in slower time to first byte, and a long delay before the user can see and use the website.

for the obvious downsides of renderToString, react provides other APIs that mitigate its problems.

### renderToPipeableStream

introduced in react 18, it works by transforming react components into a Node.js stream, which can be piped through a response object.

it also supports react's concurrent features such as suspense.

since it returns a stream, it could be streamed over the network, where chunks of HTML can be sent asynchoronously to clients without blocking, resulting in lower time to first byte.

#### Node.js streams

a stream represents the flow of data between a source and a distination, on which we can apply various transformation or tap onto the data.

types of streams:

Readable stream: represents a source of data which we can read, it emits events like "data", "end" and "error".

examples include reading a file, recieving data from an HTTP request, using a generator.

readable streams (like the ones returned from renderToPipeableStreamW) can be output to writeable streams like the response object.

Writable stream: represents a destination where you can write data. It provides methods like "write()" and "end()" to send data into the stream, it emits events like "drain" when it can handle more data, and "error" on error.

examples include the response object.

Duplex stream: represents both a readable and writable stream, It allows bidirectional data flow, meaning you can both read from and write to the stream.

used for websockets or communication channels where bidirectional data flow is needed.

Transform stream: a special type of duplex stream that performs data transformations while data flows through it, It reads input data, processes it, and provides the processed data as output.

used to perform tasks such as compression, encryption, decompression, or data parsing.

Streams in Node.js also support backpressure handling. Backpressure is a problem that occurs during data handling when data builds up behind a buffer during data transfer. When the writable stream is unable to handle data quickly enough, the readable stream will pause emitting “data” events, preventing data loss. Once the writable stream is ready to consume more data, it emits a “drain” event, signaling the readable stream to resume emitting data.

#### Features of renderToPipeableStream

Streaming: this allows the server to start sending the HTML to the client before the entire page is rendered, providing a faster user experience and better performance

Flexibility: it can be easily integrated with other Node.js streams, allowing developers to customize the rendering pipeline and create more efficient server-side rendering solutions.

Suspense support.

the function waits for data dependent components to be ready then swaps the fallback UI for the server rendered components, this can happen without even having react onthe client.

### renderToReadableStream

browsers have their own streams that differ from Node.js streams that are designed to work in the browser environment, they often deal with streaming data from network requests, media streaming, or other data processing tasks in the browser. they provide a more standardized and promise based API.

### When to Use What

renderToString is the worst option for the folowing reasons:

Network I/O is asynchronous: while renderToString is synchronous, which means that it cannot wait for asynchronous actions to complete before rendering the full HTML string, and must send a string instantly to the browser.

Servers serve multiple clients: if one request is taking too long it will block all the other requests untill it is done.

other alternatives (renderToPipeableStream and renderToReadableStream) are async and stream based, thus they solve the aforementioned issues.

the issue with using the stream base approach is that they have to render the app in full, they have no support for partial hydration.

## Don’t Roll Your Own

building a custom solution for server side rendering while possible is a bad idea, for the following reasons:

Handling edge cases and complexities: like async data fetching, code splitting, managing lifecycle events, security, ...etc. using frameworks elemnates the need to handle these complexities ourselves.

Performance optimizations: frameworks come with performance optimizations out of the box like caching, automatic code splitting, and many more.

Developer experience and productivity: by using a framework we can focus on building features in our websites instead of worrying about server rendering functionality.

Best practices and conventions: frameworks help us enforce best practices and common conventions.

## Chapter 6 Review

server-side rendering and hydration are powerful techniques that can significantly improve the performance, user experience, and SEO of web applications. React provides a rich set of APIs for server rendering, such as renderToString and renderToPipeableStream, each with its own strengths and trade-offs.

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

# Chapter 8. Frameworks

## Why We Need a Framework

react is an unopinionated framework, this gives developers more flexibility, but it leaves a lot of decisions up to them regarding routing, server side rendering, and data fetching.

frameworks provide a predefined structure for the areas mentioned above, allowing developers to focus on implementing features.

we can use express and react to make our own framework, and see how we can implement the same patterns used in next.js and remix.

### some problems with using only react

- it ships an empty HTML shell, which hurts seo.
- it is prone to network waterfalls i.e. download HTML > download JS > fetch data > ...., which also requires multiple rerenders to display the data.
- client side only routing, to allow users to share links we have to use some workarounds.

### server rendering

first we need a server, so we use express to spin a simple server, then we use server APIs provided by react like "renderToString", the we can render and serve our pages from the server.

(_code example_)

### routing

instead of writing more calls to "app.get()" every time we add a new route, we can easily solve this problem with file based routing.

we put all of our pages in a "pages" directory, then we can load the page file based on the route requested, then get the default export (which we assume is the react component) to be rendered and served.

### data fetching

we update our code to recieve initial data through props, and oly request new data based on user interactions or if it has no initial data.

we also make each page export a "getData()" function, which we can call on the server, await the data, pass them to the component to be injected into the HTML, and return a full loaded HTML page.

all the ideas discussed so far in this chapter are very close to what next.js used to do before v13

## Benefits of Using a Framework

- Structure and consistency: Frameworks come with structure and pattern to organize the codebase. This leads to consistency, making it easier for new developers to understand the flow of the application. It also enables us to focus on our products and features.
- Best practices: Frameworks often come with baked-in best practices that developers are encouraged to follow.
- Abstractions: Frameworks provide higher-level abstractions to handle common tasks such as routing, data fetching, server rendering, and more. This can make your code cleaner, more readable, and easier to maintain.
- Performance optimizations: Many frameworks come with out-of-the-box optimizations such as code splitting, server-side rendering, and static site generation. These can significantly improve the performance of your application.
- Community and ecosystem: Popular frameworks have a large community and a rich ecosystem of plugins and libraries.

## Trade-offs of Using a Framework

- Learning curve: frameworks comes with its own set of concepts, APIs, and conventions that you need to learn.
- Flexibility versus convention: If your application has unique requirements that don’t fit into the framework’s model, you might find yourself fighting against the framework rather than being helped by it.
- Dependency and commitment: You’re tying your application to the fate of the framework. If the framework stops being maintained or if it takes a direction that doesn’t align with your needs, you may face difficult decisions about the future of the project.
  -Abstraction overhead: While abstractions can simplify development by hiding complexity, they can also create “magic” that makes it difficult to understand what’s happening under the hood. This can make debugging and performance tuning challenging, and they also may impact performance.

## Popular React Frameworks

in this section we talk about popular react frmaeworks sucha as remix and next.js, we discuss how they approach server side rendering, data fetching and mutation, and routing, and how they are similar to the ones we implemented above.

the information in this can be better read from the official docs of the frameworks.

## Choosing a Framework

one framework is not inherently better or worse than another. Each framework has its own set of strengths and weaknesses, and the best framework for your project will depend on your specific requirements and preferences.

### Understanding Your Project Needs

- what is the scope of the project ?
- what are the main functions ?
- do you need SSR, SSG, or a combination of both ?
- would it benifit from excellent SEO ?
- Is real-time data or highly dynamic content a critical part of your application?
- How much flexibility do you require in terms of customization and control over the build process?
- Who are your target users? Enterprise folks sitting at desks with fast internet? Or the general public with a wide range of devices and internet speeds?

### Next.js

- Learning Curve: Next.js uses the bleeding edge of React under the hood, often making use of canary releases of React. This means that Next.js is often ahead of the curve, and can be a bit more challenging to learn. However, the Next.js team does a great job of documenting the framework and providing clear guides for various features, which can help you get started quickly.
- Flexibility: Next.js is designed with flexibility in mind between static and server-rendered content. It also supports entirely client-side applications. Next.js also provides a rich ecosystem of plugins and integrations.
- Performance: Next.js aggressively prioritizes performance, with a focus on static generation and server-side rendering, as well as caching.

### Remix

- Learning Curve: Remix might have a slightly flatter learning curve because it relies more heavily on web fundamentals and uses React the way many have learned it before the heavier emphasis on server components.
- Intuitiveness: Remix often gets out of the way and makes way for the fundamentals of the web platform to shine through. This can be a bit of a double- edged sword: on one hand, it’s great because it’s intuitive and familiar, but on the other hand, it can be a bit frustrating because it’s not as “magical” as other frameworks.
- Performance: Remix’s unique approach to routing and data loading makes it efficient and performant. Plus, its optimistic UI updates and progressive enhancement strategies improve the user experience.

### tradeoffs

### developer experience

### runtime performance

the conclusion of the 3 topics above is that both frameworks are great, and next.js can do SSR, SSG, ISR, full client side apps and a mix of them.

# Chapter 9. React Server Components

React Server Components introduces a new type of component that “runs” on the server and is otherwise excluded from the client-side JavaScript bundle. These components can run during build time, allowing you to read from the filesystem, fetch static content, or access your data layer. By passing data as props from Server Components to interactive Client Components in the browser, RSC maintains a highly efficient and performant application.

React component is nothing more than a function that returns a React element. Server components are no different. If Component is executed either on the server or the client, it returns vDOM. the resulting JavaScript object representing an element is sent over the network to a client.

## Benefits

- They execute only on the server side, on machines whose computational power we control.
- They execute in our secure server environments, so we can do secure operations in server components without worrying about leaking tokens and other secure information.
- Server components can be asynchronous since we can wait for them to complete executing on our servers before we share them with clients over the network.

## Server Rendering

server components and server rendering can be thought of as two separate independent processes such that one process solely takes care of rendering components on the server and generating a tree of React elements, and another process—the server renderer—further takes this tree of React elements and converts it into markup that can be streamed to clients over the network.

1. On the server, a tree of JSX is turned into a tree of elements.
2. On the server, this tree of elements is then further serialized into a string or stream.
3. This is sent to a client as a big stringified JSON object.
4. React on the client side can read this parsed JSON and render it as usual.

this is very similar to the server renerin examples from before, the only addition is that we convert server components into a tree of elements.

### Under the Hood 2

this uses some kind of big if/else tree to convert react components to vDom nodes based on their type (string, built in element, react component, ...etc), we also await components to render if it so happens that they have some kind of an async operation inside.

#### Serialization

The serialization step is crucial for several reasons. First, it allows the server to send a complete, ready-to-display HTML page to the client as quickly as possible. This improves the perceived load time of the page, as users can start interacting with the content sooner.

Furthermore, serializing React elements into an HTML string allows for a consistent and predictable initial render, irrespective of the environment. The HTML produced is static and will look the same whether rendered on the server or the client. This consistency is essential for ensuring a smooth user experience, as it prevents any flickering or layout shifts that might occur if the initial render were different from the final render.

Lastly, serialization facilitates the process of hydration on the client-side. When the JavaScript bundle loads on the client, React needs to attach event handlers and fill in any dynamic content. Having a serialized HTML string as the initial markup ensures that React has a solid base to work from, making the rehydration process more efficient and reliable.

for the JSON serializer to work correctly we need to make sure to replace the "$$typeof" symbol into a string, and back to a symbol when deserializing. that is done using a simple custom replacer function.

#### Navigation

with RSCs, we can implement soft navigation—where state is persisted between route transitions. We do this by sending the server the URL we want to navigate to, and the server sends us back the JSX tree for that page. Then, React in the browser rerenders the entire page with the new JSX tree, and we have a new page without a full-page refresh.

### Making Updates

one of the limitations of RSCs is the mental overhead of having to think about 2 types of components (client and server), that is because not all components can be server components because some APIs like event listeners and hooks can't work on the server, and functions can't be serialized and sent over the network.

we need to think about the parts of our app that can be rendered on the server or the ones that need to be rendered on the client, by splitting our code while maximizing the components that can be run on the server, we can ship a smaller JS bundle to our users and increase the performance of our app.

#### Under the hood

Client components are designated as such by adding a "use client" directive at the top of a file containing a client component. then react uses this directive to bundle client code separate from server code.

if the root of the tree is a server component react renders the components on the server while placing placeholders for client components, then react on the client fills this placeholder with the correct module or component.

### Nuance

where and when each type of component renders.

• Server components execute on the server, output objects representing React elements.
• Client components execute on the server, output objects representing React elements.
• A big object representing all React elements from both client and server components exists on the server.
• This is turned into a string and sent to the client.
• From this point, server components are never executed on the client.
• Client components are executed exclusively on the client.

## Rules of Server Components

### Serializability Is King

all props must be serializable.This is because the server needs to be able to serialize the props and send them to the client as we’ve discussed earlier. Therefore, props cannot be functions or other non-serializable values in server components.

### No Effectful Hooks

The server is a vastly different environment from the client. It’s not interactive, it doesn’t have a DOM, and it doesn’t have a window. Therefore, hooks that are effectful are not supported in server components. RSCs can use hooks that do not depend on state, effects, or browser-only APIs like useRef.

### State Is Not State

This means that state in server components may be shared between clients since server-client relationships are broadcast-style relationships instead of unicast (one client one state), and thus the risks of leaking state between clients is high. this means that any components that require state via useState or useReducer or similar are best suited to be client components.

### Client Components Cannot Import Server Components

Client components cannot import server components. This is because server components are executed only on the server, but client components are executed in both, including on browsers. However, client components can compose server components via props.

### Client Components Are Not Bad

It’s worth noting that up until server components were introduced, client components were the only type of component we had in React. This means that all of our existing components are client components, and that’s okay. Client components are not bad, and they’re not going away. They’re still the bread and butter of React applications, and they’re still the most common type of component we’ll be writing.

## Server Actions

Any async function can have "use server" as the first line of its body to signal to React and to the bundler that this function can be called from client-side code, but must only execute on the server. When calling a server action on the client, it will make a network request to the server that includes a serialized copy of any arguments passed. If the server action returns a value, that value will be serialized and returned to the client.

### Forms and Mutations

By passing a server action to the form action, React can progressively enhance the form. This means that forms can be submitted before the JavaScript bundle is loaded.

### Outside of Forms

server actions are exposed server endpoints and can be called anywhere in client code. When using a server action outside of a form, we can call the server action in a transition, which allows us to display a loading indicator, show optimistic state updates, and handle unexpected errors.

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
