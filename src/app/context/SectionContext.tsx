import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockSections } from "../data/mockData";

interface SectionContextType {
  selectedSectionId: string;
  setSelectedSectionId: (id: string) => void;
  getSelectedSection: () => any;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  // Load from localStorage or default to first section
  const [selectedSectionId, setSelectedSectionIdState] = useState<string>(() => {
    const saved = localStorage.getItem("selectedSectionId");
    return saved || mockSections[0].id;
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedSectionId", selectedSectionId);
  }, [selectedSectionId]);

  const setSelectedSectionId = (id: string) => {
    setSelectedSectionIdState(id);
  };

  const getSelectedSection = () => {
    return mockSections.find((s) => s.id === selectedSectionId);
  };

  return (
    <SectionContext.Provider
      value={{ selectedSectionId, setSelectedSectionId, getSelectedSection }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionContext must be used within SectionProvider");
  }
  return context;
}
