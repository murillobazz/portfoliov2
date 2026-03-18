export function Row({ label, children, delay = 0 }) {
  return (
    <div className="row" style={{ animationDelay: `${delay}ms` }}>
      <div className="row-label">{label}</div>
      <div className="row-content">{children}</div>
    </div>
  );
}