const Block = ({ className = "" }) => (
  <div className={`animate-pulse rounded-2xl bg-slate-200/70 ${className}`} />
);

const DashboardSkeleton = () => (
  <div role="status" aria-busy="true" aria-live="polite" className="space-y-6">
    <span className="sr-only">Loading weather…</span>

    <div className="grid gap-6 lg:grid-cols-12">
      <div className="min-h-[24rem] rounded-[2rem] border border-line bg-surface p-6 shadow-card lg:col-span-7">
        <Block className="h-6 w-36 rounded-full" />
        <Block className="mt-7 h-6 w-48" />
        <Block className="mt-3 h-4 w-32" />
        <Block className="mt-9 h-24 w-44" />
        <div className="mt-8 flex gap-3">
          <Block className="h-8 w-28 rounded-full" />
          <Block className="h-8 w-28 rounded-full" />
        </div>
      </div>

      <div className="space-y-6 lg:col-span-5">
        <div className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-card">
          <div className="flex gap-4">
            <Block className="size-14 shrink-0" />
            <div className="flex-1 space-y-3">
              <Block className="h-4 w-24" />
              <Block className="h-4 w-full" />
              <Block className="h-4 w-4/5" />
            </div>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-card">
          <Block className="h-4 w-16" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Block className="h-20" />
            <Block className="h-20" />
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-line bg-surface p-4 shadow-card"
        >
          <Block className="h-3 w-20" />
          <Block className="mt-3 h-6 w-16" />
          <Block className="mt-2 h-3 w-24" />
        </div>
      ))}
    </div>

    <div>
      <Block className="h-6 w-36" />
      <div className="mt-3 flex gap-2.5 overflow-hidden">
        {Array.from({ length: 8 }, (_, index) => (
          <Block key={index} className="h-36 min-w-[5.25rem]" />
        ))}
      </div>
    </div>

    <div className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-card">
      <Block className="h-6 w-32" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: 7 }, (_, index) => (
          <Block key={index} className="h-8 w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;
