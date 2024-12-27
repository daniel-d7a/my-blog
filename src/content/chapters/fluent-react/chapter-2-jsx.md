---
bookName: "Fluent React"
chapterTitle: "Chapter 2. JSX"
updatedAt: 2024-10-15
---

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
