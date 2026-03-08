import { useSectionContext } from "../context/SectionContext";
import { mockSections } from "../data/mockData";
import { ChevronDown, Archive } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function SectionSelector() {
  const { selectedSectionId, setSelectedSectionId, getSelectedSection } =
    useSectionContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSection = getSelectedSection();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[280px]"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            {selectedSection?.isArchive && (
              <Archive className="w-4 h-4 text-gray-500" />
            )}
            <span className="font-medium text-gray-900">
              {selectedSection?.displayName}
            </span>
          </div>
          {selectedSection?.isArchive && (
            <span className="text-xs text-gray-500">Archive Mode (View Only)</span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-2">
            {mockSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSelect(section.id)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  section.id === selectedSectionId ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {section.isArchive && (
                    <Archive className="w-4 h-4 text-gray-500" />
                  )}
                  <span
                    className={`font-medium ${
                      section.id === selectedSectionId
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    {section.displayName}
                  </span>
                </div>
                {section.isArchive && (
                  <span className="text-xs text-gray-500 ml-6">
                    Archive Mode (View Only)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
