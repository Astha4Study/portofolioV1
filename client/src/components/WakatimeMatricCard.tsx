export default function WakatimeMetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-neutral-500">{label}</p>
        <p className="text-base font-semibold tracking-tight text-neutral-950">
          {value}
        </p>
      </div>
    </div>
  );
}
