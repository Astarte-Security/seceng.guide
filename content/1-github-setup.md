# GitHub Setup

We will be using GitHub to host our codebase and implement our automated checks via GitHub Actions.

1. Make sure you have a GitHub account. We will be running most activities within GitHub's web UI for simplicity.

2. Navigate to the Jester Social public repository: https://github.com/Astarte-Security/Jester-Social/tree/main
This is where the code for our app lives.

3. Click on the `Fork` button in the top-right corner of the page. This will create a copy of this repo under your own GitHub account.

<img width="1094" height="339" alt="image" src="https://github.com/user-attachments/assets/1412c3cc-b801-4f80-b3a7-99f442a054e1" />


<img width="771" height="567" alt="image" src="https://github.com/user-attachments/assets/f99065e0-0600-4176-8d43-dad7263c578a" />

<p class="md-caption">On the next page, you can keep all settings default, and click on "Create fork"</p>

<img width="755" height="389" alt="image" src="https://github.com/user-attachments/assets/a29bc499-1b23-43a6-87e7-e8643991806f" />

<p class="md-caption">This will take you to your own fork of the repo. This is hosted under your own GitHub account name, which will be visible in the circled areas above.</p>

> [!IMPORTANT]
> From now on, we will be working entirely within your own fork of the repo, which is hosted in your account.

## What are GitHub Actions

Now that we have access to the code, we'll need a way to automate running tests. Conveniently, GitHub hosts the GitHub Actions platform, which gives us the ability to run automated tasks within its own infrastructure (we won't have to set up a server).

**[GitHub Actions](https://docs.github.com/actions)** is a built-in automation and **continuous integration and continuous delivery (CI/CD)** platform integrated directly into [GitHub](https://docs.github.com/articles/getting-started-with-github-actions). 

GitHub Actions are configured via **YAML files** stored inside a repository's `.github/workflows/` directory.

> [!IMPORTANT]
> In YAML files, every space character counts. Which means that if you add or remove a single invisible space character from any line, the whole file may be misformatted and stop working. Be aware of the format, and try to copy-paste YAML files to prevent formatting issues.

If you navigate to your repo's `.github/workflows/` folder on GitHub, you'll notice there already exists a `ci.yml` file. This includes a few standard checks provided by Ruby on Rails by default. You can ignore this for now. 

Any new YAML file added in this folder will be run as a GitHub Action. We will be using these later to add our own tools and configure them to run automatically. 
