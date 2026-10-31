// Inline markup for case copy: **bold**, *italic*, `code` and [label](url)
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/;

function renderToken(token, key) {
  if (token.startsWith('**')) return <strong key={key}>{token.slice(2, -2)}</strong>;
  if (token.startsWith('*')) return <em key={key}>{token.slice(1, -1)}</em>;
  if (token.startsWith('`')) return <code key={key}>{token.slice(1, -1)}</code>;
  const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
  );
}

export function RichText({ text }) {
  // split() with a capture group alternates plain text (even) and tokens (odd)
  return text
    .split(TOKEN)
    .map((part, i) => (i % 2 ? renderToken(part, i) : part && <span key={i}>{part}</span>));
}
