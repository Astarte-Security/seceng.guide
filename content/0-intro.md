# Introduction

🎉Congratulations! You've just been hired as Head of Security Engineering at a small startup called _Jester Social_.

You are the very first security hire, and they do not have any security controls in place (yet!).

You ask them why they hired a Security Engineer, and they respond with:

> "Help make our product more secure!"

Reasonable answer in theory, but what does this mean in practice?

## Making a product more secure

What is a product? What do most companies ship?

It is what the company's customers use, which can include:
- A Ruby on Rails web application
- A C++ video game hosted on Steam
- An Electron-based IDE and text editor

In this case, Jester Social (made-up company for this training) is a clown-themed social media platform, i.e., a Ruby on Rails web application.

> [!NOTE]
> **Why Ruby on Rails?** It doesn't matter. Realistically, you'll join a company that has already built a product and has already made decisions around which languages and frameworks to use. It's important to be flexible and ready to work around prior decisions.

Our goal is to add security controls that would detect and prevent security issues in our app. This means:
- Scanning the app's codebase (and code added in all subsequent Pull Requests).
- Scanning third-party dependencies (any libraries our app uses to function).
- Scanning the app itself (a version of it that has been deployed).

<img width="841" height="305" alt="image" src="https://github.com/user-attachments/assets/fe162c1a-3b62-415a-80bc-c5cb515ccfd7" />


### The Jester Social app

- GitHub Repo: https://github.com/Astarte-Security/Jester-Social/tree/main
- Example instance hosted at: https://jester.social

We will be forking this GitHub repo (i.e. making our own copy of it), and setting up scans of the code and all future changes.

## Goals

We'll go over steps to implement security controls around a web application. This includes static analysis (SAST), Dynamic runtime analysis (DAST), and dependency scanning (SCA).
All of these steps are reproducible in any organization using GitHub, and the core concepts you will learn are the fundamentals of any security engineering function.

We've given versions of this workshop at conferences including HOPE, NorthSec, and HackSpaceCon. It is based on real-world experience setting up security engineering functions at various organizations.

Let's get our hands dirty!
