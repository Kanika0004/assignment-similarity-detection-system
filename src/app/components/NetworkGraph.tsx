import { useEffect, useRef, useState } from "react";
import { mockAssignments, mockSimilarityPairs, mockClusters } from "../data/mockData";
import { useSectionContext } from "../context/SectionContext";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  cluster?: string;
}

interface Edge {
  source: string;
  target: string;
  strength: number;
}

export function NetworkGraph() {
  const { selectedSectionId } = useSectionContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    // Filter data by selected section
    const sectionAssignments = mockAssignments.filter(a => a.sectionId === selectedSectionId);
    const sectionPairs = mockSimilarityPairs.filter(p => p.sectionId === selectedSectionId);
    const sectionClusters = mockClusters.filter(c => c.sectionId === selectedSectionId);

    // Initialize nodes
    const initialNodes: Node[] = sectionAssignments.map((assignment, idx) => {
      const angle = (idx / sectionAssignments.length) * 2 * Math.PI;
      const radius = 150;
      
      // Find cluster
      const cluster = sectionClusters.find(c => c.assignmentIds.includes(assignment.id));
      
      return {
        id: assignment.id,
        name: assignment.studentName,
        x: 250 + Math.cos(angle) * radius,
        y: 250 + Math.sin(angle) * radius,
        cluster: cluster?.id,
      };
    });

    // Initialize edges from similarity pairs
    const initialEdges: Edge[] = sectionPairs
      .filter((pair) => pair.similarityScore >= 60)
      .map((pair) => {
        const source = sectionAssignments.find(
          (a) => a.studentName === pair.student1
        );
        const target = sectionAssignments.find(
          (a) => a.studentName === pair.student2
        );
        return {
          source: source!.id,
          target: target!.id,
          strength: pair.similarityScore,
        };
      });

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [selectedSectionId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      // Edge color based on strength
      const alpha = edge.strength / 100;
      if (edge.strength >= 80) {
        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
      } else if (edge.strength >= 70) {
        ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
      } else {
        ctx.strokeStyle = `rgba(234, 179, 8, ${alpha})`;
      }

      // Edge width based on strength
      ctx.lineWidth = (edge.strength / 100) * 5;

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((node) => {
      const isHovered = hoveredNode?.id === node.id;
      
      // Cluster colors
      let nodeColor = "#3b82f6"; // blue
      if (node.cluster === "c1") nodeColor = "#ef4444"; // red for high-risk cluster
      if (node.cluster === "c2") nodeColor = "#f59e0b"; // orange for medium-risk
      if (node.cluster === "c3") nodeColor = "#10b981"; // green for low-risk

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, isHovered ? 14 : 10, 0, 2 * Math.PI);
      ctx.fillStyle = nodeColor;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.stroke();

      // Draw label
      ctx.fillStyle = "#1f2937";
      ctx.font = isHovered ? "bold 12px sans-serif" : "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        node.name.split(" ")[0],
        node.x,
        node.y + (isHovered ? 28 : 24)
      );
    });
  }, [nodes, edges, hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hoveredNode = nodes.find((node) => {
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      return distance < 15;
    });

    setHoveredNode(hoveredNode || null);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">
          Similarity Network Graph
        </h3>
        <p className="text-sm text-gray-600">
          Nodes represent students, edges show similarity strength
        </p>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseMove={handleMouseMove}
          className="border border-gray-200 rounded-lg mx-auto cursor-pointer"
        />

        {hoveredNode && (
          <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {hoveredNode.name}
            </p>
            <p className="text-xs text-gray-600">
              Cluster: {hoveredNode.cluster || "None"}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs justify-center flex-wrap">
        <span className="font-medium text-gray-700">Clusters:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">No Cluster</span>
        </div>
      </div>
    </div>
  );
}