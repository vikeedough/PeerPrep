"use client";

import { Question } from "../../../../lib/mockApi";
import { useTheme } from "../../../../context/ThemeContext";

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
          <tr
            key={q.id}
            className="border-b hover:bg-opacity-10"
            style={{ borderColor: theme.border }}
          >
            <td className="p-3">{i + 1}</td>
            <td className="p-3 font-medium">{q.name}</td>
            <td className="p-3 capitalize">{q.difficulty}</td>
            <td className="p-3">{q.acceptanceRate}%</td>
            <td className="p-3">{q.dataStructure}</td>
            <td className="p-3">{q.topicType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
