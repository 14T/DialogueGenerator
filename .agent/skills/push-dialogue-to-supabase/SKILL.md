---
name: push-dialogue-to-supabase
description: Push a generated dialogue JSON to the Supabase database
---

# Push Dialogue to Supabase

This skill pushes a generated NAATI CCL dialogue JSON file to the Supabase database using the designated Node.js script.

## Process

1. **Identify the dialogue JSON file to push:**
    - If the user has an active JSON file open or has specified one in their request, use that file.
    - If not, look in the `output/` directory for the most recently generated JSON file and ask the user if they want to push that.
    - Otherwise, explicitly ask the user for the file path.
1. **Run the push script:**
    - You must run the `scripts/push_to_supabase.js` script provided within this skill's directory.
    - Execute the following command:
      ```bash
      node .agent/skills/push-dialogue-to-supabase/scripts/push_to_supabase.js <path_to_json_file>
      ```

1. **Report the result:**
    - Read the standard output and error from the script execution.
    - Inform the user whether the dialogue was successfully pushed or if there were any errors.
    - On success, the script renames the file in place to insert the dialogue ID (e.g. `2026-03-15_nurse-patient-headache.json` → `2026-03-15_320_nurse-patient-headache.json`). Use this new path for all subsequent steps.
1. **Mark as done in Linear (on success only):**
    - If and only if the push was successful (no errors reported by the script), update the issue status in Linear.
    - Call the `save_issue` tool on the `linear-mcp-server` MCP server.
    - Set the `id` to the issue key (e.g. `NAC-28`) and set `state` to `Done`.
    - Confirm to the user that the Linear issue has been set to "Done" status.
1. **Offer Git Commit (on success only):**
    -   After pushing the dialogue and updating the Linear issue, ask the user if they would like to commit the new dialogue file to git.
    -   If they agree:
        - Identify the topic/name of the dialogue.
        - Execute the following commands:
          ```bash
          git add <path_to_json_file>
          git commit -m "added dialogue for <Topic>"
          ```
        - Inform the user that the changes have been committed.
