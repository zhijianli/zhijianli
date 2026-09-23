import { Fragment, type ReactNode } from "react";

function parseNodes(text: string, keyPrefix = ""): ReactNode {
  const parts: ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < text.length) {
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        const inner = text.slice(i + 2, end);
        parts.push(
          <strong key={`${keyPrefix}b${key++}`}>
            {parseNodes(inner, `${keyPrefix}b${key}-`)}
          </strong>
        );
        i = end + 2;
        continue;
      }
    }

    const linkMatch = text.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={`${keyPrefix}l${key++}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {parseNodes(linkMatch[1], `${keyPrefix}l${key}-`)}
        </a>
      );
      i += linkMatch[0].length;
      continue;
    }

    const nextBold = text.indexOf("**", i);
    const nextLink = text.indexOf("[", i);
    let next = text.length;
    if (nextBold !== -1) next = Math.min(next, nextBold);
    if (nextLink !== -1) next = Math.min(next, nextLink);

    if (next > i) {
      parts.push(text.slice(i, next));
      i = next;
      continue;
    }

    parts.push(text[i]);
    i += 1;
  }

  if (parts.length === 0) return text;
  if (parts.length === 1) return parts[0];
  return <Fragment>{parts}</Fragment>;
}

export function renderRichText(text: string): ReactNode {
  return parseNodes(text);
}
