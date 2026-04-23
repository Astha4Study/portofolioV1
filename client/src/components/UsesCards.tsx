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
    <div className="group relative flex flex-col rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-card/60 transition-all duration-300 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60">
      <div className="p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.name}</p>

          <Badge variant="default">{item.badge}</Badge>
        </div>

        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 w-125">{item.description}</p>
      </div>

      {item.link && (
        <a href={item.link} target="_blank" rel="noreferrer" className="absolute bottom-4.5 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

export default function UsesCards({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((i) => (
        <Card key={i.name} item={i} />
      ))}
    </div>
  );
}
