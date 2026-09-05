import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { SiteHeader } from "./SiteHeader";

export interface FlowStep {
  label: string;
  to: string;
}

export const FLOW_STEPS: ReadonlyArray<FlowStep> = [
  { label: "Upload", to: "/" },
  { label: "Confirm fields", to: "/fields" },
  { label: "Fill values", to: "/fill" },
];

export function FlowBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Progress" className="mb-6 flex flex-wrap items-center gap-1 text-sm">
      {FLOW_STEPS.map((step, index) => {
        const isCurrent = step.label === current;
        return (
          <span key={step.to} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
            )}
            <Link
              to={step.to}
              aria-current={isCurrent ? "step" : undefined}
              className={
                isCurrent
                  ? "rounded-md bg-primary-soft px-2 py-1 font-semibold text-accent-foreground"
                  : "rounded-md px-2 py-1 text-muted-foreground hover:text-foreground"
              }
            >
              {step.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="flex items-center gap-2">
            <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
            Your original document stays unchanged.
          </p>
          <p>Guest files expire within 24 hours. DocuFill © 2026</p>
        </div>
      </footer>
    </div>
  );
}
