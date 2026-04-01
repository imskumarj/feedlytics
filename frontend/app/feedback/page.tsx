"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed");

      setSuccess("Feedback submitted successfully!");
      setForm({ name: "", email: "", message: "", rating: 5 });
    } catch (err) {
      setSuccess("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold">Submit Feedback</h2>

      <input
        placeholder="Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        type="email"
        className="w-full border p-2 rounded"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <textarea
        placeholder="Message"
        required
        className="w-full border p-2 rounded"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      <select
        className="w-full border p-2 rounded"
        value={form.rating}
        onChange={(e) =>
          setForm({ ...form, rating: Number(e.target.value) })
        }
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {success && (
        <p className="text-sm text-center">{success}</p>
      )}
    </form>
  );
}