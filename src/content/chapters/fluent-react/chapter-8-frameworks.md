---
bookName: "Fluent React"
chapterTitle: "Chapter 8. Frameworks"
updatedAt: 2024-10-15
---

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
