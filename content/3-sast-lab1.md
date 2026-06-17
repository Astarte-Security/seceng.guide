# Setting up Semgrep as a GitHub Action

We want to set up an automated SAST scan to run each time a developer opens a new Pull Request (PR) in GitHub.
In organizations that use GitHub, this is the standard way of proposing code changes to an existing repo.

## Creating a GitHub Action

1. In your fork of Jester Social, click on **Add file**, then **+ Create new file**.

<img width="378" height="183" alt="image" src="https://github.com/user-attachments/assets/134d3547-9a42-4ead-ad3b-56fa815c06e3" />


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

<img width="1024" height="365" alt="image" src="https://github.com/user-attachments/assets/35c6f66e-0641-48d4-9bd9-aae6b3b0ff55" />


5. On the next screen, push directly to the `main` branch, and click **Commit changes**.

<img width="473" height="159" alt="image" src="https://github.com/user-attachments/assets/9c7f5468-6c72-408f-8d8b-172576b424bc" />


We have just defined a new GitHub action that will run on every new pull request and run a Semgrep scan on the code.

## Enable GitHub Actions

Now navigate to the **Actions** tab of your GitHub repo. If you see a message similar to the one below, you'll have to enable Actions by clicking on the `I understand my workflows, go ahead and enable them` button.

<img width="1522" height="478" alt="image" src="https://github.com/user-attachments/assets/17767066-9479-44d3-abcf-51c5622a82d0" />


Once set up successfully, it should look similar to:

<img width="1014" height="419" alt="image" src="https://github.com/user-attachments/assets/ce2ad7a8-c4ee-4323-bcff-46910b53dc28" />


Now let's test it to see how it would work from a developer's perspective!
