---
name: generate_dialogue
description: Review and generate NAATI CCL dialogue based on user input
---

# Generates new NAATI CCL Dialogues securely and efficiently

## Instructions

Whenever the user asks you to "Generate a dialogue" or invoke the "generate workflow," you must follow these exact deterministic steps:

1. **Acquire Scenario:** Ask the user for the dialogue segments or scenario if they haven't clearly provided it yet.
2. **Perform Research:** Perform a web search for similar dialogue scenarios using the `search_web` tool to find relevant context, vocabulary, the possible date this dialogue was posted/asked, and the number of occurrences in real NAATI CCL Exams. Follow the web search guidelines defined in your workspace at `prompts/generate-dialogue-guidelines.md`.
3. **Report Research:** Report the search findings to the user, summarizing the most relevant scenarios found.
4. **Determine Difficulty:** Based on the findings and the user's input, suggest an appropriate difficulty level (EASY, MODERATE, or HARD) and block to ask the user to confirm or change it.
5. **Read Guidelines:** Use your file reading tool to read the system prompt and formatting rules from `prompts/generate-dialogue-guidelines.md`.
6. **Generate Initial Dialogue:** Combine the user's input, the web search results, and the confirmed difficulty level along with the exact guidelines from the system prompt to generate the initial dialogue JSON output.
7. **Perform Self-Review:** Review the initially generated JSON specifically against the standards in `prompts/generate-dialogue-guidelines.md` to verify correctness. You MUST verify the segment count, word count per segment, appropriate loanwords usage, accurate translations, gender consistency, and metadata accuracy.
8. **Fix Any Errors:** If any issues or formatting violations are found in step 7, fix them and internally regenerate the JSON.
9. **Save Dialogue Locally:** Save the final JSON output to a file in the `output/` directory within the workspace using the `write_to_file` tool. 
   - The filename MUST be exactly `dialogue_` followed by the snake_case title of the dialogue (e.g., `output/dialogue_job_hunting_and_recruiter_assistance.json`). 
   - Present the finalized analysis/dialogue summary to the user.
10. **Prompt Further Review:** Finally, ask the user if they wish to proceed with an additional review using the review workflow. If the user explicitly says yes, execute the `/review` workflow entirely.
