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

2. **Run the push script:**
   - You must run the `scripts/push_to_supabase.js` script provided within this skill's directory.
   - Execute the following command:
     ```bash
     node .agent/skills/push-dialogue-to-supabase/scripts/push_to_supabase.js <path_to_json_file>
     ```

3. **Report the result:**
   - Read the standard output and error from the script execution.
   - Inform the user whether the dialogue was successfully pushed or if there were any errors.

4. **Mark as done in ToDo.md (on success only):**
   - If and only if the push was successful (no errors reported by the script), open `/Users/Chetan/Documents/Projects/DialogueGenerator/ToDo.md`.
   - Find the scenario line that corresponds to the dialogue that was just pushed (match by topic/description).
   - Change its leading `- [ ]` to `- [x]` so it is permanently marked as completed.
   - Save the file.
   - Confirm to the user that the scenario has been ticked off in `ToDo.md` and will not be picked again.

5. **Offer Git Commit (on success only):**
   - After pushing the dialogue and updating `ToDo.md`, ask the user if they would like to commit the new dialogue file and the updated `ToDo.md` to git.
   - If they agree:
     - Identify the topic/name of the dialogue.
     - Execute the following commands:
       ```bash
       git add <path_to_json_file> ToDo.md
       git commit -m "added dialogue for <Topic> and updated ToDo.md"
       ```
     - Inform the user that the changes have been committed.
