import type { ReactNode } from "react";

type CardShellProps = {
  imageUrl: string;
  imageAlt: string;
  children: ReactNode;
};

export default function CardShell({
  imageUrl,
  imageAlt,
  children,
}: CardShellProps) {
  return (
    <div className="group h-full flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-800/50 transition-all duration-300">
      {/* IMAGE */}
      <div className="h-44 sm:h-40 md:h-44 w-full bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        {children}
      </div>
    </div>
  );
}
