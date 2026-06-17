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

<img width="1142" height="731" alt="image" src="https://github.com/user-attachments/assets/66876113-6fd5-42eb-b372-1658ffeaf97d" />


2. Make sure the bottom two Dependabot configurations are also enabled. This will allow a GitHub Action to automatically open a PR to upgrade your dependencies.

<img width="774" height="251" alt="image" src="https://github.com/user-attachments/assets/37bc6044-b496-41d8-a22a-b346d6ce7947" />


3. A few minutes after enabling these options, Dependabot will start opening **Pull requests** to bump up the version of vulnerable dependencies.

<img width="1275" height="625" alt="image" src="https://github.com/user-attachments/assets/ff8af1bc-d47c-44f2-a8fc-0e6428471b9f" />


4. You can also navigate to the **Security and quality** tab of the repo, and find a Dependabot vulnerabilities dashboard that lists dependencies with known vulnerabilities.

<img width="1293" height="400" alt="image" src="https://github.com/user-attachments/assets/48301297-5f3a-4eff-a61c-e3c274fce5da" />
