export default function WakatimeMetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm transition-colors duration-200">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 transition-colors duration-200">
          {label}
        </p>
        <p className="text-base font-semibold tracking-tight text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
          {value}
        </p>
      </div>
    </div>
  );
}
