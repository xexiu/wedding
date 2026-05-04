"use client";

type Props = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CarouselDots({ count, activeIndex, onSelect }: Props) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          aria-label={`Slide ${index + 1}`}
          onClick={() => onSelect(index)}
          style={{
            borderRadius: "var(--theme-button-radius)",
            backgroundColor: index === activeIndex ? "var(--theme-button-bg)" : "var(--theme-secondary)",
            color: "var(--theme-button-text)"
          }}
          className="h-3 min-h-10 w-12 sm:h-2.5 sm:min-h-0 sm:w-10"
        />
      ))}
    </div>
  );
}
