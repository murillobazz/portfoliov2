export function PageTitle({ children }) {
  return (
    <div className="page-title" role="heading" aria-level="1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 180"
        width="100%"
        aria-hidden="true"
        focusable="false"
      >
        <text
          x="0"
          y="158"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          style={{ fontFamily: "'Gasoek One', sans-serif", fontSize: '160px' }}
          fill="currentColor"
        >
          {children}
        </text>
      </svg>
    </div>
  );
}
