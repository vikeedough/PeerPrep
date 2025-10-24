"use client";

import Link from "next/link";
import LogoutButton from "../components/common/LogoutButton";

export default function ProblemsPage() {
  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold mb-4">Problem Database</h1>
        <LogoutButton />
      </div>
      <p className="text-gray-700 mb-6">
        Browse and solve coding problems, or find a partner to collaborate with.
      </p>

      <div className="space-y-3">
        <div className="border p-4 rounded-lg hover:bg-gray-50">
          <h2 className="font-semibold">Two Sum</h2>
          <p className="text-sm text-gray-600">Difficulty: Easy</p>
        </div>

        <div className="border p-4 rounded-lg hover:bg-gray-50">
          <h2 className="font-semibold">Add Two Numbers</h2>
          <p className="text-sm text-gray-600">Difficulty: Medium</p>
        </div>
      </div>

      <Link
        href="/room/abc123"
        className="inline-block mt-8 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Join Collaboration Room
      </Link>
    </main>
  );
}
