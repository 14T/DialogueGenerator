/**
 * API Service for Supabase Dialogue Management
 * Handles insertion of dialogues with segments into the database
 */

const fs = require('fs');

// API Configuration
const API_CONFIG = {
    baseUrl: 'https://vwmpzymlubgfsnmndyfe.supabase.co/rest/v1',
    endpoint: '/rpc/insert_dialogue_with_segments',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bXB6eW1sdWJnZnNubW5keWZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDEzMjIyMSwiZXhwIjoyMDU5NzA4MjIxfQ.ebjzbgcICSh_xSXQZ5QER7f0g9BWKHfAIjQ9ArIdka4',
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bXB6eW1sdWJnZnNubW5keWZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDEzMjIyMSwiZXhwIjoyMDU5NzA4MjIxfQ.ebjzbgcICSh_xSXQZ5QER7f0g9BWKHfAIjQ9ArIdka4'
    }
};

/**
 * Custom API Error class for better error handling
 */
class ApiError extends Error {
    constructor(message, status, response) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.response = response;
    }
}

/**
 * Validates the dialogue data before sending to API
 * @param {Object} dialogueData - The dialogue data to validate
 * @throws {Error} If validation fails
 */
function validateDialogueData(dialogueData) {
    if (!dialogueData) {
        throw new Error('Dialogue data is required');
    }

    if (typeof dialogueData !== 'object') {
        throw new Error('Dialogue data must be an object');
    }

    // Add additional validation rules as needed
    // For example: check for required fields, data types, etc.
}

/**
 * Inserts a dialogue with segments into the database
 * @param {Object} dialogueData - The dialogue data containing segments
 * @param {Object} options - Optional configuration overrides
 * @param {string} options.authToken - Override authorization token
 * @param {string} options.apiKey - Override API key
 * @returns {Promise<Object>} The API response data
 * @throws {ApiError} If the API request fails
 */
async function insertDialogueWithSegments(dialogueData, options = {}) {
    try {
        // Validate input data
        validateDialogueData(dialogueData);

        // Prepare headers with optional overrides
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': options.authToken || API_CONFIG.headers.authorization,
            'apikey': options.apiKey || API_CONFIG.headers.apikey
        };

        // Prepare request body
        const requestBody = {
            data: dialogueData
        };

        // Build full URL
        const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoint}`;

        console.log(`Making POST request to: ${url}`);

        // Make the API request
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        // Parse response
        let responseData;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }

        // Check if request was successful
        if (!response.ok) {
            throw new ApiError(
                `API request failed: ${response.status} ${response.statusText}`,
                response.status,
                responseData
            );
        }

        // console.log('Dialogue inserted successfully');
        return responseData;

    } catch (error) {
        // Handle different types of errors
        if (error instanceof ApiError) {
            console.error('API Error:', error.message, error.response);
            throw error;
        } else if (error instanceof TypeError && error.message.includes('fetch')) {
            console.error('Network Error:', error.message);
            throw new ApiError('Network error: Unable to reach the API', 0, null);
        } else {
            console.error('Unexpected Error:', error.message);
            throw error;
        }
    }
}

// CLI Execution Logic
async function main() {
    const filePath = process.argv[2];

    if (!filePath) {
        console.error('Usage: node push_to_supabase.js <path_to_dialogue_json>');
        process.exit(1);
    }

    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(fileContent);

        // Use the full JSON object as the payload, matching the CURL's {{dialogueJson}}
        const payload = json;

        console.log(`Reading dialogue from: ${filePath}`);
        // Check if it has a title at the root or nested in dialogue
        const title = payload.title || (payload.dialogue && payload.dialogue.title) || 'Unknown Title';
        console.log(`Title: ${title}`);

        const result = await insertDialogueWithSegments(payload);
        console.log(JSON.stringify(result, null, 4));

    } catch (error) {
        console.error('Failed to push dialogue:', error.message);
        if (error.response) {
            console.error('Error details:', JSON.stringify(error.response, null, 2));
        }
        process.exit(1);
    }
}

// Run main if called directly
if (require.main === module) {
    main();
}

module.exports = {
    insertDialogueWithSegments,
    ApiError,
    API_CONFIG
};
