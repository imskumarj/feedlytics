import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold">Feedlytics</h1>
      <p className="text-gray-600">
        Turn feedback into actionable insights.
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/feedback"
          className="px-6 py-2 bg-black text-white rounded-lg"
        >
          Give Feedback
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-2 border rounded-lg"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}