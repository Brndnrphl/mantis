import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { ColorRing } from "react-loader-spinner";
import parse from "html-react-parser";

const NotePage = () => {
  const { noteId } = useParams();
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`);
      const fetchedNote = await response.json();
      setMarkdown(fetchedNote.content);
      setTitle(fetchedNote.title);
      console.log("djwada");
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(noteId);
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
          prose-pre:p-4
          prose-code:font-normal"
      >
        {parse(marked(markdown))}
      </p>
    </>
  );
};

export default NotePage;
