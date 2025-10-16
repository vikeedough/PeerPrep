"use client";

import { useEffect, useState } from "react";
import TopNavBar from "../components/navbar/TopNavBar";
import { fetchQuestions, sortQuestionsByDifficulty, Question } from "../../../lib/mockApi";
import { useTheme } from "../../../context/ThemeContext";
import FilterPanel from "../components/problems/FilterPanel";
import QuestionsTable from "../components/problems/QuestionsTable";

export default function ProblemsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filtered, setFiltered] = useState<Question[]>([]);
  const [ascending, setAscending] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDS, setSelectedDS] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    const load = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
      setFiltered(data);
    };
    load();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let temp = [...questions];

    if (search) {
      temp = temp.filter((q) =>
        q.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDS.length > 0) {
      temp = temp.filter((q) => selectedDS.includes(q.dataStructure));
    }

    if (selectedTopic.length > 0) {
      temp = temp.filter((q) => selectedTopic.includes(q.topicType));
    }

    setFiltered(temp);
  }, [search, selectedDS, selectedTopic, questions]);

  const handleSort = async () => {
    const sorted = await sortQuestionsByDifficulty(ascending);
    setFiltered(sorted);
    setAscending(!ascending);
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      <TopNavBar />

      <section className="flex-1 p-6 space-y-6">
        <FilterPanel
          search={search}
          setSearch={setSearch}
          selectedDS={selectedDS}
          setSelectedDS={setSelectedDS}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          expanded={expanded}
          setExpanded={setExpanded}
          handleSort={handleSort}
          ascending={ascending}
        />

        <QuestionsTable questions={filtered} />
      </section>
    </main>
  );
}
