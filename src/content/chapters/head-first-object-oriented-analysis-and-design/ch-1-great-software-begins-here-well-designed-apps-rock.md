---
bookName: "Head First Object Oriented Analysis and Design"
chapterTitle: "CH-1 great software begins here: well-designed apps rock"
updatedAt: 2024-12-15
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
