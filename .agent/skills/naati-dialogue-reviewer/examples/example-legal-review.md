# Example 1: Reviewing a Legal/Immigration Scenario

**Objective:** This example demonstrates how the reviewer skill should analyze a flawed generated dialogue and output the corrections and final JSON.

---

## 1. Input Dialogue (Flawed)

```json
{
    "dialogue": {
        "title": "Applying for a Partner Visa",
        "scenario": "A migration agent explaining partner visa requirements",
        "last_active": "2023-01-01",
        "en_gender": true,
        "lote_gender": false,
        "occurrences": 3,
        "difficulty": "MODERATE",
        "tag": "Immigration",
        "segments": [
            {
                "en": "Hello, how can I help you today?",
                "hi": "मैं पार्टनर वीज़ा के लिए अप्लाई करना चाहती हूँ।",
                "isEn": true
            },
            {
                "en": "I need help with my partner visa.",
                "hi": "मुझे अपने पार्टनर वीज़ा के लिए मदद चाहिए।",
                "isEn": false
            },
            {
                "en": "To apply for the subclass 820 visa, you need to show that your relationship is genuine.",
                "hi": "सबक्लास 820 वीज़ा के लिए अप्लाई (apply) करने के लिए, आपको यह दिखाना होगा कि आपका रिलेशन (relationship) जेनुइन है।",
                "isEn": true
            },
            {
                "en": "We have a joint bank account and a lease agreement. Is that enough?",
                "hi": "हमारे पास एक जॉइंट बैंक अकाउंट और एक लीज एग्रीमेंट है। क्या यह काफी है?",
                "isEn": false
            },
            {
                "en": "Yes, but you will also need to wait. It takes 12 to 15 months.",
                "hi": "हाँ, लेकिन आपको इंतज़ार भी करना होगा। इसमें 12 से 15 महीने लगते हैं।",
                "isEn": true
            }
        ]
    }
}
```

---

## 2. Reviewer Output

### Metadata Review
*   **`last_active`**: Incorrect. Updated to today's date (e.g., "2024-05-15").
*   **`en_gender`**: Evaluated as `true` (Male). No conflicts in English text.
*   **`lote_gender`**: Evaluated as `false` (Female) based on "चाहती हूँ" (want - female conjugation). Correct.
*   **Other metadata**: Acceptable.

### Segment Analysis

**Segment 1**
*   **Original En**: Hello, how can I help you today?
*   **Original Hi**: मैं पार्टनर वीज़ा के लिए अप्लाई करना चाहती हूँ।
*   **Issue**: Failed the "Parallel Translation ONLY" rule. This is a Q&A setup. The Hindi text is not a translation of the English text.
*   **Correction**: Translate "Hello, how can I help you today?" to Hindi.
*   **Revised Hi**: नमस्ते, मैं आज आपकी किस प्रकार सहायता कर सकता हूँ? (Using male conjugation 'सकता हूँ' for en_gender=true).

**Segment 2**
*   **Original En**: I need help with my partner visa.
*   **Original Hi**: मुझे अपने पार्टनर वीज़ा के लिए मदद चाहिए।
*   **Issue**: Minor phrasing improvement needed for naturalness.
*   **Correction**: No strict errors, but improved for better flow.
*   **Revised Hi**: मुझे अपने पार्टनर वीज़ा के संबंध में सहायता चाहिए।

**Segment 3**
*   **Original En**: To apply for the subclass 820 visa, you need to show that your relationship is genuine.
*   **Original Hi**: सबक्लास 820 वीज़ा के लिए अप्लाई (apply) करने के लिए, आपको यह दिखाना होगा कि आपका रिलेशन (relationship) जेनुइन है।
*   **Issue**: Contains transliterated English loanwords ("अप्लाई", "रिलेशन", "जेनुइन"), brackets `()`, and Western numbers.
*   **Correction**: Remove brackets. Translate loanwords to pure Hindi. Convert "820" to Devanagari numerals.
*   **Revised Hi**: उपवर्ग ८२० वीज़ा के लिए आवेदन करने हेतु, आपको यह सिद्ध करना होगा कि आपका संबंध प्रामाणिक है।

**Segment 4**
*   **Original En**: We have a joint bank account and a lease agreement. Is that enough?
*   **Original Hi**: हमारे पास एक जॉइंट बैंक अकाउंट और एक लीज एग्रीमेंट है। क्या यह काफी है?
*   **Issue**: English loanwords ("जॉइंट बैंक अकाउंट", "लीज एग्रीमेंट") and an Urdu loanword ("काफी").
*   **Correction**: Use proper Hindi terms ("संयुक्त बैंक खाता", "किरायानामा"). Replace "काफी" with "पर्याप्त".
*   **Revised Hi**: हमारे पास एक संयुक्त बैंक खाता और किरायानामा है। क्या यह पर्याप्त है?

**Segment 5**
*   **Original En**: Yes, but you will also need to wait. It takes 12 to 15 months.
*   **Original Hi**: हाँ, लेकिन आपको इंतज़ार भी करना होगा। इसमें 12 से 15 महीने लगते हैं।
*   **Issue**: Urdu loanword ("इंतज़ार") and Western numerals (12, 15).
*   **Correction**: Replace "इंतज़ार" with "प्रतीक्षा". Change numerals to Devanagari.
*   **Revised Hi**: हाँ, लेकिन आपको प्रतीक्षा भी करनी होगी। इसमें १२ से १५ महीने लगते हैं।

### Summary
The dialogue had several critical errors. Segment 1 violated the parallel translation rule by functioning as a Q&A. Segments 3 and 4 contained excessive English transliterations and bracketed explanations. Segment 5 contained Urdu loanwords and Western numerals. All metadata and segments have been corrected.

### Revised JSON

```json
{
    "dialogue": {
        "title": "Applying for a Partner Visa",
        "scenario": "A migration agent explaining partner visa requirements",
        "last_active": "2024-05-15",
        "en_gender": true,
        "lote_gender": false,
        "occurrences": 3,
        "difficulty": "MODERATE",
        "tag": "Immigration",
        "segments": [
            {
                "en": "Hello, how can I help you today?",
                "hi": "नमस्ते, मैं आज आपकी किस प्रकार सहायता कर सकता हूँ?",
                "isEn": true
            },
            {
                "en": "I need help with my partner visa.",
                "hi": "मुझे अपने पार्टनर वीज़ा के संबंध में सहायता चाहिए।",
                "isEn": false
            },
            {
                "en": "To apply for the subclass 820 visa, you need to show that your relationship is genuine.",
                "hi": "उपवर्ग ८२० वीज़ा के लिए आवेदन करने हेतु, आपको यह सिद्ध करना होगा कि आपका संबंध प्रामाणिक है।",
                "isEn": true
            },
            {
                "en": "We have a joint bank account and a lease agreement. Is that enough?",
                "hi": "हमारे पास एक संयुक्त बैंक खाता और किरायानामा है। क्या यह पर्याप्त है?",
                "isEn": false
            },
            {
                "en": "Yes, but you will also need to wait. It takes 12 to 15 months.",
                "hi": "हाँ, लेकिन आपको प्रतीक्षा भी करनी होगी। इसमें १२ से १५ महीने लगते हैं।",
                "isEn": true
            }
        ]
    }
}
```
