import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import parse from "html-react-parser";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github.min.css";

const NotePage = () => {
  const { noteId } = useParams();
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`);
      const fetchedNote = await response.json();
      if (fetchedNote.content) {
        const parsed = await marked.parse(fetchedNote.content);
        setMarkdown(parsed);
      }
      if (fetchedNote.title) {
        setTitle(fetchedNote.title);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (noteId) {
      fetchData(noteId);
    }
  }, [noteId]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
      />
    </div>
  ) : (
    <>
      <h1 className="font-bold text-3xl mb-4 border-b-[1px] border-b-gray-300 p-2">
        {title}
      </h1>
      <p
        className="
          text-md mb-2 
          prose
          prose-indigo   
          max-w-none
          prose-pre:rounded-lg
          prose-pre:bg-stone-100
          prose-code:font-normal
          "
      >
        {parse(markdown)}
      </p>
    </>
  );
};

export default NotePage;
