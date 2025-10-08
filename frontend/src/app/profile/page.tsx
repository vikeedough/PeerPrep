"use client";

export default function ProfilePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <section className="bg-white p-6 rounded-xl shadow-md max-w-md">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>

        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Log Out
        </button>
      </section>
    </main>
  );
}
