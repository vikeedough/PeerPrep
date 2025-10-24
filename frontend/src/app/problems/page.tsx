"use client";

import FilterPanel from "../components/problems/FilterPanel";
import mockQuestions from "../../../data/mockQuestions.json"; 

export default function ProblemsPage() {
  const questions = mockQuestions;

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Problems</h1>
      <FilterPanel questions={questions} />
    </main>
  );
}
