# Setting up Semgrep as a GitHub Action

We want to set up an automated SAST scan to run each time a developer opens a new Pull Request (PR) in GitHub.
In organizations that use GitHub, this is the standard way of proposing code changes to an existing repo.

## Creating a GitHub Action

1. In your fork of Jester Social, click on **Add file**, then **+ Create new file**.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/a5dd855b-2141-4142-84c2-6bafcccecdfc"
  alt=""
  width=""
  height=""
/>

2. Create a new file called `.github/workflows/semgrep-ci.yml` (make sure you keep the dot as the first character).

3. Paste the following contents into the file:

```
name: Semgrep Scan

on:
  pull_request: {}
  push:
    branches: ["master", "main"]

permissions:
  contents: read

jobs:
  semgrep:
    name: semgrep-oss/scan
    runs-on: ubuntu-latest

    container:
      image: semgrep/semgrep

    if: (github.actor != 'dependabot[bot]')
    steps:
      - uses: actions/checkout@v4
      - run: semgrep scan --config auto --json > semgrep-output.json
      - name: Upload semgrep output
        uses: actions/upload-artifact@v4
        with:
          name: my-semgrep-artifact
          path: semgrep-output.json
  annotate:
    name: Annotate Semgrep Results
    needs: semgrep
    uses: seceng-sandbox/workflows/.github/workflows/semgrep-annotate.yml@main
    with:
      artifact_name: my-semgrep-artifact
    permissions:
      contents: read
```

4. It will look similar to the screenshot below. Click on **Commit changes**.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/49df3324-d358-40de-8f09-f7e10681ee0d"
  alt=""
  width=""
  height=""
/>

5. On the next screen, push directly to the `main` branch, and click **Commit changes**.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/c7405225-d9db-4742-b1c2-3786f0780552"
  alt=""
  width=""
  height=""
/>

We have just defined a new GitHub action that will run on every new pull request and run a Semgrep scan on the code.

## Enable GitHub Actions

Now navigate to the **Actions** tab of your GitHub repo. If you see a message similar to the one below, you'll have to enable Actions by clicking on the `I understand my workflows, go ahead and enable them` button.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/bd98e28a-197f-4222-8ab3-b5508a7cd0d6"
  alt=""
  width=""
  height=""
/>

Once set up successfully, it should look similar to:

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/70334c73-e872-419d-9808-995a187aa3fb"
  alt=""
  width=""
  height=""
/>

Now let's test it to see how it would work from a developer's perspective!
