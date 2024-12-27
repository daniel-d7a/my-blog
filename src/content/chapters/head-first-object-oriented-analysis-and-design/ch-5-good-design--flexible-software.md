---
bookName: "Head First Object Oriented Analysis and Design"
chapterTitle: "CH-5 good design == flexible software"
updatedAt: 2024-12-15
---

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
