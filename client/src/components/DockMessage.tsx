import { MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DockMessage() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 px-4">
      <div
        className={cn(
          "pointer-events-auto flex h-14.5 w-14.5 items-center justify-center rounded-full p-2 backdrop-blur-xl",

          // ✅ DARK MODE FIX (container)
          "border border-neutral-200/80 dark:border-neutral-800/80",
          "bg-white/90 dark:bg-neutral-900/90",
          "shadow-[0_12px_30px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
        )}
      >
        <button
          type="button"
          aria-label="Message me"
          onClick={() => {
            window.location.href = "/message-me";
          }}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full",

            // ✅ override biar gak putih
            "bg-transparent",
            "hover:bg-neutral-200/60",
            "dark:hover:bg-neutral-800/60",

            "focus:bg-transparent",
            "focus-visible:bg-transparent",

            // hilangkan ring putih
            "focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        >
          <MessageCircle className="size-4" />
        </button>
      </div>
    </div>
  );
}
