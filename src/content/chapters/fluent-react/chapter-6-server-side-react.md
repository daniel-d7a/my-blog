---
bookName: "Fluent React"
chapterTitle: "Chapter 6. Server-Side React"
updatedAt: 2024-10-15
---

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
