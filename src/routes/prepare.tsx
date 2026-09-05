import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, Braces, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { FlowBreadcrumb, PageShell } from "@/components/docufill/Page";
import { DocumentPreview } from "@/components/docufill/DocumentPreview";
import { LayoutWarning } from "@/components/docufill/LayoutWarning";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/prepare")({
  head: () => ({
    meta: [
      { title: "No prepared fields found — DocuFill" },
      {
        name: "description",
        content:
          "Your DOCX has no {{placeholders}}. Prepare it manually in Word or let AI suggest the values that commonly change — you confirm everything.",
      },
      { property: "og:title", content: "No prepared fields found — DocuFill" },
      {
        property: "og:description",
        content: "Choose deterministic placeholders or AI-assisted field suggestions.",
      },
    ],
  }),
  component: PreparePage,
});

const EXAMPLES: ReadonlyArray<string> = [
  "invoice number",
  "invoice date",
  "buyer name",
  "quantity",
  "unit price",
  "total amount",
];

function PreparePage() {
  const navigate = useNavigate();
  const [isDetecting, setIsDetecting] = useState(false);

  function autoDetect(): void {
    setIsDetecting(true);
    window.setTimeout(() => {
      setIsDetecting(false);
      void navigate({ to: "/review" });
    }, 1100);
  }

  return (
    <PageShell>
      <FlowBreadcrumb current="Confirm fields" />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <DocumentPreview
          fileName="commercial-invoice-june.docx"
          mode="filled"
          caption="Your filled invoice, exactly as uploaded. Nothing has been changed."
        />

        <section aria-labelledby="no-fields-heading">
          <h1 id="no-fields-heading" className="font-display text-2xl font-extrabold">
            No prepared fields found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            This document does not contain {"{{placeholders}}"}. You can prepare it manually or ask
            AI to suggest values that commonly change.
          </p>

          <div className="mt-5 space-y-3">
            <article className="surface-card p-4">
              <h2 className="flex items-center gap-2 font-display text-base font-bold">
                <Braces className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                Use placeholders instead
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Open the document in Word and replace changing values with keys like{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
                  {"{{invoice_number}}"}
                </code>
                . This is fully deterministic: DocuFill replaces only the exact text you marked.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild variant="outline">
                  <Link to="/">Upload prepared document</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/how-it-works">
                    <BookOpen className="size-4" aria-hidden="true" />
                    Read the 2-minute guide
                  </Link>
                </Button>
              </div>
            </article>

            <article className="surface-card border-primary/40 p-4">
              <h2 className="flex items-center gap-2 font-display text-base font-bold">
                <Sparkles className="size-4 shrink-0 text-primary" aria-hidden="true" />
                Auto-detect fields
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                AI reads the document text and proposes fields for the values that usually change.
                Suggestions arrive as a review list — nothing is applied for you.
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Typical suggestions">
                {EXAMPLES.map((example) => (
                  <li
                    key={example}
                    className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {example}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Button onClick={autoDetect} disabled={isDetecting}>
                  {isDetecting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Reading document…
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" aria-hidden="true" />
                      Auto-detect fields
                    </>
                  )}
                </Button>
              </div>
            </article>
          </div>

          <div className="mt-4 space-y-3">
            <LayoutWarning
              tone="info"
              title="AI only suggests fields. Nothing in your document changes until you review and confirm."
            />
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
              Guest uploads are deleted automatically within 24 hours.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
