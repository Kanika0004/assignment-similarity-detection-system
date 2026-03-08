🎯 Product Vision

Create a professional, enterprise-grade web application for teachers that detects assignment similarity with high precision and presents results in a clear, actionable, and investigation-focused way.

The system must not only calculate similarity percentages but also:

Identify patterns of copying

Detect collaboration clusters

Provide explainable AI analysis

Offer visual evidence

Support teacher decision-making

Maintain academic integrity standards

This platform should feel reliable, intelligent, and workflow-ready.

🧭 CORE SYSTEM PRINCIPLES

Every page must support teacher decision-making.

All similarity percentages must be interpretable.

AI explanations must include reasoning and evidence.

Visualizations must reveal patterns instantly.

Teachers must stay in control of thresholds and filters.

Reports must be export-ready for institutional use.

🖥️ 1️⃣ DASHBOARD → ACTION CENTER (NOT JUST STATS)
Purpose:

Show what requires immediate attention and reveal class-wide patterns.

Top Section: 🚨 Immediate Attention Panel

Display:

Number of high-risk cases (>80%)

Largest similarity cluster detected

New flagged submissions today

Assignments pending review

Each item must have:

Quick action buttons (Review Now, Open Cluster, View Comparison)

📊 Class Similarity Overview

Include:

% of class flagged

Distribution of similarity levels

Most common similarity type (Exact / Paraphrased / Structural)

Risk breakdown (Low / Medium / High)

🔥 Similarity Heatmap (Matrix View)

Create a student vs student grid:

Darker cells = higher similarity

Click cell to open comparison

Hover to show % breakdown

This gives instant visual detection of copying rings.

📈 Cluster Network Graph

Nodes = students

Edges = similarity strength

Thickness of line = similarity %

Auto-detected clusters highlighted

This allows teachers to see group copying instantly.

📂 2️⃣ UPLOAD & ANALYSIS CONTROL CENTER
Purpose:

Give teachers full control over detection logic.

Upload Features:

Drag-and-drop multi-file upload

Automatic student name extraction

Manual correction option

Batch assignment labeling

Compare with:

Current batch

Past semesters

Institutional database

🔧 Detection Controls (Very Important)

Allow toggles:

Ignore bibliography

Ignore quoted text

Ignore common academic phrases

Ignore template sections

Detect AI-generated text

Detect writing style shift within document

Sensitivity level (Custom % slider, not just Low/Medium/High)

🕒 Processing Transparency

Show:

Estimated processing time

Real-time analysis progress

Number of comparisons running

📑 3️⃣ REPORT PAGE → INVESTIGATION CENTER
Purpose:

Help teacher understand WHO, WHY, and HOW.

🧠 AI Executive Summary (Top Section)

Must include:

Overall similarity trends

Number of clusters detected

Largest cluster size

Most suspicious pair

Likely causes (with confidence score)

Example:
“4 students share 78–87% similarity. Pattern suggests direct copying with minor rewording. Submission times were within 15 minutes.”

🔴 Risk Classification Labels

Each case must show:

High Risk – Likely direct copying

Medium Risk – Structural similarity

Low Risk – Common topic overlap

No raw percentages without interpretation.

🧩 Cluster Analysis Section

For each cluster show:

Students in cluster

Average similarity %

Shared uncommon phrases

Shared structure map

Timeline correlation

Similarity density map

Allow:

Click cluster → open group comparison mode

📊 Advanced Metrics Per Assignment

For each submission show:

Exact match %

Paraphrased similarity %

Structural similarity %

Shared rare vocabulary score

Writing style similarity score

Sentence length deviation

Passive voice usage similarity

Citation pattern similarity

🕒 Timeline Analysis

Show:

Submission timestamps

Similar submissions within close timeframe

Timeline graph visualization

Flag if:
Multiple highly similar submissions occurred within short window.

🔍 Filtering & Control Panel

Allow teachers to:

Filter by similarity threshold

Sort by risk level

Search by student

Toggle match types

Exclude specific students from cluster

Mark reviewed / dismissed

🧾 4️⃣ PAIRWISE COMPARISON → EVIDENCE ROOM
Purpose:

Provide undeniable visual proof.

Split Screen Comparison

Left: Student A
Right: Student B

Features:

Synced scrolling

Highlight color legend:

Red = Exact

Orange = Paraphrased

Yellow = Structural

Scrollbar heat indicators

Jump to next match button

🔬 Section-Based Comparison

Break document into:

Introduction

Body sections

Conclusion

References

Show similarity per section.

🧠 AI Explanation Panel

Must include:

Summary of why flagged

Likely scenario

Confidence score

Evidence list:

Identical sentence structure

Same uncommon phrase

Same error pattern

Same argument sequence

Same citation anomaly

✍️ Writing Style Comparison

Compare:

Average sentence length

Vocabulary diversity

Grammar pattern

Transition phrase usage

Tone similarity

Flag if writing style changes drastically mid-document.

📝 Instructor Notes & Workflow

Allow teacher to:

Add internal notes

Mark as reviewed

Flag for academic misconduct process

Export evidence bundle

Download side-by-side PDF

📤 EXPORT & ADMIN FEATURES

Must support:

PDF report (institution-ready format)

CSV summary

Evidence packet export

Shareable report link (optional secure)

Include:

Timestamp

Detection parameters used

Risk classification explanation

🔐 SECURITY & ENTERPRISE STANDARDS

Encrypted file storage

Automatic file deletion after configurable period

Role-based access

Audit log of teacher actions

Data privacy compliance ready (FERPA/GDPR ready architecture)

🤖 ADVANCED FEATURES (INDUSTRY LEVEL)

Optional but elevates project significantly:

Stylometry analysis

AI-generated text probability detection

Cross-course comparison

Cross-year archive comparison

Plagiarism fingerprinting

Similarity evolution tracking

Collusion probability scoring model

Template detection system

🏆 UX DESIGN REQUIREMENTS

Clean academic design

Minimal clutter

Fast load time

Clear color-coded risk system

Responsive design

Dark mode

Accessibility compliant

💎 FINAL GOAL

This platform must:

Save teacher time

Reduce manual comparison

Provide clear evidence

Support fair decision-making

Reveal hidden patterns

Feel intelligent and trustworthy