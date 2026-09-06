---
description: Dialogue generation from Linear ToDo through review, ending in In Review status. Supabase push and Done happen only on manual user confirmation.
---

Run the dialogue pipeline: pick a scenario, generate, review, mark for review, and stop. Push to Supabase and finalize only when the user explicitly confirms.

1. **Check for uncommitted dialogue**
    -   Run `git status` in the `output/` directory to check for uncommitted or untracked dialogue JSON files.
    -   If one is found, ask the user whether to complete it before starting a new issue.
        - If yes: identify the associated Linear issue (from the JSON, recent issue status/comments, or by asking) and resume from **Step 4 (Iterative Review)** or **Step 5 (Mark for Review & Stop)** using this file.
        - If no (or none exist): proceed to Step 2.
1. **Pick a scenario**
    -   Use the Linear MCP tools to list issues in project `NaCl Dialogues` (ID `82410d4b-aee9-4d99-bd6a-9e3fcf687211`), excluding `Done`.
    -   If any issues are `In Progress`, list them and ask the user whether to finish one before starting new work.
    -   Otherwise pick a new issue by:
        1. Highest priority first (`1` = Urgent, `2` = High).
        2. If no urgent/high issues, the most recently created (`createdAt` descending).
    -   Record the issue key (e.g. `NAC-28`) and use its `title`/`description` as the scenario input.
1. **Generate dialogue**
    - Use the `naati-dialogue-writer` skill (`.agent/skills/naati-dialogue-writer/SKILL.md`) to generate the dialogue for the scenario.
    - Save it to `output/yyyy-mm-dd_short-name.json` (today's date, kebab-case topic label), e.g. `output/2026-07-12_medical-appointment.json`. Reuse this exact path for every later step.
    - Update the Linear issue's state to `In Progress`.
1. **Iterative review**
    - Review the dialogue 3 times consecutively using the `naati-dialogue-reviewer` skill (`.agent/skills/naati-dialogue-reviewer/SKILL.md`).
    - Fix issues found in each pass before moving to the next, overwriting the same output file after each pass.
1. **Mark for review & stop**
    - Update the Linear issue's state to `In Review`.
    - Add a comment on the issue with the complete final dialogue JSON (in a markdown code block) and the output file path.
    - In the chat response itself, print the complete final dialogue JSON in full (a fenced \`\`\`json code block, not summarized, not truncated, not "first N exchanges") so it's readable directly on mobile without opening Linear or a file.
    - Stop here. Do NOT push to Supabase or mark the issue `Done` as part of this step — that requires explicit user confirmation (see Step 6).
1. **User validation, correction & push (manual, on confirmation only)**
    -   When the user reviews the dialogue and requests changes, apply them following the writer/reviewer skill guidelines, and overwrite the output file. If corrections come from user feedback, generalize them (not dialogue-specific) and add them via the `.agent/workflows/correction.md` workflow.
    -   After applying any correction, always print the complete corrected dialogue JSON in full (fenced \`\`\`json code block) directly in the chat response (not just a description of the change) so the user can review the exact result on mobile.
    -   Only after the user explicitly confirms they want to push: use the `push-dialogue-to-supabase` skill (`.agent/skills/push-dialogue-to-supabase/SKILL.md`) to push the output file.
    -   On successful push:
        - Commit only the new dialogue JSON file with message `feat: add dialogue [short-name]`.
        - Update the Linear issue: set state to `Done` (add the complete final dialogue JSON as a comment if not already added in Step 5).
