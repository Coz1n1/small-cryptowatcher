import { useState, useRef, type UIEvent } from "react";

export function useActiveIndex(cardWidth: number, gap: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(newIndex);
  };

  const scrollBy = (offset: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  return { ref, activeIndex, onScroll, scrollBy };
}
