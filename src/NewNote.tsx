import React from "react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import MarkdownEditor from "./components/MarkdownEditor";

export default function NewNote() {
  const [markdown, setMarkdown] = useState("# TEST");
  const [title, setTitle] = useState("");
  const [submitStatus, setSubmitStatus] = useState(Boolean);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, value: markdown }),
    });
    if (response.ok) {
      setSubmitStatus(true);
      setTitle("");
      setMarkdown(""); // Set markdown to an empty string after the fetch request is completed
    } else {
      setSubmitStatus(false);
    }
  };

  return (
    <div className="font-inter w-6/12 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col"
        autoComplete="off"
      >
        <h1 className="font-bold text-3xl mb-4">New Note</h1>
        <label htmlFor="title" className="mb-2 text-lg">
          Title
        </label>
        <input
          name="title"
          type="text"
          placeholder="note title"
          value={title}
          onChange={handleTitle}
          className="mb-4 p-2 rounded border-2 border-gray-300 outline-none focus:border-gray-400"
        />
        <label htmlFor="note" className="mb-2 text-lg">
          Note
        </label>
        {/* <textarea
					value={value}
					onChange={handleInput}
					name="note"
					placeholder="note content"
					className="h-64 p-2 mb-4 rounded border-2 border-gray-300 resize-none outline-none focus:border-gray-400"
				/> */}
        <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
        <button
          type="submit"
          className={`bg-black text-white p-2 font-medium flex flex-row items-center justify-center rounded hover:bg-neutral-800 transition-all ${
            submitStatus ? "bg-green-500 font-bold hover:bg-green-400" : ""
          }`}
        >
          {submitStatus ? (
            "Note Successfully Added!"
          ) : (
            <>
              <FaSave className="mr-2" /> Save Note
            </>
          )}
        </button>
      </form>
    </div>
  );
}
