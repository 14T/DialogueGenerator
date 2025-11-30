# Dialogue Agent

This project contains an agent configuration for reviewing and generating dialogues.

## Components

- **System Prompt**: Located in `prompts/naati_reviewer.md`. This file contains the detailed instructions for the agent, including rules for segment length, gender inference, loanword usage, and JSON formatting.
- **Workflow**: Located in `.agent/workflows/review_dialogue.md`. This workflow guides the agent to use the system prompt to process user input.

## Usage

To use this agent:
1.  Open this project in your agentic coding environment.
2.  Run the workflow `/review_dialogue` (or manually follow the steps in the workflow file).
3.  Provide the dialogue segments or scenario and the difficulty level when prompted.
4.  The agent will generate a detailed analysis and a revised JSON file in the `output` directory.
