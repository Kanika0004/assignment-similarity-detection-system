import { mockAssignments, mockSimilarityPairs } from "../data/mockData";
import { Link } from "react-router";
import { useSectionContext } from "../context/SectionContext";

export function SimilarityHeatmap() {
  const { selectedSectionId } = useSectionContext();
  
  // Filter data by selected section
  const sectionAssignments = mockAssignments.filter(a => a.sectionId === selectedSectionId);
  const sectionPairs = mockSimilarityPairs.filter(p => p.sectionId === selectedSectionId);
  
  const students = sectionAssignments.map((a) => a.studentName);

  // Generate similarity matrix
  const getSimilarity = (student1: string, student2: string) => {
    if (student1 === student2) return 100;

    const pair = sectionPairs.find(
      (p) =>
        (p.student1 === student1 && p.student2 === student2) ||
        (p.student1 === student2 && p.student2 === student1)
    );

    if (pair) return pair.similarityScore;

    // Return low similarity for non-pairs
    return Math.floor(Math.random() * 30) + 5;
  };

  const getColorClass = (similarity: number) => {
    if (similarity === 100) return "bg-gray-200 text-gray-400";
    if (similarity >= 80) return "bg-red-600 text-white hover:bg-red-700";
    if (similarity >= 60) return "bg-orange-500 text-white hover:bg-orange-600";
    if (similarity >= 40) return "bg-yellow-500 text-white hover:bg-yellow-600";
    return "bg-green-100 text-green-700 hover:bg-green-200";
  };

  const getPairId = (student1: string, student2: string) => {
    const pair = sectionPairs.find(
      (p) =>
        (p.student1 === student1 && p.student2 === student2) ||
        (p.student1 === student2 && p.student2 === student1)
    );
    return pair?.id;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">
          Student Similarity Heatmap
        </h3>
        <p className="text-sm text-gray-600">
          Click any cell to view detailed comparison
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="p-2 w-32"></th>
              {students.map((student, idx) => (
                <th
                  key={idx}
                  className="p-2 text-xs font-medium text-gray-600 transform -rotate-45 origin-bottom-left"
                >
                  <span className="block w-20 text-left">
                    {student.split(" ")[0]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student1, i) => (
              <tr key={i}>
                <td className="p-2 text-sm font-medium text-gray-900 text-right pr-4">
                  {student1}
                </td>
                {students.map((student2, j) => {
                  const similarity = getSimilarity(student1, student2);
                  const pairId = getPairId(student1, student2);
                  const Cell = pairId && i !== j ? Link : "div";

                  return (
                    <td key={j} className="p-1">
                      <Cell
                        {...(pairId && i !== j
                          ? { to: `/comparison/${pairId}` }
                          : {})}
                        className={`w-12 h-12 flex items-center justify-center text-xs font-semibold rounded transition-all cursor-pointer ${getColorClass(
                          similarity
                        )}`}
                        title={
                          i === j
                            ? "Same student"
                            : `${student1} ↔ ${student2}: ${similarity.toFixed(1)}%`
                        }
                      >
                        {i === j ? "—" : `${Math.round(similarity)}`}
                      </Cell>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-6 text-xs">
        <span className="font-medium text-gray-700">Legend:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-gray-600">High (80-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Medium (60-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Low (40-59%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-gray-600">Minimal (&lt;40%)</span>
        </div>
      </div>
    </div>
  );
}