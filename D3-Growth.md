# DRY Principle

Don't Repeat Yourself

In the book 'The Pragmatic Programmer', we can see this definition for DRY: Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

and

DRY is about the duplication of knowledge, of intent. It’s about expressing the same thing in two different places, possibly in two totally different ways.

# KISS

Keep it simple stupid

# Principle of Least Knowledge

Also known as Law of Demeter

The idea behind this principle means that, inside your application, the code that you write should express knowledge only of its surroundings.

It's very close to The One Dot Principle. (When we have some function/method, its code shouldn't access data in some object throughout more than one dot, e.g. user.getAccount().getBalance().substractSum(invoiceTotal)).

So I can formulate it as: We shouldn't place any business logic not belonging to some module into this module.

It's another incarnation of the Single responsibility principle.

# Separation of concerns

There is nothing special. This is exactly how it sounds.

# SOLID principles
S = Single Responsibility Principle

For any changes in a module, there should be only a single reason.

O = Open-closed Principle

An interface should be open to extension and closed to changes.

L = Liskov (Barbara) Substitution Principle

All instances of a superclass can be substituted by instances of their subclasses.

So preconditions of a superclass can't be strengthened, and postconditions can't be weakened in a subclass.

It's one of the most important reasons for tight coupling.

I = Interface Segregation Principle

Subclass shouldn't inherit useless methods. In cases of a lot of in common, it's better to segregate a common interface and inherit both from it.

D = Dependency Inversion Principle

Modules shouldn't depend on details.

A general shouldn't depend on a particular (specific).

If your module for establishing a database connection depends on a particular DB driver - it's a problem.

Both general and particular should depend on abstractions.

(So, create an interface for DB drivers.)


# What is Software Architecture?


## Definition

- Expert developers' shared understanding of the system design.
- The decisions that are hard to change.
- The important stuff. Software architecture forces us to recognize what is really important and how to deal with it.

© Martin Fowler

## Components

- software elements (modules)
- relations among them (connections and communication protocols)
- properties of both elements and relations (quality attributes)
- constraints

# Steps to define Architecture?

- Identify Stakeholders (to communicate with)
- Understand the Problem, Functional Requirements (solve a valid business problem or have a recognizable return on investment (ROI))
- Identify Design Elements and their Relationships (boundaries and context of the system)
- Evaluate the Architecture Design (Non-Functional Requirements, quality attributes, constraints)
- Prioritize quality attributes (trade-off analysis, suffer ones for others)
- Transform the Architecture Design (quality attributes oriented - optimization of solutions using various patterns)
- Document the results (to facilitate communication between stakeholders)

