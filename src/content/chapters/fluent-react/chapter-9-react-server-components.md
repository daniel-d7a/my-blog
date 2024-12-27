---
bookName: "Fluent React"
chapterTitle: "Chapter 2. JSX"
updatedAt: 2024-10-15
---

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
