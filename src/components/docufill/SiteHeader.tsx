import { Link } from "@tanstack/react-router";
import { FileStack } from "lucide-react";

const NAV_LINKS: ReadonlyArray<{ label: string; to: string }> = [
  { label: "How it works", to: "/how-it-works" },
  { label: "Templates", to: "/templates" },
  { label: "Sign in", to: "/sign-in" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 rounded-md text-foreground"
          aria-label="DocuFill home"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <FileStack className="size-5" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-lg font-extrabold tracking-tight">
            DocuFill
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:px-3"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
