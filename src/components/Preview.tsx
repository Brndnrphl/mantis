import { useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "highlight.js/styles/github.min.css";

export default function Preview({ markdown }: { markdown: string }) {
  const options = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      toolbar: false,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        markedOptions: {
          sanitize: true,
        },
      },
    } as SimpleMDE.Options
  }, []);

  return (
    <div
      className="
      prose
      prose-indigo   
      max-w-none
      prose-pre:rounded-lg
      prose-pre:p-4
      prose-code:font-normal
    "
    >
      <SimpleMDE
        className="w-full"
        //@ts-ignore
        options={options}
        value={markdown}
      />
    </div>
  );
}