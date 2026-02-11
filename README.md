<h1>📘 Assignment Similarity Detection System</h1>

<p>
An <strong>AI-powered assignment similarity analyzer</strong> that compares two or more assignments (PDF files)
and detects similarity using <strong>OCR + semantic embeddings</strong>.
</p>

<h3>✅ Supported Assignment Types</h3>
<ul>
  <li>Typed assignments (digital PDFs)</li>
  <li>Scanned PDFs</li>
  <li>Handwritten assignments (via OCR)</li>
</ul>

<hr/>

<h2>🧠 Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> FastAPI</li>
  <li><strong>NLP:</strong> Sentence Transformers</li>
  <li><strong>OCR:</strong> Tesseract OCR</li>
  <li><strong>Frontend:</strong> React + Vite</li>
  <li><strong>PDF Processing:</strong> pdfplumber</li>
</ul>

<hr/>

<h2>🧩 System Requirements (IMPORTANT)</h2>

<h3>🔧 Software Requirements</h3>
<ul>
  <li>Python 3.9 or higher</li>
  <li>Node.js v18 or higher</li>
  <li>Git</li>
  <li>Tesseract OCR</li>
</ul>

<p><strong>⚠️ Note:</strong> Ensure Tesseract OCR is installed and added to your system PATH.</p>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
assignment_similarity_system/
│
├── api/
│   ├── __pycache__/
│   ├── main.py                 # FastAPI entry point
│   ├── dashboard.py            # Dashboard-related APIs
│   │
│   ├── core/
│   │   ├── __pycache__/
│   │   ├── config.py           # App configuration
│   │   ├── database.py         # SQLite database setup
│   │   └── utils.py            # Common helper functions
│   │
│   ├── features/               # Similarity engines
│   │   ├── content_similarity.py
│   │   ├── semantic_similarity.py
│   │   ├── structure_similarity.py
│   │   ├── metadata_similarity.py
│   │   ├── stylometry_similarity.py
│   │   ├── text_similarity.py
│   │   └── weighting.py        # Weighted final score
│
├── ocr/
│   ├── __pycache__/
│   ├── doc_reader.py           # DOC/PDF text extraction
│   ├── file_reader.py          # File handling utilities
│   └── pdf_reader.py           # OCR + PDF parsing
│
├── preprocessing/
│   ├── __pycache__/
│   └── text_cleaner.py         # Text normalization & cleanup
│
├── scoring/
│   ├── __pycache__/
│   └── weighted_score.py       # Risk calculation logic
│
├── storage/
│   └── similarity_results.db   # SQLite database
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   │
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RiskBadge.jsx
│   │   │   └── SimilarityMatrix.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js           # Backend API calls
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── requirements.txt

</pre>

<hr/>

<h2>⚙️ Installation & Setup</h2>

<h3>1️⃣ Clone the Repository</h3>

<pre>
git clone https://github.com/Kanika0004/assignment-similarity-detection-system.git
cd assignment-similarity-detection-system
</pre>

<hr/>

<h2>🖥️ Backend Setup (FastAPI)</h2>

<h3>Create a Virtual Environment</h3>
<pre>
python -m venv venv
</pre>

<h3>Activate the Virtual Environment</h3>

<p><strong>Windows</strong></p>
<pre>
venv\Scripts\activate
</pre>

<p><strong>Mac / Linux</strong></p>
<pre>
source venv/bin/activate
</pre>

<h3>Install Backend Dependencies</h3>
<pre>
pip install -r requirements.txt
</pre>

<h3>Run Backend Server</h3>
<pre>
uvicorn api.main:app --reload --port 8000
</pre>

<h3>Backend URLs</h3>
<ul>
  <li><strong>API Server:</strong> http://127.0.0.1:8000</li>
  <li><strong>Swagger Docs:</strong> http://127.0.0.1:8000/docs</li>
</ul>

<hr/>

<h2>🌐 Frontend Setup (React + Vite)</h2>

<p>Open a <strong>new terminal window</strong>:</p>

<pre>
cd frontend
npm install
npm run dev
</pre>

<h3>Frontend URL</h3>
<ul>
  <li><strong>Web App:</strong> http://localhost:5173</li>
</ul>

<hr/>

<h2>📊 Similarity Interpretation</h2>

<table border="1" cellpadding="8" cellspacing="0">
  <tr>
    <th>Similarity Score</th>
    <th>Risk Level</th>
  </tr>
  <tr>
    <td>&gt; 85%</td>
    <td>High Risk ⚠️</td>
  </tr>
  <tr>
    <td>60–85%</td>
    <td>Moderate Risk</td>
  </tr>
  <tr>
    <td>30–60%</td>
    <td>Low Risk</td>
  </tr>
  <tr>
    <td>&lt; 30%</td>
    <td>Very Low Risk</td>
  </tr>
</table>

<hr/>

<h2>📸 OCR Support</h2>
<ul>
  <li>Automatically extracts text from scanned PDFs</li>
  <li>Falls back to OCR if no digital text is detected</li>
  <li>Supports handwritten and printed assignments</li>
  <li>Powered by Tesseract OCR</li>
</ul>

<hr/>

<h2>🧪 Example API Response</h2>

<pre>
{
  "file1": "assignment1.pdf",
  "file2": "assignment2.pdf",
  "similarity": 73.74,
  "risk": "Moderate Risk"
}
</pre>

<hr/>

<h2>🔮 Future Enhancements</h2>
<ul>
  <li>📈 Plagiarism heatmaps</li>
  <li>🧑‍🎓 Student-wise comparison history</li>
  <li>☁️ Cloud deployment (Render + Vercel)</li>
  <li>📑 Support for DOCX and image files</li>
  <li>📊 Downloadable similarity reports</li>
</ul>

<hr/>

<h2>👥 Contribution Guidelines (For Groupmates)</h2>
<ul>
  <li>Follow the existing folder structure</li>
  <li>Backend changes go inside <code>api/</code></li>
  <li>Frontend UI changes go inside <code>frontend/src/</code></li>
  <li>Run backend and frontend separately</li>
  <li>Update this README when new features are added</li>
</ul>
