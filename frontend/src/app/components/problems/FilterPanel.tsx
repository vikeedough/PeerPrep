"use client";

import { useState } from "react";
import { Question } from "../../../../lib/mockApi";
import QuestionsTable from "./QuestionsTable";
import { useTheme } from "../../../../context/ThemeContext";

interface Props {
  questions: Question[];
}

export default function FilterPanel({ questions }: Props) {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [topic, setTopic] = useState<string>("all");
  const [difficultyFocused, setDifficultyFocused] = useState(false);
  const [topicFocused, setTopicFocused] = useState(false);
  const { theme } = useTheme();

  // Extract unique values dynamically
  const difficulties = [
    "all",
    ...Array.from(new Set(questions.map(q => q.difficulty.toLowerCase()))),
  ];

  const topics = [
    "all",
    ...Array.from(new Set(questions.map(q => q.topicType.toLowerCase()))),
  ];

  // Filter logic
  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty =
      difficulty === "all" || q.difficulty.toLowerCase() === difficulty;
    const matchesTopic = topic === "all" || q.topicType.toLowerCase() === topic;
    return matchesDifficulty && matchesTopic;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Controls */}
      <div className="flex gap-4">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border rounded-lg p-2 shadow-sm focus:outline-none"
          onFocus={() => setDifficultyFocused(true)}
          onBlur={() => setDifficultyFocused(false)}
          style={{
            backgroundColor: theme.input.background,
            color: theme.input.text,
            borderColor: theme.input.border,
            boxShadow: difficultyFocused ? `0 0 0 3px ${theme.input.focusBorder}33` : undefined,
          }}
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border rounded-lg p-2 shadow-sm focus:outline-none"
          onFocus={() => setTopicFocused(true)}
          onBlur={() => setTopicFocused(false)}
          style={{
            backgroundColor: theme.input.background,
            color: theme.input.text,
            borderColor: theme.input.border,
            boxShadow: topicFocused ? `0 0 0 3px ${theme.input.focusBorder}33` : undefined,
          }}
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>

      {/* Render Table */}
      <QuestionsTable questions={filteredQuestions} />
    </div>
  );
}
