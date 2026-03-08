Prompt: Teacher Dashboard – Assignment Similarity Checker Website

Create a modern, professional website designed specifically for teachers to detect assignment similarity and potential plagiarism.

The system should allow teachers to upload multiple student assignment files and automatically generate similarity reports with detailed visual analysis.

🎯 Core Purpose

The website must:

Allow teachers to upload multiple assignment files (PDF, DOCX, TXT).

Automatically analyze similarity between all uploaded documents.

Generate detailed similarity reports.

Categorize and cluster similar assignments.

Allow teachers to click on similar assignments and see highlighted matching sections.

Provide an AI-generated summary explaining why the system flagged similarity and what is the most likely explanation (collaboration, copying, template usage, common sources, etc.).

🖥️ Teacher Dashboard – What It Should Include
1️⃣ Main Dashboard Overview

When teachers log in, they should see:

Total assignments uploaded

Total submissions analyzed

Number of high-similarity cases

Average similarity percentage

Recent uploads

Recent flagged cases

Visual charts:

Similarity distribution graph

Top similar pairs

Cluster overview (groups of similar assignments)

2️⃣ Upload Section

Features:

Drag-and-drop multi-file upload

Support for:

PDF

DOCX

TXT

Option to:

Name the assignment set (e.g., "CS101 Essay 1")

Add due date

Select sensitivity level (low, medium, high detection strictness)

Show upload progress

Show file count and student names extracted automatically (if possible)

3️⃣ Similarity Report Page

After processing, show:

📊 Summary Panel

Overall similarity index

Number of flagged documents

Highest similarity pair

AI summary explanation:

“These 3 assignments share 82% structural similarity and 65% phrase-level overlap.”

“Likely cause: direct copying with minor rewording.”

“Detected shared uncommon phrases.”

4️⃣ Pairwise Comparison View

When clicking a flagged pair:

Split Screen View

Left: Student A
Right: Student B

Features:

Highlight identical text (red)

Highlight paraphrased text (orange)

Highlight structural similarity (yellow)

Scroll sync option

Similarity percentage shown at top

Section-by-section breakdown

Side notes explaining:

“Identical sentence structure”

“Rare phrase match”

“Identical argument sequence”

5️⃣ Cluster View (Very Important)

Instead of only comparing pairs, group assignments into similarity clusters.

Example:

Cluster 1 (5 students) – 75–90% similar
Cluster 2 (3 students) – 60–70% similar
Cluster 3 – Unique submissions

Teachers should be able to:

Click a cluster

See all assignments inside it

View common overlapping segments

See a shared similarity map

6️⃣ AI Explanation Panel

For each flagged assignment or cluster, generate:

Summary explanation

Likely scenario classification:

Direct copying

Shared template use

Group collaboration

Use of common online source

Coincidental similarity

Confidence score

Evidence list:

Matching uncommon phrases

Same paragraph structure

Same errors

Same citation format anomalies

7️⃣ Detailed Metrics Section

Show:

% exact matches

% paraphrased similarity

Structural similarity score

Shared uncommon vocabulary score

Citation similarity

Writing style similarity

Optional advanced feature:

Stylometry analysis (sentence length patterns, vocabulary richness, punctuation habits)

8️⃣ Filtering & Controls

Allow teachers to:

Filter by similarity threshold (e.g., show only above 60%)

Sort by highest similarity

Search by student name

Toggle:

Ignore common phrases

Ignore references

Ignore bibliography

Ignore quotes

9️⃣ Export Options

Teachers should be able to:

Export PDF similarity report

Download highlighted comparison

Export CSV summary

Generate shareable link (optional)

🔐 Security & Privacy

Secure login for teachers

Data encryption

Auto-delete files after selected period

Option to anonymize student names

🎨 UI/UX Design Requirements

Clean, academic style

Professional colors (blue, grey, white)

Clear highlighting system

Minimal clutter

Responsive design

Dark mode optional

🚀 Bonus Advanced Features (Optional but Impressive)

AI detects writing style shift within same document

Cross-year comparison (compare with past submissions)

Internet source detection

AI-generated integrity risk score

Timeline view showing submission upload times

Heatmap visualization of similarity