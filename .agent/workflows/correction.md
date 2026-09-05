# Vocabulary Corrections

This file logs corrections based on user feedback to ensure more natural translations in generated dialogues.

## Conversational / Common Translations

- **Excellent**: Use **बहुत बढ़िया** (Bahut badhiya) or **बहुत अच्छे** (Bahut achhe) instead of the overly formal/less common **उत्कृष्ट** (Utkrisht).
- **Wonderful**: Use **बहुत अच्छे** (Bahut achhe) or **शानदार** (Shaandaar) instead of the less common **अद्भुत** (Adbhut).
- **I am sorry (for confusion/bad news)**: Use **यह जानकर खेद है** or **मुझे खेद है**, not the stiff/unnatural-sounding **यह सुनकर खेद है**. Do NOT use **अफ़सोस** (Urdu/Persian-origin) — **खेद** is the correct pure Hindi word.
- **Consulted / consultation**: Prefer **सलाह ली / सलाह** over the more academic **परामर्श किया / परामर्श** unless the register is deliberately very formal. Both are pure Hindi; **सलाह** is simply the more common/natural one.
- **General rule (STRICT — no loanwords)**: `naati-dialogue-writer/SKILL.md` has a **strict no-English/Urdu-loanword policy** (Section 3). This is absolute and overrides any preference for "natural-sounding" phrasing. When de-academizing a sentence, only substitute one **pure Hindi** word for another **pure Hindi** word that is more common/less Sanskrit-heavy (e.g. **किस प्रकार** → **कैसे**, **सामान्यतः** → **आमतौर पर**, **मानदंड** → **शर्तें**, **उपयुक्त** → **ठीक**, **प्रसन्नता** → **खुशी**). NEVER substitute an English loanword (डॉक्टर, प्रैक्टिस, ट्रिब्यूनल, लीगल एड, इनकम, प्रॉपर्टी, फ़ीस, ऑफिस, केस, कन्फर्मेशन, एक्सपर्ट, रजिस्टर्ड, अर्जेंट, गुड मॉर्निंग, etc.) even if it "sounds more natural" — this was a real mistake made once (2026-07-27) and must not repeat. Also avoid Urdu/Persian-origin words per the same policy (अफ़सोस, ज़रूरत, इंतज़ार, सिर्फ, बिल्कुल, माफ़) — use pure Hindi equivalents (खेद, आवश्यकता, प्रतीक्षा, केवल, पूरी तरह, छूट) instead.

## Grammar: Don't Force Speaker-Gender Agreement Onto Impersonal/Collective Verbs

A recurring mistake (found 2026-09-05): defaulting every verb ending to the speaker's assigned `en_gender`/`lote_gender`, even where the verb isn't actually agreeing with the speaker.

- **"हम" (we) referring to a mixed/institutional/unspecified group**: Use the default masculine plural **सकते हैं / करते हैं** etc., NOT the feminine **सकती हैं / करती हैं**, unless "हम" is unambiguously and exclusively a group of women (or a single female speaker's respectful "हम" clearly standing in for "मैं"). Example: "शायद हम ... आयोजित कर सकते हैं" (we could organise ...) — correct even when the speaker is female, because "हम" here refers to a general/institutional "we" (the school), not specifically her own gender.
- **Verb agreement with a gerund/infinitive subject, not the speaker**: When the grammatical subject of the clause is an action noun like "सिखाना" (teaching) rather than the speaker herself, the verb defaults to masculine: "... सिखाने के लिए कभी जल्दी नहीं होता" (NOT "होती") — "होता" agrees with the implied "सिखाना", not with the speaker's gender.
- **Rule of thumb**: Only mark feminine agreement on a verb when it is genuinely agreeing with a feminine noun or with the speaker herself as the direct grammatical subject (e.g. "मैं जा रही हूँ", "मैं करूँगी"). Do not blanket-apply the speaker's gender to every verb in her segments — check what the verb is actually agreeing with first.

## Idiom: "It's never too early to X"

A literal rendering like "X के लिए कभी जल्दी नहीं होता/होती" (found and flagged as unnatural, 2026-09-05) is not how Hindi expresses this idiom, even once the gender agreement on "होता/होती" is fixed — it still reads as stilted/awkward.

- **Use instead**: the "कोई उम्र ... नहीं होती" (no age is too ...) pattern, which is genuinely natural spoken Hindi and also gives the verb a clean, unambiguous feminine noun (उम्र) to agree with.
  - Example: "It is never too early to teach children these valuable life skills" → **"बच्चों को ये मूल्यवान जीवन कौशल सिखाने के लिए कोई उम्र बहुत छोटी नहीं होती"** (lit. "no age is too young for teaching children these valuable life skills"), NOT "...सिखाने के लिए कभी जल्दी नहीं होती/होता".
- More generally: translate English "never too early / never too late to X" idioms sense-for-sense with a natural Hindi frame (e.g. "कोई उम्र नहीं होती", "देर नहीं हुई है"), not by translating "early"/"late" word-for-word with "जल्दी"/"देर" + "होना".
