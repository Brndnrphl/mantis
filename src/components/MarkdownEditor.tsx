import { useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "highlight.js/styles/github.min.css";

export default function MarkdownEditor({
  markdown,
  setMarkdown,
}: {
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleMarkdown = (value: string) => {
    setMarkdown(value);
  };

  const options = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "code",
        "link",
        "image",
        "|",
        "preview",
      ],
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        markedOptions: {
          sanitize: true,
        },
      },
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      <SimpleMDE
        className="
        w-full
        prose
        max-w-none
        text-md mb-2 
        prose-indigo   
        prose-pre:rounded-lg
        prose-pre:p-4
        prose-code:font-normal"
        //@ts-ignore
        options={options}
        value={markdown}
        onChange={handleMarkdown}
      />
    </div>
  );
}
