function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function renderMarkdown(markdown: string) {
  const lines = markdown.trim().split("\n");
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;

  const flushList = () => {
    if (listItems.length) {
      nodes.push(
        <ul key={`ul-${nodes.length}`}>
          {listItems.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const flushCode = () => {
    if (codeLines.length) {
      nodes.push(
        <pre key={`pre-${nodes.length}`}>
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      codeLines = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        flushList();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    if (!line.trim()) {
      flushList();
      return;
    }

    if (line.startsWith("### ")) {
      flushList();
      nodes.push(<h3 key={`h3-${nodes.length}`}>{renderInline(line.slice(4))}</h3>);
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      nodes.push(<h2 key={`h2-${nodes.length}`}>{renderInline(line.slice(3))}</h2>);
      return;
    }

    if (line.startsWith("# ")) {
      flushList();
      nodes.push(<h1 key={`h1-${nodes.length}`}>{renderInline(line.slice(2))}</h1>);
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList();
    nodes.push(<p key={`p-${nodes.length}`}>{renderInline(line)}</p>);
  });

  flushList();
  flushCode();

  return nodes;
}
