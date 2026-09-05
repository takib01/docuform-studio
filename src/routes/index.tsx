import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, FileInput, ListChecks, FileDown, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/docufill/Page";
import { UploadCard } from "@/components/docufill/UploadCard";
import { Button } from "@/components/ui/button";
import type { UploadedFile } from "@/lib/docufill";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DocuFill — Turn Word documents into reusable forms" },
      {
        name: "description",
        content:
          "Upload an existing DOCX invoice, quotation or letter, fill only the values that change, and generate a new document without rebuilding your layout.",
      },
      { property: "og:title", content: "DocuFill — Reusable DOCX templates" },
      {
        property: "og:description",
        content:
          "Format-preserving DOCX template generator for small businesses. Upload, confirm fields, generate.",
      },
    ],
  }),
  component: LandingPage,
});

const STEPS: ReadonlyArray<{ title: string; body: string; icon: typeof FileInput }> = [
  {
    title: "Upload DOCX",
    body: "Bring the Word file you already send to customers. Nothing about it is rewritten.",
    icon: FileInput,
  },
  {
    title: "Confirm editable fields",
    body: "We find the values that change and you decide the label and type for each one.",
    icon: ListChecks,
  },
  {
    title: "Generate your document",
    body: "Fill the form and download a new DOCX or PDF with the original design intact.",
    icon: FileDown,
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function handleAnalyze(file: UploadedFile): void {
    setIsAnalyzing(true);
    window.setTimeout(() => {
      setIsAnalyzing(false);
      void navigate({ to: file.name.includes("template") ? "/fields" : "/prepare" });
    }, 900);
  }

  return (
    <PageShell>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
            Format-preserving · No document rebuilding
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Turn your Word documents into reusable forms.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Upload an existing DOCX, fill only the values that change, and generate a new document
            without rebuilding your layout.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/templates">
                See example templates
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/how-it-works">How it works</Link>
            </Button>
          </div>

          <section aria-labelledby="how-heading" className="mt-10">
            <h2 id="how-heading" className="font-display text-lg font-bold">
              How it works
            </h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.title} className="surface-card p-4">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="grid size-6 shrink-0 place-items-center rounded bg-primary-soft text-accent-foreground">
                      {index + 1}
                    </span>
                    Step {index + 1}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 font-display text-sm font-bold">
                    <step.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <UploadCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      </div>
    </PageShell>
  );
}
