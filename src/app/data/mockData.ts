// Mock data for the teacher dashboard

export interface Course {
  id: string;
  name: string;
  code: string;
}

export interface Section {
  id: string;
  courseId: string;
  name: string;
  displayName: string;
  isArchive?: boolean;
}

export interface Assignment {
  id: string;
  sectionId: string;
  reportId?: string;
  studentName: string;
  fileName: string;
  uploadDate: string;
  submissionTime: string;
  content: string;
  wordCount: number;
  avgSentenceLength?: number;
  vocabularyDiversity?: number;
  passiveVoiceUsage?: number;
}

export interface SimilarityPair {
  id: string;
  sectionId: string;
  reportId: string;
  student1: string;
  student2: string;
  similarityScore: number;
  exactMatches: number;
  paraphrased: number;
  structural: number;
  riskLevel: "high" | "medium" | "low";
  reviewed?: boolean;
  flagged?: boolean;
}

export interface Cluster {
  id: string;
  sectionId: string;
  reportId: string;
  name: string;
  assignmentIds: string[];
  avgSimilarity: number;
  size: number;
  riskLevel: "high" | "medium" | "low";
}

export interface Report {
  id: string;
  sectionId: string;
  name: string;
  dueDate: string;
  uploadDate: string;
  totalAssignments: number;
  flaggedCount: number;
  avgSimilarity: number;
  highestSimilarity: number;
  sensitivity: "low" | "medium" | "high";
}

// Courses
export const mockCourses: Course[] = [
  { id: "c1", name: "Introduction to Computer Science", code: "CS101" },
  { id: "c2", name: "Data Structures", code: "CS201" },
];

// Sections
export const mockSections: Section[] = [
  {
    id: "s1",
    courseId: "c1",
    name: "Section A",
    displayName: "CS101 – Section A",
  },
  {
    id: "s2",
    courseId: "c1",
    name: "Section B",
    displayName: "CS101 – Section B",
  },
  {
    id: "s3",
    courseId: "c2",
    name: "Section C",
    displayName: "Data Structures – Section C",
  },
  {
    id: "s4",
    courseId: "c1",
    name: "Fall 2025 Archive",
    displayName: "Fall 2025 Archive",
    isArchive: true,
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: "a1",
    sectionId: "s1",
    reportId: "r1",
    studentName: "Emily Chen",
    fileName: "essay_chen.pdf",
    uploadDate: "2026-02-28",
    submissionTime: "2026-02-28 14:23",
    wordCount: 1245,
    avgSentenceLength: 18.5,
    vocabularyDiversity: 0.72,
    passiveVoiceUsage: 0.15,
    content: `The impact of climate change on coastal ecosystems has become increasingly evident in recent years. Rising sea levels threaten biodiversity and human settlements alike. Scientists have documented significant changes in marine habitats, with coral reefs experiencing unprecedented bleaching events. The acidification of oceans poses additional challenges to marine life, particularly shell-forming organisms. Coastal communities must adapt to these changes through sustainable practices and resilient infrastructure. Furthermore, the economic implications of these environmental shifts cannot be ignored, as fishing industries and tourism sectors face substantial disruptions.`,
  },
  {
    id: "a2",
    sectionId: "s1",
    reportId: "r1",
    studentName: "Michael Torres",
    fileName: "torres_assignment.docx",
    uploadDate: "2026-02-28",
    submissionTime: "2026-02-28 14:31",
    wordCount: 1198,
    avgSentenceLength: 18.2,
    vocabularyDiversity: 0.69,
    passiveVoiceUsage: 0.14,
    content: `Climate change's impact on coastal ecosystems has grown increasingly apparent in recent years. Rising sea levels pose threats to both biodiversity and human communities. Scientists have observed substantial changes in marine habitats, with coral reefs suffering unprecedented bleaching events. Ocean acidification creates additional problems for marine life, especially organisms that form shells. Coastal communities need to adapt through sustainable practices and resilient infrastructure. Moreover, the economic consequences of these environmental changes are significant, with fishing industries and tourism sectors experiencing major disruptions.`,
  },
  {
    id: "a3",
    sectionId: "s1",
    reportId: "r1",
    studentName: "Sarah Williams",
    fileName: "williams_essay.txt",
    uploadDate: "2026-02-27",
    submissionTime: "2026-02-27 16:45",
    wordCount: 1356,
    avgSentenceLength: 21.3,
    vocabularyDiversity: 0.81,
    passiveVoiceUsage: 0.08,
    content: `Renewable energy sources represent a crucial solution to our growing energy demands and environmental concerns. Solar power technology has advanced dramatically, making it more accessible and efficient than ever before. Wind energy farms now dot landscapes across continents, generating clean electricity for millions. Hydroelectric systems continue to provide reliable power while newer technologies like tidal and geothermal energy show promising potential. The transition to renewable energy requires significant infrastructure investment but offers long-term economic and environmental benefits. Energy storage solutions remain a key challenge that researchers are actively addressing through innovative battery technologies.`,
  },
  {
    id: "a4",
    sectionId: "s1",
    reportId: "r1",
    studentName: "James Rodriguez",
    fileName: "rodriguez_paper.pdf",
    uploadDate: "2026-02-28",
    submissionTime: "2026-02-28 14:38",
    wordCount: 1221,
    avgSentenceLength: 17.9,
    vocabularyDiversity: 0.70,
    passiveVoiceUsage: 0.16,
    content: `The effects of climate change on coastal ecosystems are becoming more visible each year. Sea level rise threatens biodiversity and human populations. Research has shown major changes in marine environments, with coral reefs undergoing unprecedented bleaching. The acidification of our oceans presents further challenges to marine organisms, particularly those that create shells. Communities along coastlines must adapt using sustainable methods and robust infrastructure. The economic impacts of these ecological changes are also considerable, affecting fishing and tourism industries significantly.`,
  },
  {
    id: "a5",
    sectionId: "s1",
    reportId: "r1",
    studentName: "Lisa Anderson",
    fileName: "anderson_submission.docx",
    uploadDate: "2026-02-27",
    submissionTime: "2026-02-27 10:12",
    wordCount: 1402,
    avgSentenceLength: 22.7,
    vocabularyDiversity: 0.85,
    passiveVoiceUsage: 0.06,
    content: `Artificial intelligence is transforming modern healthcare in remarkable ways. Machine learning algorithms can now analyze medical images with accuracy rivaling experienced radiologists. Diagnostic systems powered by AI help identify diseases earlier and more accurately than traditional methods. Personalized medicine benefits from AI's ability to process vast amounts of genetic and clinical data. Robotic surgery systems enhanced with AI capabilities offer greater precision and reduced recovery times. However, ethical considerations around patient privacy and algorithm bias require careful attention. The integration of AI in healthcare promises improved outcomes while presenting new regulatory and philosophical challenges.`,
  },
  {
    id: "a6",
    sectionId: "s1",
    reportId: "r1",
    studentName: "David Kim",
    fileName: "kim_essay.txt",
    uploadDate: "2026-02-28",
    submissionTime: "2026-02-28 14:45",
    wordCount: 1267,
    avgSentenceLength: 18.1,
    vocabularyDiversity: 0.68,
    passiveVoiceUsage: 0.15,
    content: `Coastal ecosystems face mounting pressures from climate change impacts. Rising ocean levels endanger both natural habitats and human infrastructure. Marine environments are experiencing dramatic transformations, evidenced by widespread coral bleaching phenomena. Ocean acidification compounds these challenges, threatening calcifying marine species. Adaptation strategies for coastal regions must incorporate sustainability and infrastructure resilience. Economic ramifications extend across fishing operations and tourism markets, demanding comprehensive response strategies.`,
  },
  {
    id: "a7",
    sectionId: "s1",
    reportId: "r1",
    studentName: "Rachel Thompson",
    fileName: "thompson_work.pdf",
    uploadDate: "2026-02-27",
    submissionTime: "2026-02-27 18:22",
    wordCount: 1523,
    avgSentenceLength: 19.8,
    vocabularyDiversity: 0.78,
    passiveVoiceUsage: 0.11,
    content: `Urban agriculture represents an innovative approach to food security and sustainability in modern cities. Rooftop gardens and vertical farms maximize limited urban space while reducing food transportation emissions. Community gardens foster social connections and provide fresh produce in food deserts. Hydroponic and aeroponic systems enable year-round cultivation independent of weather conditions. Educational opportunities abound as urban farms teach citizens about food production and environmental stewardship. Municipal support through zoning changes and incentives can accelerate urban agriculture adoption. These initiatives contribute to climate resilience, biodiversity, and improved public health outcomes.`,
  },
  {
    id: "a8",
    sectionId: "s1",
    reportId: "r1",
    studentName: "Christopher Lee",
    fileName: "lee_assignment.docx",
    uploadDate: "2026-02-28",
    submissionTime: "2026-02-28 09:15",
    wordCount: 1189,
    avgSentenceLength: 20.9,
    vocabularyDiversity: 0.79,
    passiveVoiceUsage: 0.09,
    content: `Renewable energy solutions are essential for addressing our expanding energy needs and environmental issues. Solar technology has evolved significantly, becoming more affordable and effective. Wind farms across the world now generate clean power for countless people. Hydroelectric power remains dependable while emerging technologies like tidal and geothermal show great promise. Shifting to renewable energy demands substantial infrastructure spending but provides lasting economic and ecological advantages. Energy storage continues to be a critical obstacle that scientists are tackling with new battery innovations.`,
  },
];

export const mockReports: Report[] = [
  {
    id: "r1",
    sectionId: "s1",
    name: "CS101 Essay 1 - Climate Change",
    dueDate: "2026-03-01",
    uploadDate: "2026-02-28",
    totalAssignments: 8,
    flaggedCount: 4,
    avgSimilarity: 42.5,
    highestSimilarity: 87.3,
    sensitivity: "high",
  },
  {
    id: "r2",
    sectionId: "s1",
    name: "Biology 202 - Lab Report",
    dueDate: "2026-02-25",
    uploadDate: "2026-02-24",
    totalAssignments: 12,
    flaggedCount: 3,
    avgSimilarity: 35.2,
    highestSimilarity: 68.4,
    sensitivity: "medium",
  },
];

export const mockSimilarityPairs: SimilarityPair[] = [
  {
    id: "p1",
    sectionId: "s1",
    reportId: "r1",
    student1: "Emily Chen",
    student2: "Michael Torres",
    similarityScore: 87.3,
    exactMatches: 65,
    paraphrased: 22,
    structural: 13,
    riskLevel: "high",
    reviewed: true,
    flagged: true,
  },
  {
    id: "p2",
    sectionId: "s1",
    reportId: "r1",
    student1: "Michael Torres",
    student2: "James Rodriguez",
    similarityScore: 82.1,
    exactMatches: 58,
    paraphrased: 24,
    structural: 18,
    riskLevel: "high",
    reviewed: true,
    flagged: true,
  },
  {
    id: "p3",
    sectionId: "s1",
    reportId: "r1",
    student1: "Emily Chen",
    student2: "James Rodriguez",
    similarityScore: 79.5,
    exactMatches: 54,
    paraphrased: 25,
    structural: 21,
    riskLevel: "high",
    reviewed: true,
    flagged: true,
  },
  {
    id: "p4",
    sectionId: "s1",
    reportId: "r1",
    student1: "Emily Chen",
    student2: "David Kim",
    similarityScore: 75.8,
    exactMatches: 48,
    paraphrased: 28,
    structural: 24,
    riskLevel: "high",
    reviewed: true,
    flagged: true,
  },
  {
    id: "p5",
    sectionId: "s1",
    reportId: "r1",
    student1: "Sarah Williams",
    student2: "Christopher Lee",
    similarityScore: 71.2,
    exactMatches: 52,
    paraphrased: 19,
    structural: 29,
    riskLevel: "medium",
    reviewed: true,
    flagged: false,
  },
];

export const mockClusters: Cluster[] = [
  {
    id: "c1",
    sectionId: "s1",
    reportId: "r1",
    name: "Climate Change Group",
    assignmentIds: ["a1", "a2", "a4", "a6"],
    avgSimilarity: 81.2,
    size: 4,
    riskLevel: "high",
  },
  {
    id: "c2",
    sectionId: "s1",
    reportId: "r1",
    name: "Renewable Energy Group",
    assignmentIds: ["a3", "a8"],
    avgSimilarity: 71.2,
    size: 2,
    riskLevel: "medium",
  },
  {
    id: "c3",
    sectionId: "s1",
    reportId: "r1",
    name: "Unique Submissions",
    assignmentIds: ["a5", "a7"],
    avgSimilarity: 12.4,
    size: 2,
    riskLevel: "low",
  },
];

export interface HighlightMatch {
  text: string;
  type: "exact" | "paraphrased" | "structural";
  startIndex: number;
  endIndex: number;
}

export function getMatchesForPair(pairId: string): {
  student1Matches: HighlightMatch[];
  student2Matches: HighlightMatch[];
} {
  // Simulate highlighted matches based on pair
  if (pairId === "p1") {
    return {
      student1Matches: [
        {
          text: "The impact of climate change on coastal ecosystems has become increasingly evident in recent years.",
          type: "exact",
          startIndex: 0,
          endIndex: 100,
        },
        {
          text: "Rising sea levels threaten biodiversity and human settlements alike.",
          type: "paraphrased",
          startIndex: 101,
          endIndex: 169,
        },
      ],
      student2Matches: [
        {
          text: "Climate change's impact on coastal ecosystems has grown increasingly apparent in recent years.",
          type: "exact",
          startIndex: 0,
          endIndex: 95,
        },
        {
          text: "Rising sea levels pose threats to both biodiversity and human communities.",
          type: "paraphrased",
          startIndex: 96,
          endIndex: 170,
        },
      ],
    };
  }
  return { student1Matches: [], student2Matches: [] };
}

export const aiExplanations = {
  p1: {
    summary: "These assignments share 87.3% structural similarity and 65% phrase-level overlap.",
    likelyScenario: "Direct copying with minor rewording",
    confidence: 95,
    evidence: [
      "Matching uncommon phrases: 'unprecedented bleaching events'",
      "Identical paragraph structure across 4 sections",
      "Same argument sequence and conclusion",
      "Shared rare vocabulary combinations",
    ],
  },
  p2: {
    summary: "High similarity detected with substantial content overlap and parallel structure.",
    likelyScenario: "Shared template or source material",
    confidence: 88,
    evidence: [
      "Common source citations in identical order",
      "Matching section headers and organization",
      "Similar introduction and conclusion frameworks",
    ],
  },
  c1: {
    summary: "This cluster of 4 assignments shows consistent patterns suggesting coordinated effort.",
    likelyScenario: "Group collaboration beyond permitted scope",
    confidence: 92,
    evidence: [
      "All submissions use identical thesis structure",
      "Shared uncommon vocabulary across all papers",
      "Similar argumentation flow and evidence selection",
      "Matching stylistic choices and transitions",
    ],
  },
};