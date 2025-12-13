---
description: Push a generated dialogue JSON to the Supabase database
---

1. Identify the dialogue JSON file to push. 
   - If the user has an active JSON file open, use that.
   - If not, check if `output/dialogue_manager_team_member_work_from_home.json` (or the most recently generated file) exists and ask if they want to push that.
   - Otherwise, ask the user for the file path.

2. Verify that `scripts/push_to_supabase.js` exists.

3. Run the script with the dialogue file:
   ```bash
   node scripts/push_to_supabase.js <path_to_json_file>
   ```
   
4. Report the result (success or failure) to the user.
