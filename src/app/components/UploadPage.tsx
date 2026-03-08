import { useState } from "react";
import { Upload, X, FileText, CheckCircle, Sliders } from "lucide-react";
import { useNavigate } from "react-router";
import { useSectionContext } from "../context/SectionContext";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function UploadPage() {
  const navigate = useNavigate();
  const { getSelectedSection } = useSectionContext();
  const selectedSection = getSelectedSection();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [assignmentName, setAssignmentName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [sensitivity, setSensitivity] = useState(50);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Advanced detection controls
  const [ignoreBibliography, setIgnoreBibliography] = useState(true);
  const [ignoreQuotes, setIgnoreQuotes] = useState(true);
  const [ignoreCommonPhrases, setIgnoreCommonPhrases] = useState(true);
  const [ignoreTemplates, setIgnoreTemplates] = useState(false);
  const [detectAI, setDetectAI] = useState(false);
  const [detectStyleShift, setDetectStyleShift] = useState(false);
  const [compareWith, setCompareWith] = useState<"current" | "past" | "institutional">("current");

  const isArchive = selectedSection?.isArchive || false;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (isArchive) return; // Prevent drops in archive mode

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = () => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/report/r1");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Upload Assignments
        </h2>
        <p className="text-gray-600 mt-1">
          Upload student assignment files for similarity analysis
        </p>
      </div>

      {/* Section Context Notice */}
      <div className={`p-4 rounded-lg border ${
        isArchive 
          ? "bg-orange-50 border-orange-200"
          : "bg-blue-50 border-blue-200"
      }`}>
        <p className="text-sm font-medium">
          {isArchive ? (
            <span className="text-orange-800">
              📁 Archive Mode - Uploads are disabled for archived sections
            </span>
          ) : (
            <span className="text-blue-800">
              📤 Uploading to: <strong>{selectedSection?.displayName}</strong>
            </span>
          )}
        </p>
      </div>

      {/* Assignment Details */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Assignment Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assignment Name
          </label>
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            placeholder="e.g., CS101 Essay 1 - Climate Change"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detection Sensitivity
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["low", "medium", "high"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSensitivity(level === "low" ? 70 : level === "medium" ? 50 : 30)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  sensitivity === (level === "low" ? 70 : level === "medium" ? 50 : 30)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="font-medium capitalize">{level}</span>
                <p className="text-xs mt-1">
                  {level === "low" && "≥70% flagged"}
                  {level === "medium" && "≥50% flagged"}
                  {level === "high" && "≥30% flagged"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* File Upload Area */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Upload Files</h3>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supported formats: PDF, DOCX, TXT
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.txt"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Browse Files
          </label>
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">
                {files.length} file{files.length !== 1 ? "s" : ""} uploaded
              </p>
              <button
                onClick={() => setFiles([])}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Detection Controls */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Detection Controls</h3>
        </div>

        <div className="space-y-4">
          {/* Custom Sensitivity Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Custom Sensitivity Threshold
              </label>
              <span className="text-sm font-semibold text-blue-600">
                {sensitivity}% or higher flagged
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>More lenient (90%)</span>
              <span>More strict (10%)</span>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={ignoreBibliography}
                onChange={(e) => setIgnoreBibliography(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Ignore Bibliography
                </span>
                <p className="text-xs text-gray-500">Exclude reference sections</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={ignoreQuotes}
                onChange={(e) => setIgnoreQuotes(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Ignore Quoted Text
                </span>
                <p className="text-xs text-gray-500">Exclude direct quotations</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={ignoreCommonPhrases}
                onChange={(e) => setIgnoreCommonPhrases(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Ignore Common Phrases
                </span>
                <p className="text-xs text-gray-500">Exclude academic boilerplate</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={ignoreTemplates}
                onChange={(e) => setIgnoreTemplates(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Ignore Template Sections
                </span>
                <p className="text-xs text-gray-500">Exclude provided templates</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors border border-blue-200">
              <input
                type="checkbox"
                checked={detectAI}
                onChange={(e) => setDetectAI(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Detect AI-Generated Text
                </span>
                <p className="text-xs text-gray-500">Flag potential AI usage</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors border border-purple-200">
              <input
                type="checkbox"
                checked={detectStyleShift}
                onChange={(e) => setDetectStyleShift(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Detect Style Shifts
                </span>
                <p className="text-xs text-gray-500">Flag inconsistent writing</p>
              </div>
            </label>
          </div>

          {/* Compare With Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compare With
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setCompareWith("current")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  compareWith === "current"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Current Batch
              </button>
              <button
                onClick={() => setCompareWith("past")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  compareWith === "past"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Past Semesters
              </button>
              <button
                onClick={() => setCompareWith("institutional")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  compareWith === "institutional"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Database
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              {uploadProgress === 100 ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Upload className="w-5 h-5 text-blue-600 animate-pulse" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {uploadProgress === 100
                  ? "Analysis Complete!"
                  : "Processing assignments..."}
              </p>
              <p className="text-xs text-gray-500">
                {uploadProgress === 100
                  ? "Redirecting to report..."
                  : "Analyzing similarity patterns"}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {uploadProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {files.length} file{files.length !== 1 ? "s" : ""} ready for analysis
        </p>
        <button
          onClick={handleSubmit}
          disabled={files.length === 0 || !assignmentName || uploading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {uploading ? "Processing..." : "Analyze Assignments"}
        </button>
      </div>
    </div>
  );
}