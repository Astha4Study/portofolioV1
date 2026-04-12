import { MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DockMessage() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 px-4">
      <div className="pointer-events-auto flex h-14.5 w-14.5 items-center justify-center rounded-full border border-neutral-200/80 bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl">
        <button
          type="button"
          aria-label="Message me"
          onClick={() => {
            window.location.href = "/message-me";
          }}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full",
          )}
        >
          <MessageCircle className="size-4" />
        </button>
      </div>
    </div>
  );
}
