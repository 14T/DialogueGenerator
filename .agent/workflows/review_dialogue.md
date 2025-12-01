---
description: Review and generate NAATI CCL dialogue based on user input
---

1. Ask the user for the dialogue segments or scenario if they haven't provided it yet.
2. Analyze the provided scenario or segments to infer the appropriate difficulty level (EASY, MODERATE, HARD).
3. Present the inferred difficulty to the user and ask if they want to keep it or change it.
2. Read the system prompt from `prompts/naati_reviewer.md`.
3. Combine the user's input with the system prompt to generate the dialogue review and revised JSON output.
4. Save the JSON output to a file in the `output/` directory. The filename MUST be `dialogue_` followed by the snake_case title of the dialogue (e.g., `output/dialogue_job_hunting_and_recruiter_assistance.json`). Present the analysis to the user.
