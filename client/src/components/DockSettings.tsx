import { useEffect, useRef, useState } from "react";
import { Languages, Settings, SunMoon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DockSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!settingsRef.current) return;
      if (!settingsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-50 px-4">
      <div
        ref={settingsRef}
        className={cn(
          "pointer-events-auto flex w-14.5 flex-col items-center overflow-hidden rounded-full border border-neutral-200/80 bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-all duration-300 ease-out",
          isOpen ? "h-35" : "h-14.5",
        )}
      >
        <div
          className={cn(
            "flex w-full flex-1 flex-col items-center justify-end overflow-hidden transition-all duration-300 ease-out",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          <div className="flex w-full flex-col items-center gap-0">
            <button
              type="button"
              aria-label="Theme"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 rounded-full",
              )}
            >
              <SunMoon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Language"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 rounded-full",
              )}
            >
              <Languages className="size-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Settings"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full transition-transform duration-300",
          )}
        >
          <Settings
            className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")}
          />
        </button>
      </div>
    </div>
  );
}
