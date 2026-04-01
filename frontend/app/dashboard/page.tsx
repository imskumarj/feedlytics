export default function Dashboard() {
  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Total Feedback</p>
          <p className="text-xl font-semibold">--</p>
        </div>

        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Avg Rating</p>
          <p className="text-xl font-semibold">--</p>
        </div>

        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Recent</p>
          <p className="text-xl font-semibold">--</p>
        </div>
      </div>

      <p className="mt-6 text-gray-500">
        Analytics API coming next...
      </p>
    </div>
  );
}