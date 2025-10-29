"use client";

import TopNavBar from "../components/navbar/TopNavBar";
import FilterPanel from "../components/problems/FilterPanel";
import mockQuestions from "../../../data/mockQuestions.json"; 

export default function ProblemsPage() {
  const questions = mockQuestions;

  return (
    <main className="min-h-screen">
      <TopNavBar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Problems</h1>
        <FilterPanel questions={questions} />
      </div>
    </main>
  );
}
