import Navbar from "../components/Navbar"
import FileUpload from "../components/FileUpload"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            AI Assignment Similarity Analyzer
          </h1>
          <p className="text-gray-300">
            Detect semantic similarity using NLP & Transformer models
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl">
          <FileUpload />
        </div>
      </div>
    </div>
  )
}
