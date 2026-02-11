import { useState } from "react"
import axios from "axios"

export default function FileUpload() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleUpload = async () => {
    if (!files.length) return
    setLoading(true)

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/compare",
        formData
      )
      setResult(response.data)
    } catch (err) {
      console.error(err)
      alert("Backend connection failed")
    }

    setLoading(false)
  }

  const riskLevel = (score) => {
    if (score < 30) return "Low Risk"
    if (score < 60) return "Moderate Risk"
    return "High Risk"
  }

  return (
    <div className="text-center">
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="mb-6 text-white"
      />

      <button
        onClick={handleUpload}
        className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Analyzing..." : "Analyze Similarity"}
      </button>

      {result && (
        <div className="mt-10">
          <div className="text-5xl font-bold mb-4">
            {result.similarity}%
          </div>

          <div className="text-lg text-gray-300 mb-6">
            {riskLevel(result.similarity)}
          </div>

          <div className="w-full bg-white/20 h-4 rounded-full">
            <div
              className="bg-red-500 h-4 rounded-full transition-all"
              style={{ width: `${result.similarity}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
