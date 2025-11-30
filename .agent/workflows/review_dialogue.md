---
description: Review and generate NAATI CCL dialogue based on user input
---

1. Ask the user for the dialogue segments or scenario, and the difficulty level (EASY, MODERATE, HARD), if they haven't provided it yet.
2. Read the system prompt from `prompts/naati_reviewer.md`.
3. Combine the user's input with the system prompt to generate the dialogue review and revised JSON output.
4. Save the JSON output to a file (e.g., `output/dialogue.json`) and present the analysis to the user.
