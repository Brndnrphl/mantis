import React from "react";
import "@mdxeditor/editor/style.css";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { listsPlugin } from "@mdxeditor/editor/plugins/lists";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { quotePlugin } from "@mdxeditor/editor/plugins/quote";
import { thematicBreakPlugin } from "@mdxeditor/editor/plugins/thematic-break";
import { diffSourcePlugin } from "@mdxeditor/editor/plugins/diff-source";
import { UndoRedo } from "@mdxeditor/editor/plugins/toolbar/components/UndoRedo";

type MarkdownEditorProps = {
	markdown: string;
	setMarkdown: React.Dispatch<React.SetStateAction<string>>;
};

const markdownEditor = ({ markdown, setMarkdown }: MarkdownEditorProps) => {
	return (
		<MDXEditor
			markdown={markdown}
			onChange={(value) => {
				setMarkdown(value);
			}}
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				diffSourcePlugin({
					diffMarkdown: "An older version",
					viewMode: "rich-text",
				}),
				toolbarPlugin({
					toolbarContents: () => (
						<>
							{" "}
							<UndoRedo />
							<BoldItalicUnderlineToggles />
						</>
					),
				}),
			]}
		/>
	);
};

export default markdownEditor;
