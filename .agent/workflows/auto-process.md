---
description: End-to-end dialogue generation from ToDo.md, including review, user validation, and Supabase push.
---

1. **Check for Uncommitted Dialogue**:
    -   Check if there are any uncommitted or untracked dialogue JSON files in the `/Users/Chetan/Documents/Projects/DialogueGenerator/output/` directory (e.g., using `git status` or checking for modified/untracked files).
    -   If an uncommitted dialogue file is found, ask the user if they would like to complete it first before moving to a new issue/scenario.
    -   If the user says "yes" to completing it:
        - Identify the Linear issue associated with this dialogue (usually mentioned in the JSON, or by checking the recent Linear issue status/comments, or asking the user).
        - Resume the workflow starting from **Step 4 (Iterative Review)** or **Step 5 (User Validation & Correction)** using this dialogue file.
    -   If the user says "no" (or if no uncommitted dialogues exist), proceed to **Step 2 (Pick a Scenario)**.
1. **Pick a Scenario**:
    -   Call the `list_issues` tool on the `linear-mcp-server` MCP server filtering by project `NaCl Dialogues` (or project ID `82410d4b-aee9-4d99-bd6a-9e3fcf687211`).
    -   Retrieve all active issues (filter out any issues in `Done` state).
    -   **Check for In-Progress Issues**:
        - Check if there are any issues with the state `In Progress`.
        - If in-progress issues exist, list them for the user and ask if they would like to complete one of these first before moving to a new issue.
        - If the user selects an in-progress issue, proceed with that issue.
        - If the user chooses to start a new issue (or if there are no in-progress issues), proceed to pick a scenario using the prioritization logic below.
    -   Prioritize and pick a scenario based on the following logic:
        1. **Priority First**: Look for any issue with high or urgent priority (priority value `1` = Urgent, `2` = High). If found, pick that issue first.
        2. **Latest Date First**: If no high/urgent priority issues exist, pick the issue with the latest creation date (sort issues by `createdAt` in descending order).
    -   Record the issue key (e.g., `NAC-28`) for the selected issue.
    -   Use the issue's `title` and `description` as the input scenario details for the dialogue writer.
1. **Generate Dialogue**:
    -   Use the skill `naati-dialogue-writer` (located at `.agent/skills/naati-dialogue-writer/SKILL.md`) to generate a dialogue based on the picked scenario.
    -   **Save the generated dialogue JSON** to the `/Users/Chetan/Documents/Projects/DialogueGenerator/output/` directory.
    -   **File naming convention**: `yyyy-mm-dd_short-name.json`, where:
        - `yyyy-mm-dd` is today's date (e.g., `2026-03-15`)
        - `short-name` is a concise kebab-case label derived from the scenario topic (e.g., `medical-appointment`, `visa-renewal`)
        - Example: `2026-03-15_medical-appointment.json`
    -   Always use this same file path when referring to the dialogue in subsequent steps.
    -   **Update the Linear issue status**: Call the `save_issue` tool on `linear-mcp-server` with `id` set to the selected issue key (e.g., `NAC-28`) and `state` set to `In Progress`.
    -   **Check for a variant match**: Query the Supabase `Dialogue` table (`execute_sql` tool, `select id, title, scenario from "Dialogue"`) and compare the new dialogue's title/scenario against existing rows. Don't be aggressive about this: only if there's a clear, obvious match (same underlying scenario, e.g. same setting/task just reworded), prefix the new dialogue's `scenario` field with `(Variant of #<id>) `before saving. If nothing clearly matches, leave the scenario as-is.
1. **Iterative Review**:
    - Review the generated dialogue **3 times** consecutively using the skill `naati-dialogue-reviewer` (located at `.agent/skills/naati-dialogue-reviewer/SKILL.md`).
    - Fix any issues identified in each review iteration before moving to the next one.
    - After each review pass, **overwrite the same output file** (from Step 3) with the updated dialogue JSON.
1. **User Validation & Correction**:
    - Present the final dialogue to the user and ask them to validate it.
    - If any changes are needed, apply them while still following the guidelines from the above skills.
    - After applying corrections, **overwrite the output file** (from Step 3) with the corrected dialogue JSON.
    - If you make corrections based on user feedback, formulate them into generic corrections (not dialogue-specific) and add them via the `correction` workflow (`.agent/workflows/correction.md`).
1. **Push to Supabase & Finalize**:
    -   Once everything is validated and completed to the user's satisfaction, ask the user if they want to push the dialogue to the database.
    -   If the user says "yes", use the skill `push-dialogue-to-supabase` (located at `.agent/skills/push-dialogue-to-supabase/SKILL.md`) to push the output file from Step 3 to Supabase.
    -   **Once the Supabase push is successful, perform the following actions**:
        -   **Git Commit**: Commit the changes to the repository. The commit should include only the new dialogue JSON file (from Step 3) with a commit message like `feat: add dialogue [short-name]`.
        -   **Update Linear Issue**: Update the Linear issue by calling the `save_issue` tool on `linear-mcp-server` (or `save_comment` if adding a comment) to:
            - Set `id` to the selected issue key (e.g., `NAC-28`).
            - Set `state` to `Done`.
            - Update the issue `description` (or add a comment) to include the complete final dialogue JSON wrapped in a markdown code block.
