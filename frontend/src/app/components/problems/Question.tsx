"use client";

import { Question } from "../../../../lib/mockApi";
import { useTheme } from "../../../../context/ThemeContext";

interface Props {
  question: Question;
  index: number;
}

export default function QuestionRow({ question, index }: Props) {
  const { theme } = useTheme();

  return (
    <tr
      key={question.id}
      className="border-b hover:bg-opacity-10 cursor-pointer"
      style={{ borderColor: theme.border }}
      onClick={() => console.log(`Clicked question ${question.id}`)} // optional
    >
      <td className="p-3">{index + 1}</td>
      <td className="p-3 font-medium text-blue-500 hover:underline">
        {question.name}
      </td>
      <td className="p-3 capitalize">{question.difficulty}</td>
      <td className="p-3">{question.acceptanceRate}%</td>
      <td className="p-3">{Array.isArray(question.dataStructures)
        ? question.dataStructures.join(", ")
        : question.dataStructure}
      </td>
      <td className="p-3">{question.topicType}</td>
    </tr>
  );
}
