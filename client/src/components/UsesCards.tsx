import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

type UseItem = {
  name: string;
  badge: string;
  description: string;
  link?: string;
};

type Props = {
  title?: string;
  items: UseItem[];
};

function Card({ item }: { item: UseItem }) {
  return (
    <div className="group rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-card/60 transition-all duration-300 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60">
      <div className="p-3.5 sm:p-4 space-y-3">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 wrap-break-word">
            {item.name}
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="default">{item.badge}</Badge>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function UsesCards({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.name} item={item} />
      ))}
    </div>
  );
}
