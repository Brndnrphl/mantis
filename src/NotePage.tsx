import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNotes } from "./NoteContext";
import { marked } from "marked";
import { ColorRing } from "react-loader-spinner";

const NotePage = () => {
  const { noteId } = useParams();
  const { note, fetchNote } = useNotes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoteData = async () => {
      await fetchNote(noteId);
      setLoading(false);
    };
    fetchNoteData();
  }, [noteId, fetchNote]);

  return loading ? (
    <div>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
      />
    </div>
  ) : (
    <>
      <h1 className="font-bold text-3xl mb-4 border-b-[1px] border-b-gray-300 p-2">
        {note?.title}
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: note?.content }}
      />
    </>
  );
};

export default NotePage;

// return isLoading ? (
//   <>
//     <ColorRing
//       visible={true}
//       height="80"
//       width="80"
//       ariaLabel="blocks-loading"
//       wrapperStyle={{}}
//       wrapperClass="blocks-wrapper"
//       colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
//     />
//   </>
// ) : (
//   <>
//     <h1 className="font-bold text-3xl mb-4 border-b-[1px] border-b-gray-300 p-2">
//       {note?.title}
//     </h1>
//     <p
//       className="
//         text-md mb-2
//         prose
//         prose-indigo
//         max-w-none
//         prose-pre:rounded-lg
//         prose-pre:p-4
//         prose-code:font-normal"
//       // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
//       dangerouslySetInnerHTML={{ __html: markdown }}
//     />
//   </>
// );
