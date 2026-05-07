# Agenda

Introductions
- Who We Are
- Who You Are
- What is Continuous Security
- What We’ll Be Covering

Labs
- SAST & Exercises
- DAST & Exercises
- AI-assisted Code Review

# Introductions

Why we created this workshop?
- We’ve had to re-do this over and over again at different orgs.
- Sharing tips we’ve learned over time. 
- We’ve struggled so you don’t have to!

# What is Continuous Security?

You may have seen it referred to as “shifting left”
- Generally it means the deeper you are in the Software Development Life Cycle (SDLC), the more expensive fixing a security vulnerability can be

Think about it in the simplest cases: a SQL injection is much easier to fix in the development phase compared to the maintenance phase
- In the maintenance phase, the feature with the vulnerability may be harder to modify (e.g. backwards compatibility, deployed less often, etc) and will require incident response to make sure it wasn’t exploited
- In the development phase, we haven’t progressed far enough for it to be a problem

The “continuous” part here refers to automation
- By leaning on automation, you can “continuously” look for security issues with minimal effort on your part

(Image: "Cost of Fixing Security Vulnerabilities Increases")

# What is this workshop?

Our goal for this workshop is for you to build familiarity with **the concepts** of Continuous Security, **not the tools**. Of course, we’ll use the tools first to get a handle on what we’re doing, but that won’t be our focus.

The idea is for you to take these concepts and apply them to other contexts
- We’ll be focusing on looking for bugs in our applications but you could just as easily apply the concepts here to any other security tool

We like the tools we recommend in this workshop, but each organization has their own needs and preferences.

This is what the “DIY” part of the DIY Continuous Security refers to: doing it yourself by selecting off-the-shelf open source tools that make the most sense for you, without having to depend on paid products to do everything for you
