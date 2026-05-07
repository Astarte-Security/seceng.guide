# Static Application Security Testing (or, SAST for short)

# What is Static Application Security Testing (SAST)?

Fundamentally, it’s automating the code review process
- Not strictly from an application security perspective, but ours today will be

When performing an application security code review, you might ask questions like
- Can I control the data that this function uses?
- Is this function being used correctly? Does it pose any risk if not?
- What will this function return?

SAST tools allow you to answer questions like these automatically, but faster and more efficiently

# SAST for Vulnerability Detection

- Here’s a sample Python/Django API for getting information about an item
- There’s a trivial SQL injection vulnerability here
- We could have caught this manually by making sure everyone who writes code includes us on code reviews, but that’s pretty unrealistic

```Python
from django.urls import path
from django.http import JsonResponse
from django.db import connection

def item_view(request, item_id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT * FROM store_item WHERE id = {item_id}")
        row = cursor.fetchone()

    if row:
        return JsonResponse({
            "id": row[0],
            "name": row[1],
            "price": row[2],
        })
    else:
        return JsonResponse({"error": "Item not found"}, status=404)

urlpatterns = [
    path("items/<item_id>/", item_view), status=404)
]
```

# Enter Semgrep

Semgrep is an open source tool that can automatically detect many types of vulnerabilities in code
- It covers more languages and frameworks than any one of us could all possibly be familiar with

These detections are made public as community maintained rules
- Being able to write rules means we can write our own ones tailored to the codebases and organizations we work with

Let’s run Semgrep against the sample from before

(Image: Semgrep Logo)

# Running Semgrep

```Bash
view_item.py
>> python. lang. security. audit. formatted-sql-query. formatted-sql-query
      Detected possible formatted SQL query. Use parameterized queries instead.
      Details: https://sg.run/EkWw

        7| cursor.execute(f"SELECT * FROM store_item WHERE id = {item_id}")
```

This is feedback that a developer can make sense of without us having to get involved!

It told us the line number, included a sample of the affected code, tells us what we might have done wrong and even makes a recommendation.

# How is automating SAST useful?

It frees up time for us to work on other security problems
- A lot of the questions asked during an application security code review are fundamentally simple questions
- Having the basics covered for us means we can work on more complex, in-depth questions

It increases the impact you can have as a security practitioner
- With the time freed up from doing code reviews, we can work on projects to address other security problems

It means you’re not the blocker for providing a baseline level of security
- If your coworkers needed you to sign off on every piece of code that goes to production, they would hate you and your team ☹️
- You would hate it too – doing nothing but code reviews all week can be exhausting

# But what are its limitations?

Like all automated tooling, SAST has its limitations.

We need to be aware of these limitations before going into this kind of work, or we risk wasting our time and annoying our coworkers.

# SAST Tools Don’t Have Context

SAST tools can only find vulnerabilities they’re designed to look for; this may sound obvious but in practice this means they can only operate on context available in code
- For example, if you’re looking at a piece of encryption code, SAST may complain that you’re using a weak algorithm or an improper configuration. However, if you were dealing with passwords, this feedback would be wrong. SAST tools typically cannot pick up on this and will not be able to recommend that you should be hashing instead.
- More succinctly: SAST tools do not have the “product context” of your code and cannot determine its authors’ intentions.

SAST tools are meant to augment your capabilities – not replace them.

```
Cipher.getInstance("AES/ECB/NoPadding");
```

```
Cipher.getInstance("AES/GCM/NoPadding");
```

Static analysis tools can tell the difference between these, but will not be able to tell you that you should probably use something like bcrypt instead.

# SAST Tools are False Positive Prone

Static analysis tools can have high false positive rates
- Because they don’t have full context, they may not be able to tell that certain types of vulnerabilities are not relevant to you
- Other detections may be overzealous and err on the side of caution way too often

Typically you will have some sort of “tuning” stage where you disable rules that are false positive prone
- Specific to your organization
- This step is crucial, otherwise you risk annoying your coworkers and training them to ignore all findings, including true positives!

# Deploying Static Analysis Tools

For larger organizations and codebases, deploying a static analysis tool is more complicated than just installing it and walking away
- The limitations we talked about will haunt your organization if you don’t take care of them early on

Any security tool – not just static analysis ones – need to be set up in such a way that maintenance and overhead is addressed ahead of time, otherwise you risk wasting time and effort
- Maintenance can include things like modifying rules, adding new ones, and vendor updates
