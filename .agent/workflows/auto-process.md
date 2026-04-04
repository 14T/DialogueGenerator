---
description: End-to-end dialogue generation from ToDo.md, including review, user validation, and Supabase push.
---

1. **Pick a Scenario**:
   - Read the file `/Users/Chetan/Documents/Projects/DialogueGenerator/ToDo.md`.
   - Pick one dialogue scenario, description, and related information from the top which is not ticked (i.e., starts with `- [ ]`).

2. **Generate Dialogue**:
   - Use the skill `naati-dialogue-writer` (located at `.agent/skills/naati-dialogue-writer/SKILL.md`) to generate a dialogue based on the picked scenario.
   - **Save the generated dialogue JSON** to the `/Users/Chetan/Documents/Projects/DialogueGenerator/output/` directory.
   - **File naming convention**: `yyyy-mm-dd_short-name.json`, where:
     - `yyyy-mm-dd` is today's date (e.g., `2026-03-15`)
     - `short-name` is a concise kebab-case label derived from the scenario topic (e.g., `medical-appointment`, `visa-renewal`)
     - Example: `2026-03-15_medical-appointment.json`
   - Always use this same file path when referring to the dialogue in subsequent steps.

3. **Iterative Review**:
   - Review the generated dialogue **3 times** consecutively using the skill `naati-dialogue-reviewer` (located at `.agent/skills/naati-dialogue-reviewer/SKILL.md`).
   - Fix any issues identified in each review iteration before moving to the next one.
   - After each review pass, **overwrite the same output file** (from Step 2) with the updated dialogue JSON.

4. **User Validation & Correction**:
   - Present the final dialogue to the user and ask them to validate it.
   - If any changes are needed, apply them while still following the guidelines from the above skills.
   - After applying corrections, **overwrite the output file** (from Step 2) with the corrected dialogue JSON.
   - If you make corrections based on user feedback, formulate them into generic corrections (not dialogue-specific) and add them via the `correction` workflow (`.agent/workflows/correction.md`).

5. **Push to Supabase**:
   - Once everything is validated and completed to the user's satisfaction, ask the user if they want to push the dialogue to the database.
   - If the user says "yes", use the skill `push-dialogue-to-supabase` (located at `.agent/skills/push-dialogue-to-supabase/SKILL.md`) to push the output file from Step 2 to Supabase.
   - Update `ToDo.md` to mark the scenario as ticked (`- [x]`).

6. **Git Commit**:
   - If the Supabase push was successful, ask the user if they would like to commit the changes to the repository.
   - The commit should include the new dialogue JSON file (from Step 2) and the updated `ToDo.md`.
   - Use a commit message like `feat: add dialogue [short-name]`.
