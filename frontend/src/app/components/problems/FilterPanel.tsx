"use client";

import { useState, useMemo } from "react";
import { Question } from "../../../../lib/mockApi";
import { useTheme } from "../../../../context/ThemeContext";
import QuestionsTable from "./QuestionsTable";

interface Props {
  questions: Question[];
}

export default function FilterPanel({ questions }: Props) {
  const { theme } = useTheme();

  const [difficulty, setDifficulty] = useState<string>("all");
  const [topic, setTopic] = useState<string>("all");

  const capitalize = (text: string) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const difficulties = useMemo(() => {
    const unique = Array.from(new Set(questions.map((q) => q.difficulty)));
    const formatted = unique.map(capitalize);
    return ["All", ...formatted];
  }, [questions]);

  const topics = useMemo(() => {
    const unique = Array.from(new Set(questions.map((q) => q.topicType)));
    const formatted = unique.map(capitalize);
    return ["All", ...formatted];
  }, [questions]);

  // Filter logic
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesDifficulty =
        difficulty === "All" || q.difficulty.toLowerCase() === difficulty.toLowerCase();
      const matchesTopic =
        topic === "All" || q.topicType.toLowerCase() === topic.toLowerCase();
      return matchesDifficulty && matchesTopic;
    });
  }, [questions, difficulty, topic]);

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Controls */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 rounded-md border transition-colors focus:outline-none focus:ring-2"
          style={{
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          }}
        >
          {difficulties.map((d) => (
            <option
              key={d}
              value={d}
              style={{
                backgroundColor: theme.surface,
                color: theme.text,
              }}
            >
              {d === "All" ? "All Difficulties" : d}
            </option>
          ))}
        </select>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="p-2 rounded-md border transition-colors focus:outline-none focus:ring-2"
          style={{
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          }}
        >
          {topics.map((t) => (
            <option
              key={t}
              value={t}
              style={{
                backgroundColor: theme.surface,
                color: theme.text,
              }}
            >
              {t === "All" ? "All Topics" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Render Table */}
      <QuestionsTable questions={filteredQuestions} />
    </div>
  );
}
