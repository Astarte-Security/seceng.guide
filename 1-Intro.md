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

# Who’s this workshop for?

The intended audience for this workshop are
- Appsec people looking to broaden their impact
- Security consultants looking to go in house
- Software engineers looking to bring security into their practices
- Technical people looking to pivot into security engineering
- The first security hire or engineer with similar responsibilities looking to establish a good baseline

This isn’t an exhaustive list – it’s just meant more so for assuming a baseline level of experience before we start jumping into workshops

Feel free to interrupt to ask questions at any time. If there’s something that feels unclear or you run into an error, chances are you might not be the only one!

# What will we be covering?

SAST: Static Application Security Testing
- Automating application security code reviews

DAST: Dynamic Application Security Testing
- Automating interacting the app to manually find vulnerabilities

SCA: Software Composition Analysis
- Detecting out of date and vulnerable libraries

Secrets Detection
- Looking for secrets like API keys and PII being pushed in code

AI-Assisted Code Review
- Using Claude Code’s /security-review locally, then running it within CI as a GitHub Action

# Getting started

1. Create a Github account if you don’t already have one
- Tell us your username so we can invite you to our organization


2. Install Docker
- https://docs.docker.com/desktop/setup/install/mac-install/
- https://docs.docker.com/desktop/setup/install/windows-install/
- Confirm it works by running these commands in your terminal
  - `docker pull hello-world`
  - `docker run hello-world`


3. Fork & clone [seceng-sandbox/jester-social](https://github.com/seceng-sandbox/jester-social) to your computer
- This will only work after being added to the Github organization
- No need to do anything with this code – we will be using it for labs later


We will be using the Github Web UI to make our code changes, so don’t worry about setting up a developer environment

