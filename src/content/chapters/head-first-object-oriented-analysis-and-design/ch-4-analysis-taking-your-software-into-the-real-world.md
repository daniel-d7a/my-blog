---
bookName: "Head First Object Oriented Analysis and Design"
chapterTitle: "CH-4 analysis, taking your software into the real world"
updatedAt: 2024-12-15
---

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
