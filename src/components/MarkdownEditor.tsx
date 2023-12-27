import { useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "highlight.js/styles/github.min.css";

export default function MarkdownEditor() {
  const options = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
    } as SimpleMDE.Options;
  }, []);

  return (
    <div className="prose max-w-none">
      <SimpleMDE className="w-full" options={options} />
    </div>
  );
}
