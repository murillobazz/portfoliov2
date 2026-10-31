import { useEffect, useRef } from 'react';

// On scroll, the title holds on to the top of the screen and stretches upward:
// its box shrinks while the letters scale up from the bottom, so only their
// lower half stays in view. --stretch goes from 0 (top of the page) to 1.
export function PageTitle({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const naturalHeight = el.offsetWidth * 0.18; // viewBox is 1000 × 180
      const progress = Math.min(1, Math.max(0, window.scrollY / naturalHeight));
      el.style.setProperty('--stretch', progress.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="page-title" role="heading" aria-level="1">
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
