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

<img width="735" height="112" alt="image" src="https://github.com/user-attachments/assets/35e48fb8-43e7-4736-a37e-3991b0bd69d5" />


To enable **Issues**, go to the **Settings** tab of your repo, and under the first page (General settings), scroll down to **Features** and tick the **Issues** checkbox.

<img width="787" height="247" alt="image" src="https://github.com/user-attachments/assets/c8448d1d-a1a0-4055-a5f3-ce17a7e47786" />


4. Once the scan is complete, go to your **Issues** tab of the repo, and your DAST findings should be there.

<img width="546" height="302" alt="image" src="https://github.com/user-attachments/assets/8a6b5d13-5982-41e2-967b-ce14f3814660" />


