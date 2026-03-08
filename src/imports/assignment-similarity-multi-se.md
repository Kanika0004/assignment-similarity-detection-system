Modify the existing Assignment Similarity Checker Teacher Dashboard to support multiple courses and sections while keeping the current UI design intact.

Do NOT redesign the interface.
Only enhance it with proper academic hierarchy and data scoping.

🎯 Core Requirement

Add a persistent Course / Section Selector dropdown at the top of the dashboard.

All data shown across the platform must dynamically update based on the selected course/section.

The selection must remain visible at all times.

🧭 Academic Hierarchy Structure

The system must follow this structure:

Course
→ Section
→ Assignment
→ Report
→ Pairwise / Cluster Analysis

Each level must be strictly scoped to the selected section.

🖥️ 1️⃣ Add Persistent Section Dropdown (Top Bar)

At the top of the dashboard (next to title or profile area), add a dropdown with options like:

CS101 – Section A

CS101 – Section B

Data Structures – Section C

Fall 2026 Archive

The selected option must:

Stay visible at all times

Control all data displayed on screen

Persist across navigation (Dashboard, Upload, Reports, etc.)

Remember last selected section (session/local storage)

🔄 2️⃣ Dynamic Data Scoping (Very Important)

When a section is selected:

Dashboard must show ONLY:

Assignments belonging to that section

Students in that section

Similarity reports for that section

Clusters within that section

Flagged cases within that section

Section-specific metrics

Do NOT mix data across sections unless explicitly enabled.

📊 3️⃣ Dashboard Adjustments (Without Changing Layout)

Keep your existing UI.

But update the logic so:

“Total Assignments” = assignments in selected section

“High Similarity Cases” = cases within selected section

“Recent Reports” = reports from selected section

Similarity charts = section-specific

Heatmaps = students from selected section only

Everything must be filtered by selected section.

📂 4️⃣ Upload Page Scoping

When teacher uploads assignments:

Automatically attach uploads to the currently selected section

Show section name clearly on the Upload page
Example:
"Uploading to: CS101 – Section A"

Prevent uploading without section context.

📑 5️⃣ Reports Page Scoping

Reports must:

Belong to a specific section

Only display submissions from that section

Only compare students within that section

Add breadcrumb:

Dashboard > CS101 – Section A > Essay 1 Report

🗂️ 6️⃣ Multiple Assignments Per Section

Each section must support:

Multiple assignments

Separate reports per assignment

Independent similarity analysis per assignment

Example structure:

CS101 – Section A
→ Essay 1
→ Essay 2
→ Final Project

Each generates its own similarity report.

Do NOT combine different assignments into same similarity pool.

🧊 7️⃣ Archive Mode

If “Fall 2026 Archive” is selected:

Show archived assignments only

Disable new uploads

Allow viewing reports only

Display “Archive Mode” badge clearly

💾 8️⃣ Data Isolation Rules

Strictly enforce:

Students belong to only one section

Similarity comparisons occur only within same assignment + same section

No cross-section comparisons unless future feature explicitly added

🧠 9️⃣ UX Rules

Keep current clean UI

Do not clutter dashboard

Section selector must be simple dropdown (not tabs)

Selection must feel natural and lightweight

No overwhelming new panels

This is an architectural enhancement, not a redesign.

🏆 Final Expected Behavior

When teacher selects:

CS101 – Section B

Everything updates:

Metrics

Charts

Students

Reports

Flags

Clusters

When they switch to:

Data Structures – Section C

Entire dashboard refreshes to reflect only that section.

Clean. Isolated. Professional.