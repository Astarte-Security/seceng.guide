# SCA

**Software Composition Analysis (SCA)** involves scanning dependencies within our product (i.e., third-party software libraries) for vulnerabilities.

Any product consists of several third-party code libraries used in addition to the code our own developers write. These libraries/dependencies contain vulnerabilities that attackers can exploit.

From an external perspective, our product can be attacked, and the public perception doesn't change if the cause was a flaw in our own code or a third-party library: We need to prevent that either way. 

## SCA limitations

- Only finds known vulnerabilities.
- High false positive rate: The package may contain a vulnerability, but you need to triage it yourself to see if you use the affected code. In many cases, we could be using the vulnerable package, but not the specific function within it that is vulnerable.
- Frequently ignored by developers because it is noisy (a large number of findings, often).

## Tools

- bundler-audit
- Dependabot
- Black Duck
- dependency-check
- Clair

## Configuring Dependabot

1. First, enable Dependabot by going to your repo's **Settings > Advanced Security > Dependabot** and checking the relevant boxes, as shown below:

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/d4853d3b-99df-494e-9cdf-22a7af48fb30"
  alt=""
  width=""
  height=""
/>

2. Make sure the bottom two Dependabot configurations are also enabled. This will allow a GitHub Action to automatically open a PR to upgrade your dependencies.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/5a23ac30-de16-4650-b210-92ab06326897"
  alt=""
  width=""
  height=""
/>

3. A few minutes after enabling these options, Dependabot will start opening **Pull requests** to bump up the version of vulnerable dependencies.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/c8cf4efe-6e4f-4161-be14-37339e4d4312"
  alt=""
  width=""
  height=""
/>

4. You can also navigate to the **Security and quality** tab of the repo, and find a Dependabot vulnerabilities dashboard that lists dependencies with known vulnerabilities.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/fd48ed30-296e-4268-a0f7-0206e6fc99cf"
  alt=""
  width=""
  height=""
/>
