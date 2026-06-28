import { useEffect, useRef, useState } from "react";

interface LineGutterProps {
  contentRef: React.RefObject<HTMLElement | null>;
}

const LINE_HEIGHT = 28;

export function LineGutter({ contentRef }: LineGutterProps) {
  const [lineCount, setLineCount] = useState(300);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // const recalc = () => {
    //   const contentHeight = content.scrollHeight;
    //   setLineCount(Math.ceil(contentHeight / LINE_HEIGHT));
    // };

    // recalc();

    // const observer = new ResizeObserver(recalc);
    // observer.observe(content);

    // return () => observer.disconnect();
  }, [contentRef, lineCount]);

  return (
    <div
      ref={gutterRef}
      aria-hidden="true"
      className="block shrink-0 w-12 line-numbers text-xs select-none pt-10 pr-3 text-right border-r border-bg-border/40"
      style={{ lineHeight: `${LINE_HEIGHT}px` }}
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}
