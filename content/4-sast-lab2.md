# Testing our SAST Action

Now that SAST scans are configured on the repo for all future changes, let's see what it looks like!

We are now a software engineer who will introduce new code that contains a vulnerability. Let's see if the Semgrep Action catches it!

## Introducing a vulnerability

1. Navigate to the `app/controllers/jest_controller.rb` file in the GitHub UI, and then click on the edit (pencil) button, and **Edit in place** (or press `E` on your keyboard).

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/e093c7f7-538f-4655-ac3b-157972c3e318"
  alt=""
  width=""
  height=""
/>

2. Replace the contents of the file with the following:

```
class JestsController < ApplicationController
  before_action :require_authentication
  before_action :set_jest, only: %i[ show ]

  def index
    @page = (params[:page] || 1).to_i
    @jests = Jest.visible_to(Current.user)
                 .order(created_at: :desc)
                 .offset((@page - 1) * 50)
                 .limit(50)
    @has_more = Jest.visible_to(Current.user).count > @page * 50
    @jest = Jest.new
  end

  def show
    @comment_page = (params[:comment_page] || 1).to_i
    @comments = @jest.comments.includes(:user)
                    .order(honks_count: :desc, created_at: :desc)
                    .offset((@comment_page - 1) * 50)
                    .limit(50)
    @has_more_comments = @jest.comments.count > @comment_page * 50
  end

  def create
    @jest = Current.user.jests.build(jest_params)

    if @jest.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @jest }
      end
    else
      @jests = Jest.visible_to(Current.user).order(created_at: :desc)
      render :index, status: :unprocessable_entity
    end
  end

  private

  def set_jest
    # This is MUCH faster!
    @jest = Jest.where("id = #{params[:id]}").first
  end

  def jest_params
    params.require(:jest).permit(:content, :audience)
  end
end
```

The change is on lines 61 and 62. Not sure if this is an appropriate change? That's fine! The SAST tool will do the checking for us!

> [!NOTE]
> **_(Optional)_ Why is this change bad?** It introduces SQL injection via string interpolation.
> The problem is the string form of `where`. When you pass `where` a raw string, Rails treats it as a literal SQL fragment and does no parameterization. So `params[:id]` is concatenated directly into the query. The hash form (`where(id: ...)`) and the placeholder form (`where("id = ?", ...)`) bind values through the adapter; the bare interpolated string does not.
> 
> Resulting query for a benign input:
> 
> 
> ```sql
> SELECT "jests".* FROM "jests" WHERE (id = 1) ORDER BY "jests"."id" ASC LIMIT 1
> ```
> 
> An attacker controls everything after `id = `. A few illustrative payloads for `params[:id]`:
> 
> * `1 OR 1=1` → predicate always true; `.first` still returns a row, but the filter is now meaningless (auth/scoping bypass if this is how a record is fetched for a user).
> * `1) UNION SELECT ... --` → exfiltrate arbitrary columns/tables (you'd need to match column count/types, and the `ORDER BY/LIMIT` that `.first` appends is commented out by `--`).
> * `1 AND (SELECT ... )` → boolean/time-based blind extraction if errors aren't reflected.
> 
> The `.first` doesn't save you, it just appends `ORDER BY ... LIMIT 1`, which the injected payload can terminate or comment out, and it does nothing to neutralize the interpolation.
> 
> The `# This is MUCH faster!` comment is the tell — someone rationalized avoiding the safe form on performance grounds, which is wrong. There's no meaningful speed difference between interpolation and a bound parameter here; if anything, parameterized queries help the DB reuse prepared statement plans.

3. Click on **Commit changes...**, then **create a new branch for this commit** and start a pull request.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/1934b480-4dce-4f2f-9d3a-63298eb7a495"
  alt=""
  width=""
  height=""
/>

4. Once you click on **Propose changes**, you should be on a page similar to this:

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/de1aab4a-37b1-436f-bcbd-a5020e2ffa26"
  alt=""
  width=""
  height=""
/>

5. Click on **Create pull request**, give it a title (or keep the default one), then click on **Create pull request** again.

6. Once the PR is created, wait a few moments, and you'll eventually see a new box in the PR's GitHub UI that says **Some checks haven't completed yet**: This means there are Actions running. In the screenshot below, you can see our Semgrep Action queued to run.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/4adbdeb4-1134-499d-ad6e-61d7644ffdcc"
  alt=""
  width=""
  height=""
/>

7. Once the Action has finished running, navigate to the **Files changed** tab of the PR to see the code changes. You will now see a new box from the semgrep scan, annotating the code, flagging the vulnerability.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/632f366c-d8c4-47bf-a1d9-d941a199330f"
  alt=""
  width=""
  height=""
/>

## What this means

Moving forward, for any new PR opened in this repo, Semgrep will run a scan and identify any potential vulnerabilities in the code.

Potential future improvements for this process:
- Automatically enable (and enforce) this check across all repos.
- Block merging if any findings exist (make sure to tweak the rules first to avoid excessively high false positive rates).
- You could modify the Action to leave other comments on the PR, including instructions for the developers on how to address the findings, or how to engage with the security team (e.g., could link to documentation).
- You could slowly roll out more rules (starting with high-impact ones, then adding new rules).
- You could start collecting finding metrics to measure how well your scanner is performing (and how many findings each team is introducing).

## Optional: Scanning only files changed

If you go to your Actions tab or expand details for the Semgrep run, you may have noticed that the Semgrep scan has identified 14 total findings, but only annotated one of them in that PR.

<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/c221ccb3-4df5-487b-bcea-0db00cc23274"
  alt=""
  width=""
  height=""
/>

This is because our Semgrep Action ran against the entire codebase, not constrained to just the files changed within this PR.

This is not a big deal, but in case you want to optimize the Action to run faster, and only check files changed within the PR, you can replace the `.github/workflows/semgrep-ci.yml` file with the following contents:

```
name: Semgrep Scan - Improved

on:
  pull_request: {}
  push:
    branches: ["master", "main"]

permissions:
  contents: read

jobs:
  semgrep:
    name: Run Semgrep
    runs-on: ubuntu-latest
    permissions: read-all

    container:
      image: semgrep/semgrep

    if: github.actor != 'dependabot[bot]'
    steps:
      - uses: actions/checkout@v4

      - name: Get list of changed files
        id: changed-files
        uses: tj-actions/changed-files@v44

      - name: Run Semgrep
        run: |
          echo "Changed files: ${{ steps.changed-files.outputs.all_changed_files }}"
          semgrep scan --verbose --json ${{ steps.changed-files.outputs.all_changed_files }} -o semgrep-output.json
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
      fail_on_findings: true
    permissions:
      contents: read
```

This will ensure that only the files changed within this PR are fed into the Semgrep Action.

> [!NOTE]
> Astute readers may have noticed that our Action references another one, `seceng-sandbox/workflows/.github/workflows/semgrep-annotate.yml@main` to run the annotations on the code. This is an Action we've written and hosted elsewhere to simplify the Actions demonstrated within this workshop.
>
> You can optionally copy its contents and combine them to have a single Action.

## Bonus: Who scans the GitHub Actions?

GitHub Actions themselves can be vulnerable, as seen in recent [supply-chain compromises by TeamPCP](https://www.youtube.com/watch?v=BKatZyU7svI).

Consider using [Zizmor](https://github.com/zizmorcore/zizmor), a static analysis tool for GitHub Actions, that can flag common misconfigurations and recommend fixes.
