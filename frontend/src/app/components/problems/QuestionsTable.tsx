"use client";

import { Question } from "../../../../lib/mockApi";
import { useTheme } from "../../../../context/ThemeContext";
import QuestionRow from "./Question";

interface Props {
  questions: Question[];
}

export default function QuestionsTable({ questions }: Props) {
  const { theme } = useTheme();

  return (
    <table className="w-full border-collapse text-sm">
      <thead style={{ backgroundColor: theme.surface }}>
        <tr>
          <th className="p-3 text-left">#</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Difficulty</th>
          <th className="p-3 text-left">Acceptance</th>
          <th className="p-3 text-left">Data Structure</th>
          <th className="p-3 text-left">Topic</th>
        </tr>
      </thead>

      <tbody>
        {questions.map((q, i) => (
          <QuestionRow key={q.id} question={q} index={i} />
        ))}
      </tbody>
    </table>
  );
}
