# DAST

We've explored how to scan the application's code. But what if we just test the app directly?

**Dynamic Application Security Testing (DAST)** tools do just that. They interact with the app that you've deployed, and flag potential security issues.

Reasons why this may be beneficial:
- Validates what's _actually deployed and running_ in practice.
- Vulnerabilities may be introduced in many different places: Configuration files, deployment mistakes, third-party libraries, etc.

Example: The version of the app deployed may accidentally have its staging configuration enabled instead of its production configuration. Or, a load balancer may be introducing unintended behavior.

> [!NOTE]
> An application’s **emergent properties** are its characteristics that arise from the interactions between **all its components**, as opposed to individual components one at a time
>
> SAST targets just one component: source code
>
> DAST is useful here because it requires your application to be running, which necessarily means that all its individual components need to be running too
>
> So, instead of testing each component individually, we test the entire product as a whole.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/8679cea6-0869-4d86-ab0d-6949067c2352"
  alt=""
  width=""
  height=""
/>

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/3969ddb8-3c66-464b-8009-62ec6b3033c1"
  alt=""
  width=""
  height=""
/>

## SAST vs DAST

Which one is better? Which one should I be using?

SAST and DAST are not mutually exclusive. They uncover different vulnerabilities, and a good security program leverages both.

- SAST will identify issues earlier, whereas DAST requires the app to be deployed.
- SAST findings may not always be present in production. DAST findings demonstrably exist.
- DAST takes more effort to configure properly, esp. authentication.
- SAST and DAST can both lack context and understanding of how an app is intended to work.

## DAST Tools

Common DAST tools include:
- Nuclei
- ZAP
- Nmap (with scripts)
- Burp Suite Enterprise (commercial)
- Tenable (commercial)

## DAST limitations

> "I LOVE our DAST tools, they are so reliable!" - literally no one, ever

It is quite challenging to meaningfully **configure** a DAST tool to the point of consistently getting great findings from it.

Typically, a DAST tool will surface **low-hanging fruit**, like missing cookie flags or HTTP headers. Findings that any scanner can quickly find, without having to dig too deep, and without having to understand the app's  purpose or functionality.

Conversely, many of those findings can be **false positives**, or have negligible impact (little to no risk associated with them).

Another common challenge is setting up **authentication** for the app correctly. Many teams make the common mistake of aiming the DAST scanner at the login page without providing any credentials. It is even more challenging to set up multiple accounts to test for authorization issues.

Fortunately, the state of DAST seems to be improving as multiple "AI-pentest" companies are building products that can be considered the next generation of DAST tools. LLM reasoning is used to understand the app's purpose and functionality, which can lead to logic bugs that traditional DAST tools cannot find.
