---
description: Apply user corrections and update system prompt to prevent recurrence
---

1. **Identify Corrections**:
   - Review the recent conversation history or file diffs to identify the specific mistake or correction pointed out by the user.
   - Determine if the correction is a one-off fix or a recurring pattern (e.g., vocabulary preference, grammar rule, structural requirement).

2. **Apply Corrections (if applicable)**:
   - If the user has not already applied the fix manually in ths the generated dialogue JSON.

3. **Update System Prompt**:
   - Read the system prompt file: `prompts/generate-dialogue-guidelines.md`.
   - Identify what instruction can be added or improved in th system prompt so that so that mentioned mistakes does not happen again. Keep the instruction generic that applies to all such mistakes in future, not just this particular mistake. (example , do not pick a particular word that is wrong in this context but might be correct in other context, rather choose a general language correction that can be added as a instruction) , Formulate an instruction or rule to prevent this kind of mistake in the future.
   - Append or insert this new instruction into the section 'Other Guidelines' at the bottom of `prompts/generate-dialogue-guidelines.md`

4. **Notify User**:
   - Inform the user that the correction has been applied (or acknowledged if manual) and that the system prompt has been updated to learn from this mistake.

5. Ask user if proceed with review using correction workflow, if user says yes, execute /correction workflow with user instruction