# Vocabulary Corrections

This file logs corrections based on user feedback to ensure more natural translations in generated dialogues.

## Conversational / Common Translations

- **Excellent**: Use **बहुत बढ़िया** (Bahut badhiya) or **बहुत अच्छे** (Bahut achhe) instead of the overly formal/less common **उत्कृष्ट** (Utkrisht).
- **Wonderful**: Use **बहुत अच्छे** (Bahut achhe) or **शानदार** (Shaandaar) instead of the less common **अद्भुत** (Adbhut).
- **I am sorry (for confusion/bad news)**: Use **यह जानकर खेद है** or **मुझे खेद है**, not the stiff/unnatural-sounding **यह सुनकर खेद है**. Do NOT use **अफ़सोस** (Urdu/Persian-origin) — **खेद** is the correct pure Hindi word.
- **Consulted / consultation**: Prefer **सलाह ली / सलाह** over the more academic **परामर्श किया / परामर्श** unless the register is deliberately very formal. Both are pure Hindi; **सलाह** is simply the more common/natural one.
- **"Oh, that would explain it!" / "That's why!" / "That explains it!"**: Use the short colloquial exclamation **तभी!** (optionally with अच्छा/ओह before it, e.g. "अच्छा, तभी!"), NOT a literal, longer construction like **इसी से यह पता चलता है** — the literal version is grammatically fine but reads stiff/written for a short spoken exclamation.
- **General rule (STRICT — no loanwords)**: `naati-dialogue-writer/SKILL.md` has a **strict no-English/Urdu-loanword policy** (Section 3). This is absolute and overrides any preference for "natural-sounding" phrasing. When de-academizing a sentence, only substitute one **pure Hindi** word for another **pure Hindi** word that is more common/less Sanskrit-heavy (e.g. **किस प्रकार** → **कैसे**, **सामान्यतः** → **आमतौर पर**, **मानदंड** → **शर्तें**, **उपयुक्त** → **ठीक**, **प्रसन्नता** → **खुशी**). NEVER substitute an English loanword (डॉक्टर, प्रैक्टिस, ट्रिब्यूनल, लीगल एड, इनकम, प्रॉपर्टी, फ़ीस, ऑफिस, केस, कन्फर्मेशन, एक्सपर्ट, रजिस्टर्ड, अर्जेंट, गुड मॉर्निंग, etc.) even if it "sounds more natural" — this was a real mistake made once (2026-07-27) and must not repeat. Also avoid Urdu/Persian-origin words per the same policy (अफ़सोस, ज़रूरत, इंतज़ार, सिर्फ, बिल्कुल, माफ़) — use pure Hindi equivalents (खेद, आवश्यकता, प्रतीक्षा, केवल, पूरी तरह, छूट) instead.

## Grammar: Don't Force Speaker-Gender Agreement Onto Impersonal/Collective Verbs

A recurring mistake (found 2026-09-05): defaulting every verb ending to the speaker's assigned `en_gender`/`lote_gender`, even where the verb isn't actually agreeing with the speaker.

- **"हम" (we) referring to a mixed/institutional/unspecified group**: Use the default masculine plural **सकते हैं / करते हैं** etc., NOT the feminine **सकती हैं / करती हैं**, unless "हम" is unambiguously and exclusively a group of women (or a single female speaker's respectful "हम" clearly standing in for "मैं"). Example: "शायद हम ... आयोजित कर सकते हैं" (we could organise ...) — correct even when the speaker is female, because "हम" here refers to a general/institutional "we" (the school), not specifically her own gender.
- **Verb agreement with a gerund/infinitive subject, not the speaker**: When the grammatical subject of the clause is an action noun like "सिखाना" (teaching) rather than the speaker herself, the verb defaults to masculine: "... सिखाने के लिए कभी जल्दी नहीं होता" (NOT "होती") — "होता" agrees with the implied "सिखाना", not with the speaker's gender.
- **Rule of thumb**: Only mark feminine agreement on a verb when it is genuinely agreeing with a feminine noun or with the speaker herself as the direct grammatical subject (e.g. "मैं जा रही हूँ", "मैं करूँगी"). Do not blanket-apply the speaker's gender to every verb in her segments — check what the verb is actually agreeing with first.

## Idiom: "It's never too early to X" / awkward English → awkward Hindi

A literal rendering like "X के लिए कभी जल्दी नहीं होता/होती" (found and flagged as unnatural, 2026-09-05) is not how Hindi expresses this idiom, even once the gender agreement on "होता/होती" is fixed — it still reads as stilted/awkward.

- **Root cause was the English, not just the Hindi**: the original English — "it is never too early to teach children X **at such a young age**" — says "too early" and "young age" redundantly in the same sentence, which is itself a bit awkward and hard to translate cleanly. When a Hindi segment keeps coming out unnatural no matter how you phrase it, check whether the **English** source sentence is the actual problem and rewrite both together, not just the Hindi in isolation.
- **Best fix**: restructure the English so the person (not an abstract "it"/"age") is the grammatical subject — e.g. "children are never too young to start learning X" instead of "it is never too early to teach children X at such a young age". This also gives the Hindi a clean, natural subject/verb pair to agree on:
  - Final version: "That's very true, and children are never too young to start learning valuable life skills like these." → **"यह बिलकुल सच है, और बच्चे ऐसे मूल्यवान जीवन कौशल सीखना शुरू करने के लिए कभी बहुत छोटे नहीं होते।"** — here "बच्चे" (children, masculine plural) is the actual subject of "होते", so the agreement is genuinely correct, not just patched around.
  - The earlier patch **"कोई उम्र बहुत छोटी नहीं होती"** (no age is too young) is also acceptable natural Hindi if the English keeps "age" as the subject, but rephrasing English so a person is the subject is the more robust fix.
- More generally: translate English "never too early / never too late to X" idioms sense-for-sense with a natural Hindi frame, not by translating "early"/"late" word-for-word with "जल्दी"/"देर" + "होना". And if a Hindi translation keeps feeling forced, consider whether the English sentence itself needs restructuring first.
