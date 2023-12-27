import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import hljs from 'highlight.js'; 

export default function MarkdownEditor() {
  return (
    <div className="prose prose-slate max-w-none">
      <SimpleMDE className="w-full" />
    </div>
  );
}
