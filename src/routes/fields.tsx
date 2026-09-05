import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { FlowBreadcrumb, PageShell } from "@/components/docufill/Page";
import { DocumentPreview } from "@/components/docufill/DocumentPreview";
import { FieldEditor } from "@/components/docufill/FieldEditor";
import { LayoutWarning } from "@/components/docufill/LayoutWarning";
import { Button } from "@/components/ui/button";
import {
  DETECTED_FIELDS,
  MOCK_FILE,
  formatFileSize,
  type DetectedField,
  type FieldType,
} from "@/lib/docufill";

export const Route = createFileRoute("/fields")({
  head: () => ({
    meta: [
      { title: "Confirm detected fields — DocuFill" },
      {
        name: "description",
        content:
          "Review the {{placeholders}} DocuFill found in your DOCX, set a label and field type for each, then continue to fill values.",
      },
      { property: "og:title", content: "Confirm detected fields — DocuFill" },
      {
        property: "og:description",
        content: "Deterministic placeholder detection with full control over labels and types.",
      },
    ],
  }),
  component: FieldsPage,
});

function FieldsPage() {
  const [fields, setFields] = useState<ReadonlyArray<DetectedField>>([
    ...DETECTED_FIELDS,
    {
      id: "f4",
      label: "Customer Name",
      key: "Customer Name",
      type: "text",
      occurrences: 1,
      invalidPlaceholder: "{{Customer Name}}",
    },
  ]);

  const valid = fields.filter((field) => !field.invalidPlaceholder);

  function updateLabel(id: string, label: string): void {
    setFields((current) =>
      current.map((field) => (field.id === id ? { ...field, label } : field)),
    );
  }

  function updateType(id: string, type: FieldType): void {
    setFields((current) => current.map((field) => (field.id === id ? { ...field, type } : field)));
  }

  return (
    <PageShell>
      <FlowBreadcrumb current="Confirm fields" />

      <div
        role="status"
        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-success/30 bg-success-soft p-3 sm:p-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {MOCK_FILE.name} · Document ready
            </p>
            <p className="text-sm text-success-foreground/85">
              {valid.length} fields detected · {formatFileSize(MOCK_FILE.sizeBytes)}
            </p>
          </div>
        </div>
        <p className="hidden shrink-0 items-center gap-1.5 text-xs text-success-foreground/85 sm:flex">
          <Clock className="size-3.5" aria-hidden="true" />
          Guest file expires in 24 hours
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
        <DocumentPreview
          fileName={MOCK_FILE.name}
          mode="placeholders"
          caption="Highlighted spots are the only locations DocuFill will replace."
        />

        <section aria-labelledby="detected-heading">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 id="detected-heading" className="font-display text-lg font-bold">
              Detected fields
            </h2>
            <p className="text-sm text-muted-foreground">
              Found by exact {"{{placeholder}}"} match — no guessing
            </p>
          </div>

          <ul className="mt-4 space-y-3">
            {fields.map((field) => (
              <FieldEditor
                key={field.id}
                field={field}
                onLabelChange={updateLabel}
                onTypeChange={updateType}
              />
            ))}
          </ul>

          <div className="mt-4">
            <LayoutWarning
              tone="info"
              title="Text, images, stamps and signatures stay exactly as they are."
              description="DocuFill only swaps placeholder values. It never moves or resizes anything in your document."
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link to="/">Upload another document</Link>
            </Button>
            <Button asChild>
              <Link to="/fill">
                Continue to fill values
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
