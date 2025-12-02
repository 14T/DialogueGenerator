---
description: Run Final Checks
---

1. Identify the target dialogue file. If the user has an active JSON file open, use that. Otherwise, ask the user for the path to the dialogue JSON file they want to review.
2. Read the system prompt from `prompts/review-dialogue-guidelines.md`.
3. Read the content of the target dialogue file.
4. Perform a comprehensive review of the dialogue based strictly on the instructions in `prompts/review-dialogue-guidelines.md`. This includes:
5. **Notify User**:
- Generate a detailed analysis report listing issues and a revised JSON structure if corrections are needed. 
- Suggest if system prompt were misleading and what can be improved.