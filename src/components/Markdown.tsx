import { useMemo } from "react";

interface MarkdownProps {
  content: string;
}

/**
 * Simple markdown to HTML renderer
 * Supports: headings, bold, italic, lists, code, links, paragraphs
 */
export function Markdown({ content }: MarkdownProps) {
  const html = useMemo(() => {
    let result = content;

    // Headings
    result = result.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
    result = result.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
    result = result.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

    // Bold and italic
    result = result.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    result = result.replace(/\*(.*?)\*/g, "<em>$1</em>");
    result = result.replace(/__(.*?)__/g, "<strong>$1</strong>");
    result = result.replace(/_(.*?)_/g, "<em>$1</em>");

    // Inline code
    result = result.replace(/`(.*?)`/g, "<code>$1</code>");

    // Links
    result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Lists (simple)
    result = result.replace(/^- (.*?)$/gm, "<li>$1</li>");
    result = result.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

    // Paragraphs
    const lines = result.split("\n");
    result = lines
      .map((line) => {
        if (
          line.match(/^<[uh]/) ||
          line.match(/^<h[123]>/) ||
          line.match(/^<li>/) ||
          line.trim() === ""
        ) {
          return line;
        }
        return `<p>${line}</p>`;
      })
      .join("\n");

    // Remove extra paragraph wrappers from headings/lists
    result = result.replace(/<p>(<h[123]>.*?<\/h[123]>)<\/p>/g, "$1");
    result = result.replace(/<p>(<ul>.*?<\/ul>)<\/p>/gs, "$1");

    return result;
  }, [content]);

  return (
    <div
      className="space-y-4"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
