---
description: Review and generate NAATI CCL dialogue based on user input
---

1. Ask the user for the dialogue segments or scenario if they haven't provided it yet.
2. Perform a web search for similar dialogue scenarios using the `search_web` tool to find relevant context and vocabulary.
3. Report the search findings to the user, summarizing similar scenarios found.
4. Based on the findings and the user's input, suggest an appropriate difficulty level (EASY, MODERATE, HARD) and ask the user to confirm or change it.
5. Read the system prompt from `prompts/naati_reviewer.md`.
6. Combine the user's input, the web search results, and the confirmed difficulty level with the system prompt to generate the dialogue review and revised JSON output.
7. Review the generated JSON against the standards in `prompts/naati_reviewer.md` to verify correctness (segment count, word count, loanwords, translations, gender consistency, metadata accuracy).
8. If any issues are found in step 7, fix them and regenerate the JSON.
9. Save the final JSON output to a file in the `output/` directory. The filename MUST be `dialogue_` followed by the snake_case title of the dialogue (e.g., `output/dialogue_job_hunting_and_recruiter_assistance.json`). Present the analysis to the user.
