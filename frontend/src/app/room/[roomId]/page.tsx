type Props = {
  params: Promise<{ roomId: string }> | { roomId: string };
};

export default async function RoomPage({ params }: Props) {
  const { roomId } = await params;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Collaboration Room</h1>
      <p className="text-gray-700 mb-4">
        You are in room: <span className="font-mono">{roomId}</span>
      </p>

      <div className="grid grid-cols-2 gap-6">
        <section className="border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Problem</h2>
          <p className="text-sm text-gray-600">
            Implement a function that reverses a linked list.
          </p>
        </section>

        <section className="border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Editor</h2>
          <textarea
            placeholder="Write your code here..."
            className="w-full h-64 border rounded-lg p-2 font-mono"
          />
        </section>
      </div>
    </main>
  );
}