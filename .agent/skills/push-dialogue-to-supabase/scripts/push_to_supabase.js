/**
 * API Service for Supabase Dialogue Management
 * Handles insertion of dialogues with segments into the database
 */

const fs = require('fs');

// API Configuration
// Auth is intentionally NOT hardcoded here. In the Claude Code cloud environment,
// an API credential scoped to this host is attached to the request automatically
// by the network proxy. For standalone/local use outside that environment, set
// SUPABASE_SERVICE_ROLE_KEY (and optionally SUPABASE_API_KEY, if different) in
// the environment before running this script.
const API_CONFIG = {
    baseUrl: 'https://vwmpzymlubgfsnmndyfe.supabase.co/rest/v1',
    endpoint: '/rpc/insert_dialogue_with_segments'
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

        // Prepare headers. Auth is optional here: pass it explicitly via options,
        // via SUPABASE_SERVICE_ROLE_KEY/SUPABASE_API_KEY env vars, or omit it and
        // rely on the environment's network proxy attaching a host-scoped credential.
        const authToken = options.authToken || process.env.SUPABASE_SERVICE_ROLE_KEY;
        const apiKey = options.apiKey || process.env.SUPABASE_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

        const headers = { 'Content-Type': 'application/json' };
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
        if (apiKey) headers['apikey'] = apiKey;

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
