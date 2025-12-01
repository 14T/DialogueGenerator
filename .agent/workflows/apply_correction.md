---
description: Apply user corrections and update system prompt to prevent recurrence
---

1. **Identify Corrections**:
   - Review the recent conversation history or file diffs to identify the specific mistake or correction pointed out by the user.
   - Determine if the correction is a one-off fix or a recurring pattern (e.g., vocabulary preference, grammar rule, structural requirement).

2. **Apply Corrections (if applicable)**:
   - If the user has not already applied the fix manually, use `replace_file_content` or `multi_replace_file_content` to correct the target file (e.g., the generated dialogue JSON).

3. **Update System Prompt**:
   - Read the system prompt file: `prompts/naati_reviewer.md`.
   - Formulate a specific instruction or rule to prevent this mistake in the future.
     - *Example (Vocabulary)*: "Always translate 'backup plan' as 'वैकल्पिक योजना' (vikalpik yojana), not just 'योजना'."
     - *Example (Grammar)*: "Ensure verb agreement for 'interview' follows the [specific user preference]."
   - Append or insert this new rule into the appropriate section of `prompts/naati_reviewer.md` (e.g., under "Vocabulary", "Grammar", or "Loanword Check").

4. **Notify User**:
   - Inform the user that the correction has been applied (or acknowledged if manual) and that the system prompt has been updated to learn from this mistake.
