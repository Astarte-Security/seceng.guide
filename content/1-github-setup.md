# GitHub Setup

We will be using GitHub to host our codebase and implement our automated checks via GitHub Actions.

1. Make sure you have a GitHub account. We will be running most activities within GitHub's web UI for simplicity.

2. Navigate to the Jester Social public repository: https://github.com/Astarte-Security/Jester-Social/tree/main
This is where the code for our app lives.

3. Click on the `Fork` button in the top-right corner of the page. This will create a copy of this repo under your own GitHub account.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/8197d9b5-fb27-46be-9d49-a09859ca4499"
  alt=""
  width=""
  height=""
/>
<p class="md-caption">Button to Fork the repo</p>

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/5ae88f17-1eea-4875-a56a-6e7e2541fae1"
  alt=""
  width=""
  height=""
/>
<p class="md-caption">On the next page, you can keep all settings default, and click on "Create fork"</p>

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/72de84d8-ad87-4082-a2fa-c2ae54800c6b"
  alt=""
  width=""
  height=""
/>
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
