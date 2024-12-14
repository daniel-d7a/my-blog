---
image: "@/assets/books/head-first-object-oriented-analysis-and-design.png"
name: "Head First Object Oriented Analysis & Design"
tags: "OOP, book"
updatedAt: 2024-12-14
inProgress: true
description: "Tired of reading Object Oriented Analysis and Design books that only makes sense after you're an expert? You've heard OOA&D can help you write great software every time-software that makes your boss happy, your customers satisfied and gives you more time to do what makes you happy. But how?
Head First Object-Oriented Analysis & Design shows you how to analyze, design, and write serious object-oriented software: software that's easy to reuse, maintain, and extend; software that doesn't hurt your head; software that lets you add new features without breaking the old ones."
---

# CH-1 great software begins here: well-designed apps rock

this book talks about how to write great software, but what is great software to begin with?

## what is great software?

great software:

- does what the customer wants.
- well-designed, well-coded, easy to maintain and modify reuse and extend.
- little dependency between classes (loose coupling).

## how to write great software?

1. make sure the software does what the customer wants.
2. apply basic OOP principles to add flexibility.
3. make it more maintainable and reuseable.

### functionality

- fix bugs.
- add tests (simple tests to make sure your code works).
- you can do some design here.
- make sure the app works before moving on.

### flexibility

- apply basic object oriented principles (enums, view models, composition through encapsulation).
- remove code design problems (duplication, redundancy, object mis-match, unused properties).
- one way of reducing duplication is following the rule "encapsulate what varies away from what stays the same" by extracting (or encapsulating) common properties used in multiple places to their own class.
- encapsulation (see appendix) allows us to to change data or behavior without changing other classes. It also allows us to hide the inner workings of your application’s parts, but yet make it clear what each part does.
- apply other principles such as polymorphism, abstraction, and inheritance.
- good class design and flexible code make it easier to change or add to it later.

### maintainability and reusability

- remove or reduce coupling between classes by introducing delegation and more encapsulation (and design patterns, and solid principles).
- when each class is independent and only cares about its own functionality changes to one class don't require changes ot other classes that use it, resulting in more reusability.
- delegation is when a class does a task and asks another class to perform it or a part of it, this makes each class worry about its own functionality rather than spreading its code across the application.
- delegation allows class to be reused in similar or even different projects later, and makes your application code loosely coupled.

## fragile software vs. robust software

fragile software breaks easily and is hard to upgrade or maintain, and will leave you fixing bugs late at night, while robust software is exactly the opposite as it satisfies the customer and the developer.

Object oriented analysis and design (OOA&D) provides a way to produce well-designed applications that satisfy both the customer and the programmer.

# CH-2 give them what they want: gathering requirements

to make sure your software does what the customer wants, you must first gather the right requirements.

## requirements

requirement: a specific thing the system has to do to work properly.

- specific: only one thing, a thing you can test.
- system: your software, your application.
- do: be able to perform or be.
- work correctly: work as the customer want.

requirements specify what the system has to do or be, not how.

### gathering requirements

- you must listen to customers to figure out your requirements.
- you must also think beyond what the customer says or wants, as customers don't know what they want exactly or leave out some details.
- customers expect the system to work even when problems occur.
- the best way to gather good requirements is to understand the system and the way it is used, and anticipate problems and add requirements to solve them.
- good requirements = good software, bad requirements = bad software.

### requirements list

- requirements lists are just lists of things that the customer wants, they help you define and identify what the system needs to do.
- they can specify the steps in which the system is used in an ordered manner.
- the steps that are most common for the system are called the main path (also called the happy path).
- requirements lists can specify alternate paths (in case of problems or alternate usages).

## use cases

A use case describes what your system does to accomplish a particular customer goal

- what: not how.
- particular: only one goal.
- customer: that is who we are working for an using the system (users outside the system)

a use case should have:

- a clear value: it helps the user achieve something.
- start and stop: something must begin the use case and something else must stop it.
- external initiator: some user (our outside system) that starts the use case.

use cases help us understand the system in order to write code that solves the customer problems, however it mustn't include code details

### how to use use cases?

use cases have a formal look (with bullet points and all) and an informal look that looks like a story.

requirements and use cases go hand in hand, while use cases are steps for requirements, requirements must cover all the use cases.

talk to the customer > gather requirements > transform requirements to use cases > compare your use case to the requirements to make sure they match > start writing code.

using use cases helps us identify the parts where problems might happen and handle these situations in our code. Thus, when we write our code we must test the alternative paths just like we do the main path

# CH-3 I Love You, You’re Perfect...Now Change: requirements change

the one constant in software is change.

- requirements change.
- new need come up.
- new solutions come up.
- languages change.
- new languages.
- new ideas.

## the customer is always right

the customer is always right, even if they want to change something they requested before. If the customer requested it then it must be done. However, if you have good use cases the change should be easy to implement.

## Use cases revisited

- the use case should make sense to you as it is here to help you.
- you can write it in the formal format or the non formal format as you like.
- the main path should be the the most common path the system takes.
- anytime the use case changes you must go back and change your requirements.

### scenarios

scenario: A complete path through a use case, from the first step to the last.

most use cases have different scenarios, but they must share the same goal.

## final notes on changes

Sometimes a change in requirements reveals problems with your system that you didn’t even know were there.

Change is constant, and your system should always improve every time you work on it.

# CH-4 analysis, taking your software into the real world

analysis helps you make sure your app works in the real world.

identify the problem > plan a solution > update the use cases > add new requirements & use cases > update the code.

## textual analysis

you need to pay attention to nouns and verbs in the use cases to know what to focus on.

looking at nouns and verbs in the use case to figure out classes and methods is called textual analysis.

nouns are candidates for classes, and verbs are candidates for methods. not every noun is a class nor every verb is a method.

nouns that are outside the system (like user and manager) don't get turned into classes, unless we need to interact with it or store information about it.

a good use case clearly explains what the system does, making textual analysis quick and easy.

## UML diagrams

we can represent associations using solid arrows with triangle heads, association is when 2 classes are connected by a reference (e.g. inheritance, extension, ...etc.).

association arrows have a multplicity number that shows how many of each class contributes to the association, where (\*) means any number.

UML diagrams give us a bird-eye view of the classes we have, how they relate to each other, what data and methods they have, this allows us to see the system from afar and communicate our ideas more clearly.
However, they omit many implementation details, such as constructors, method bodies, type details, ...etc.

# CH-5 good design == flexible software

## a simple problem

Problem: rick wants to be able to sell any stringed instrument instead of a guitar.

Proposed Solution: make a base abstract class for instrument and instrumentSpec, and a concrete child class for each type of instrument and spec.

<<uml diagram of the solution and the new symbols>>

Abstract classes are placeholders for implementation classes, they define behaviour that subclasses should implement.

abstracting common behaviour and attributes in a class that other classes can inherit from is a good practice.

<<add code for the solution>>

Problems in the proposed solution:

we need to test if our design is any good, one of the best ways to test your design is try and change it.

- we have multiple classes with nothing but a constructor.
- we need a search function for each instrument type, and we can't search through all instrument types all at once.
- we have to check the instrument type before instanciating an object.
- every new instrument type needs a new class and a new spec class.

<<add uml for the problems>>

## UML digrams again

when a class name is in italics, it means that this class is an abstract class.

the line ending in a diamond is and aggregation line, it means that one thing is made in part from another thing.

## some new definitions

### Interface

defines behaviour that applies to multiple type and becomes the prefered focus of the classes that use those types (not what class you are, but what can you do - aka what Interface do you implement).

always favour coding to interfaces not implementations.

coding to interfaces makes software easier to extend and makes the code able to work with all subclasses and even ones not yet created, instead of being able to work with only one specific class.

### Encapsulation

localizes change to protect code from unnecessary change.

### Change

Each class should only have one reason to change, a class that has many rasons to change is propably trying to do many things.

## a new solution

classes are about behaviour, if a subclass is empty then it sholudn't be a class.

instead of having instrument and instrumentSpec as abstract classes, we made them concrete class and got rid of instrument specific classes and defined each instrument by its name as a property on the instrument class.

design is iterative, and we have to be willing to change our designs, what worked and seemed right at a point in time might not be the best idea as the project moves on.

Pride kills good design, never be afraid to examine your own design decisions, and improve on them, even if it means backtracking.

another place where we can encapsulate what varies is in the spec class, since we have many instruments that can have many properties we can replace the hard coded properties with a dynamic property map.

when we have a set of properties that vary across objects, a good idea for encapsulation is to use a dynamic container such as a map or a list.

<<uml of new design>>

some times the solution is to add classes, other times it is to remove classes.

most good designs come from analysis of bad design.

we can now try to change the software again to see how easy it is to do so, and how good our design is, we can see that we no longer need new classes to add new instruments, nor we need to modify the classes to add new properties.

## cohesive software

- does one thing, and only one thing very well.
- doesn't try to be or do anything else.
- it is a measure of how closely related the functionality of a class is.

the higher the cohesion of the software the looser its coupling, which make it easier to change.

each time you modify your software you should aim to increase the level of cohesion.

## closing thoughts

fundamental software changes require a lot of work and design, unlike simple changes that should be easy in a well designed app.

design is iterative, but you must know when to stop iterating on a design, you stop when the app is working and the design looks good enough to you and your programming peers.

# appendix-1

## UML

- unified modifying language.
- used to describe classes to other people regarding structure, properties and functions.

## Inheritance

- a class extends another by reusing its code and ading functionality (variables and functions) or overriding exisiting functionality.
- promotes reusability and avoids repetition and duplication.

## Polymorphism

- is when a subclass stands for its superclass.
- allows code to be more flexible and resistant to change.

## encapsulation

- separating or hiding some code form the rest of the code.
- could be done through access modifiers (private/public) or methods.
- you can encapsulate data or behaviour.
- allows you to control how the code is used.
