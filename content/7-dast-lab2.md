# ZAP

Since Nuclei is a template-based scanner, you can instead (or, simultaneously) use a DAST tool with more features. A popular free one is ZAP, which can also be deployed as a GitHub Action.

Here's how to deploy ZAP to run as an Action:

1. Create a new file called `.github/workflows/zap-scanner.yml`
2. Paste the following contents into the file:

```
name: ZAP Scan

on:
  workflow_dispatch:
jobs:
  zap_scan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    steps:
      - uses: actions/checkout@v4
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.15.0
        # NOTE:
        # The above runs a PASSIVE scan
        # Which is much faster (minutes)
        # If you instead want to run an ACTIVE/FULL scan:
        # uses: zaproxy/action-full-scan@v0.13.0
        # WARNING: It may take 30min or more to finish.
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          docker_name: 'ghcr.io/zaproxy/zaproxy:stable'
          target: 'https://jester.social/'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'
```

> [!WARNING]
> - The target above has been replaced by a generic example domain, to prevent DDoSing Jester Social.
> - It also runs a short, passive scan.
> - You can run a full active scan by using the `zaproxy/action-full-scan@v0.13.0` step instead.
> - An active scan can take 30min or more to complete!

3. If your repository does not have **Issues** enabled, you may see this error message:

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/9e59bd9b-c80d-4c44-866c-6b84fc90cf3b"
  alt=""
  width=""
  height=""
/>

To enable **Issues**, go to the **Settings** tab of your repo, and under the first page (General settings), scroll down to **Features** and tick the **Issues** checkbox.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/8910ba1a-fa39-4793-adde-b4d5ca7ae32b"
  alt=""
  width=""
  height=""
/>

4. Once the scan is complete, go to your **Issues** tab of the repo, and your DAST findings should be there.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/4126e11c-2842-4d30-a112-2f72d93a2b36"
  alt=""
  width=""
  height=""
/>

