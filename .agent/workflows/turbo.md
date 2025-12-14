---
description: Automated dialogue generation, review, and correction loop with minimal user interaction
---

1. **Analysis & Generation (Auto-Mode)**:
   - If the scenario is not provided, ask the user.
   - Run the initial research steps of the `/generate` workflow (web search for context/vocabulary).
   - **Difficulty Decision**: Instead of asking the user, determine the best Difficulty Level (EASY, MODERATE, HARD). checks existing files in `output/` to ensure diversity (e.g., if last was HARD, pick MODERATE). Only ask the user if the scenario is extremely ambiguous.
   - Generate the dialogue JSON using the determined difficulty.

2. **Automated Review (Strict & Independent)**:
   - **CRITICAL**: Treat this step as if you are a NEW agent who has never seen the file before. Forget the previous generation context.
   - Execute the `/review` workflow on the generated file.
   - **Goal**: Find mistakes. Do not assume the previous step was correct.

3. **Auto-Correction Loop**:
   - For *each* issue identified in the review:
     - **Reasoning**: pause and analyze if the issue is a genuine guideline violation or a valid creative choice.
     - **Decision**:
       - If it IS a violation: Execute the `/correction` workflow to fix it automatically.
       - If it is NOT a violation: Document why (e.g., "Technically a loanword, but required by context").
   - Continue until all issues are addressed.

4. **Final User Verification**:
   - Present the final, polished dialogue to the user.
   - Provide a summary of the auto-selected difficulty and any corrections applied.
   - Ask for final approval or next steps (e.g., `/push-to-supabase`).