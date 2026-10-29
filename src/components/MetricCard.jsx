const MetricCard = ({ icon: Icon, label, value, hint }) => (
  <article className="rounded-2xl border border-line bg-surface p-4 shadow-card">
    <div className="flex items-center gap-2 text-ink-soft">
      <Icon size={15} strokeWidth={2.2} aria-hidden="true" />
      <h3 className="text-[10px] font-bold uppercase tracking-[0.14em]">
        {label}
      </h3>
    </div>
    <p className="mt-2.5 text-lg font-extrabold tracking-tight text-ink tabular-nums">
      {value}
    </p>
    {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
  </article>
);

export default MetricCard;
