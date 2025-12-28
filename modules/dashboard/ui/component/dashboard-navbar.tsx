"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import DashboardCommand from "./dashboard-command";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function DashboardNavbar() {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  // Handle keyboard shortcut for opening command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((val) => !val);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="h-16 w-full bg-white border-b border-border flex items-center px-4">
        <Button variant="outline" className="size-9" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((val) => !val)}
          className="h-9 w-60 justify-start font-normal text-muted-foreground hover:text-muted-foreground/80 ml-4"
        >
          <SearchIcon />
          <span className="ml-2">Search...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center grp-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}
