const PHRASES = [
  "לעסקים יש שולחן אחד",
  "★",
  "BUSINESS TABLE",
  "★",
  "הלוח מתחלף כל יום ראשון",
  "★",
];

export function Ticker() {
  const items = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-charcoal py-5" dir="ltr">
      <div className="ticker-track items-center gap-8">
        {items.map((phrase, i) => (
          <span
            key={i}
            dir="rtl"
            className={`shrink-0 whitespace-nowrap font-display text-4xl leading-none sm:text-5xl ${
              phrase === "★"
                ? "ticker-solid text-2xl sm:text-3xl"
                : i % 4 === 2
                  ? "ticker-solid"
                  : "ticker-outline"
            }`}
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
