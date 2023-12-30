import React from "react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import MarkdownEditor from "./components/MarkdownEditor";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

export default function NewNote() {
  const [markdown, setMarkdown] = useState<string>("");
  const [title, setTitle] = useState("");
  const [, setSubmitStatus] = useState(Boolean);
  const [loading, isLoading] = useState(false);
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    const response = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, value: markdown, userId: user?.sub }),
    });
    if (response.ok) {
      setSubmitStatus(true);
      setTitle("");
      setMarkdown("");
      isLoading(false);
      navigate("/dashboard");
    } else {
      setSubmitStatus(false);
    }
  };

  return (
    <div className="font-inter items-center justify-center">
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
        <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
        <button
          type="submit"
          className={
            "bg-black text-white p-2 font-medium flex flex-row items-center justify-center rounded hover:bg-neutral-800 transition-all ease-in-out w-full"
          }
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
            />
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
