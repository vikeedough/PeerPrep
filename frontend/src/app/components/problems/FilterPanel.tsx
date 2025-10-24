"use client";

import React from "react";
import { useTheme } from "../../../../context/ThemeContext";
import Button from "../common/Button";

const DATA_STRUCTURES = [
  "Arrays",
  "Strings",
  "Hash Table",
  "Tree",
  "Graph",
  "Stack",
  "Queue",
  "Linked List",
];

const TOPICS = ["Algorithms", "Database", "Panda", "System Design"];

export default function FilterPanel({
  search,
  setSearch,
  selectedDS,
  setSelectedDS,
  selectedTopic,
  setSelectedTopic,
  expanded,
  setExpanded,
  handleSort,
  ascending,
}: any) {
  const { theme } = useTheme();

  const toggleSelection = (item: string, list: string[], setList: any) => {
    setList(
      list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
    );
  };

  return (
    <div
      className="rounded-xl p-4 space-y-4"
      style={{ backgroundColor: theme.surface }}
    >
      {/* Data Structure Filters */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Data Structures</h3>
          <Button variant="secondary" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
        <div
          className={`grid gap-2 ${
            expanded ? "grid-cols-4" : "grid-cols-3 max-h-16 overflow-hidden"
          }`}
        >
          {DATA_STRUCTURES.map((ds) => (
            <button
              key={ds}
              onClick={() => toggleSelection(ds, selectedDS, setSelectedDS)}
              className={`rounded-md px-3 py-1 border ${
                selectedDS.includes(ds)
                  ? "bg-blue-500 text-white"
                  : "bg-transparent"
              }`}
              style={{ borderColor: theme.border }}
            >
              {ds}
            </button>
          ))}
        </div>
      </div>

      {/* Topic Filters */}
      <div>
        <h3 className="font-bold mb-2">Topics</h3>
        <div className="flex gap-2 flex-wrap">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() =>
                toggleSelection(topic, selectedTopic, setSelectedTopic)
              }
              className={`rounded-md px-3 py-1 border ${
                selectedTopic.includes(topic)
                  ? "bg-green-500 text-white"
                  : "bg-transparent"
              }`}
              style={{ borderColor: theme.border }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-1/2"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.border,
            color: theme.text,
          }}
        />
        <Button variant="primary" onClick={handleSort}>
          Sort by Difficulty {ascending ? "↑" : "↓"}
        </Button>
      </div>
    </div>
  );
}
