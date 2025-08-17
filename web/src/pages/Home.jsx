import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import Card from "../components/Card";

const API_BASE = import.meta.env.VITE_API_BASE  || "http://localhost:8080";

export default function Home() {
  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState(
    "Summarize in bullet points for executives. Include Action Items."
  );
  const [summary, setSummary] = useState("");
  const [summaryId, setSummaryId] = useState(null);
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef(null);
  const dropzoneRef = useRef(null);

  const onFile = async (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast("Warning: File size is larger than 2MB, may be slow.", {
        icon: "⚠️",
      });
    }
    try {
      const content = await file.text();
      setText(content);
    } catch {
      toast.error("Failed to read the file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropzoneRef.current?.classList.add(
      "bg-gray-50",
      "dark:bg-gray-700",
      "border-gray-500"
    );
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove(
      "bg-gray-50",
      "dark:bg-gray-700",
      "border-gray-500"
    );
  };
  const handleDrop = (e) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove(
      "bg-gray-50",
      "dark:bg-gray-700",
      "border-gray-500"
    );
    const file = e.dataTransfer.files[0];
    onFile(file);
  };

  const generate = async () => {
    if (!text.trim()) {
      toast.error("Please paste or upload a transcript first.");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Please enter a prompt/instruction.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error generating summary");
      setSummaryId(data.id);
      setSummary(data.summary);
      toast.success("Summary generated!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveEdits = async () => {
    if (!summaryId) {
      toast.error("No summary to save.");
      return;
    }
    setSaving(true);
    try {
      await fetch(`${API_BASE}/api/summaries/${summaryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary }),
      });
      toast.success("Edits saved successfully!");
    } catch {
      toast.error("Failed to save edits.");
    } finally {
      setSaving(false);
    }
  };

  const share = async () => {
    if (!summaryId) {
      toast.error("No summary to share yet.");
      return;
    }
    const recipients = emails
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    if (recipients.length === 0) {
      toast.error("Enter at least one email!");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: summaryId, recipients }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      toast.success("Summary sent via email!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8">
      <Card>
        <label
          htmlFor="transcript"
          className="block font-semibold mb-2 text-gray-900 dark:text-gray-100"
        >
          Transcript (paste or upload .txt)
        </label>
        <textarea
          id="transcript"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Paste the meeting or call transcript here..."
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 resize-none outline-none mb-4 overflow-y-auto"
        />
        <div
          ref={dropzoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-800 transition-colors mb-2"
          tabIndex={0}
        >
          <span className="text-base sm:text-lg text-gray-900 dark:text-gray-100 font-medium select-none">
            Drag &amp; drop a .txt file here or
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            className="block mx-auto"
            style={{ margin: "0 auto" }}
            onChange={(e) => onFile(e.target.files[0])}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 select-none">
            Max ~10KB recommended.
          </span>
        </div>
      </Card>

      <Card>
        <label
          htmlFor="prompt"
          className="block font-semibold mb-2 text-gray-900 dark:text-gray-100"
        >
          Custom Instruction / Prompt
        </label>
        <input
          id="prompt"
          type="text"
          value={prompt}
          autoComplete="off"
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 outline-none"
          placeholder="Enter prompt or instruction"
        />
      </Card>

      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={generate}
          disabled={loading}
          className="flex-1 min-w-[140px] bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow transition"
        >
          {loading ? "Processing..." : "✨ Generate Summary"}
        </button>
        <button
          onClick={() => {
            setText("");
            setPrompt(
              "Summarize in bullet points for executives. Include Action Items."
            );
            setSummary("");
            setSummaryId(null);
            setEmails("");
          }}
          className="flex-1 min-w-[140px] bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-3 rounded-xl shadow transition"
          type="button"
        >
          Clear
        </button>
      </div>

      {summary && (
        <>
          <Card>
            <label
              htmlFor="summary"
              className="block font-semibold mb-2 text-gray-900 dark:text-gray-100"
            >
              Summary (editable)
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={8}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 resize-y outline-none mb-4"
              placeholder="Generated summary will appear here and can be edited."
            />
            <button
              onClick={saveEdits}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl py-3 px-6 shadow transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "💾 Save Edits"}
            </button>
          </Card>

          <Card>
            <label
              htmlFor="emails"
              className="block font-semibold mb-2 text-gray-900 dark:text-gray-100"
            >
              Share via Email (comma-separated)
            </label>
            <input
              id="emails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="abc@gmail.com, xyz@gmail.com"
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 outline-none"
            />
            <button
              onClick={share}
              disabled={sending}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow transition disabled:opacity-50"
            >
              {sending ? "Sending..." : "📧 Send Summary"}
            </button>
          </Card>
        </>
      )}
    </main>
  );
}
