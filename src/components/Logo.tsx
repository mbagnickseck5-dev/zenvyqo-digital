export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <defs>
          <linearGradient id="zq" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00C2FF" />
            <stop offset="1" stopColor="#0066FF" />
          </linearGradient>
        </defs>
        <path d="M6 5h23L14 24h15l-3 5H4l15-19H9z" fill="url(#zq)" />
      </svg>
      {/* Texte en casse normale, mis en capitales par CSS : les lecteurs d'écran lisent « Zenvyqo Digital ». */}
      <span className="flex flex-col uppercase leading-none">
        <span className="font-display text-lg font-extrabold tracking-[0.08em]">Zenvyqo</span>
        <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.42em] text-cyan">
          <span className="sr-only"> </span>Digital
        </span>
      </span>
    </span>
  );
}
