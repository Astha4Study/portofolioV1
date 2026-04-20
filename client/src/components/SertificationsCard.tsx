import { Badge } from "./ui/badge";

type SertificationsCardProps = {
  imageUrl: string;
  title: string;
  date: string;
  grade?: string;
  partner: string;
};

export default function SertificationsCard({
  imageUrl,
  title,
  date,
  grade,
  partner,
}: SertificationsCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/50 shadow-sm transition-all duration-300 hover:shadow-lg dark:hover:shadow-neutral-800/50">
      <div className="grid grid-cols-1 sm:grid-cols-[170px_minmax(0,1fr)]">
        <div className="relative min-h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <div className="absolute inset-0 bg-linear-to-br from-neutral-900/0 via-neutral-900/0 to-neutral-900/10 dark:to-neutral-900/20" />
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 p-4 sm:p-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-between">
              <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                {date}
              </p>
              <Badge variant={"default"}>
                {partner}
              </Badge>
            </div>

            <h3 className="text-base font-semibold leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-1">
              {title}
            </h3>

            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">
              Sertifikat ini menunjukkan pencapaian dan konsistensi pada bidang
              yang dipelajari.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={"default"}>
              {grade ?? "Verified"}
            </Badge>
            <span className="inline-flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
              View certificate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
