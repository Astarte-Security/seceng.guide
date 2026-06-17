# Secrets Scanning

A common cause for breaches is leaked or accidentally exposed secrets. How can we detect and prevent secrets from leaking into our code?
  
## What are secrets

 There are different types of secrets, including:
- SSH keys
- API keys
- passwords
- high entropy strings

How do you know if a given string is a password? It can be hard to tell. So secret scanners attempt to guess if a string is a password by detecting if it has *high entropy*, i.e., a seemingly random sequence of characters.

## Why should we scan for secrets?

Developers sometimes accidentally expose a secret within the code. For example, they may include it for testing, then forget to remove it. 
It’s a trivial way for a company to get breached, in case the code ever gets leaked or made available publicly.

Bad actors are always scanning for secrets on GitHub (AWS credentials for crypto miners?)

## What are some limitations? What can’t it find?

- False positives, especially for high entropy strings
- Typically only works for known types of secrets (may not catch you putting your password in a text file)
- Catches secrets late in the process (already committed), but can get ahead of this by running secrets scanners as Git Commit Hooks.

## Tools

- TruffleHog
- Gitleaks
- detect-secrets
- Semgrep's secrets module

Sample TruffleHog run:

<img
  src="https://camo.githubusercontent.com/89e2214944f8282f90c4cca2a5a642a83e7fbdd97c818cf788a745a774413370/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f74727566666c652d64656d6f732f6e6f6e2d696e7465726163746976652e737667"
  alt=""
  width=""
  height=""
/>

## Additional resources

- TruffleHog's guide to [running it in a GitHub Action](https://trufflesecurity.com/blog/running-trufflehog-in-a-github-action)
- [TruffleHog GitHub Action](https://github.com/marketplace/actions/trufflehog-oss)
