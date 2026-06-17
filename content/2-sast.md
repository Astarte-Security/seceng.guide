# SAST

How can we tell if code has vulnerabilities?

**Static Application Security Testing (SAST) tools help us run static analysis on our codebase, to identify potential bugs.**

This works by scanning the code, line by line, and matching it with known bad patterns worth flagging to the developers or security engineers. 

## Tool: Semgrep

There are many tools that can do the job:

- GitHub has CodeQL, but you may need a GitHub Advanced Security license to scan your organization with it. 
- There are commercial SAST scanners, like Coverity or Aikido.
- [Semgrep](https://docs.semgrep.dev/learn) has a free version of their scanner, and will be our primary choice for this workshop.

**Semgrep advantages**:
- Can scan a single file without needing to compile the codebase (leveraging Tree-Sitter).
- Widely/freely available to run locally on any platform.
- Can easily run as a GitHub Action.
- Has configurable rulesets that can be tuned.

## Installing Semgrep locally (optional)

We will later be running it as a GitHub Action, but it is encouraged to try running it locally first to get a feel of how it works and what it can find. 

To install it, you have a few options:
- As a Python package, with:

```
python3 -m pip install semgrep
```

- Within Homebrew:

```
brew install semgrep
```

- As a [Docker](https://docs.docker.com/desktop/setup/install/mac-install/) container, you can run it with:

```
docker run --rm -v ~/path/to/jester-social:/src semgrep/semgrep semgrep scan
```

- Or within WSL2, using:

```
sudo snap install semgrep
```

## Running Semgrep locally (optional)

Once you have it installed, navigate to any folder containing the codebase you want to scan.
In our example, you'd have to clone the Jester Social app locally, `cd` into it, then run a default scan with:

```
semgrep scan
```

This picks a default set of rules (equivalent to the flag `--config=auto`), and then launches a scan against your codebase. Scanning the Jester Social app should take less than a minute to complete.

You should see the scan beginning with:

<img width="595" height="190" alt="image" src="https://github.com/user-attachments/assets/f23ee8fe-bb14-4449-9d99-51caa20e9318" />


Followed by a list of findings (in our case, there were 15 code findings), such as:

<img width="877" height="164" alt="image" src="https://github.com/user-attachments/assets/7566252d-c848-4dab-bcb7-1ff6f5d2a1ec" />


> [!NOTE]
>A single item from a scanner's output is typically called a _finding_, because we have not triaged the results yet, and have not confirmed whether they are actual vulnerabilities, or _false positives_.
> 
> A _false positive_ means a finding surfaced by the scanner that does not actually pose any risk in the context of our app.

<img width="615" height="1051" alt="image" src="https://github.com/user-attachments/assets/0199d1ec-fdc0-4098-8121-f2333025a2e5" />

<p class="md-caption">SAST lifecycle</p>

## SAST limitations

Because static analysis tools are pattern-matching machines, they can be noisy in terms of high false-positive rates or can lack context.

For example, they are GOOD at flagging simple patterns that should be avoided, and can offer recommendations on what should be used instead. As in the following example:

<img width="776" height="294" alt="image" src="https://github.com/user-attachments/assets/8a401100-1a5c-43ec-85cf-014811cb2477" />

<p class="md-caption">ECB bad, GCM better!</p>

But what the SAST scanner may have missed is: **What if we're encrypting the password here, when we should instead be hashing it?**

SAST scanner may not have the full context of what is appropriate, do not understand business context and requirements, and often misses logic bugs.

To cover these gaps, consider:
- Dynamic testing or penetration tests.
- AI scanners that are much better at understanding context.

## Semgrep rules

Each Semgrep scan surfaces findings defined by a list of _rules_ (YAML files) that instruct its scanning engine on what to look for. 

Advanced usage can include writing your own rules, but for now, there are plenty of good rules we can use that other folks have written!

- Semgrep hosts its own set of community rules: https://github.com/semgrep/semgrep-rules
- Trail of Bits publishes their own rules: https://github.com/trailofbits/semgrep-rules
- GitLab publishes its own rules: https://gitlab.com/gitlab-org/security-products/sast-rules/-/blob/main/README.md?ref_type=heads
- raptor/0xdea has published C++ rules: https://github.com/0xdea/semgrep-rules
- iosifache has made a Semgrep rules manager, and lists other rules sources in this great repo: https://github.com/iosifache/semgrep-rules-manager

To simplify this workshop, we'll be using Semgrep's default ruleset, but the resources linked above should be enough to get you up to speed on customizing your rulesets.

For more information on writing your own Semgrep rules, consult the [Trail of Bits guide](https://appsec.guide/docs/static-analysis/semgrep/advanced/#writing-custom-rules)

## Additional Resources:

- [Semgrep learning guides](https://docs.semgrep.dev/learn)
- [Trail of Bits' Semgrep Guide](https://appsec.guide/docs/static-analysis/semgrep/installation/)
