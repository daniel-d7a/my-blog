---
bookName: "Fluent React"
chapterTitle: "Chapter 3. The Virtual DOM"
updatedAt: 2024-10-15
---

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
