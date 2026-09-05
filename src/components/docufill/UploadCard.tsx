import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { UploadCloud, FileText, X, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize, type UploadedFile } from "@/lib/docufill";
import { LayoutWarning } from "./LayoutWarning";

export interface UploadCardProps {
  onAnalyze: (file: UploadedFile) => void;
  isAnalyzing?: boolean;
}

const MAX_BYTES = 10 * 1024 * 1024;

export function UploadCard({ onAnalyze, isAnalyzing = false }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function accept(candidate: File | undefined): void {
    if (!candidate) return;
    if (!candidate.name.toLowerCase().endsWith(".docx")) {
      setError("That file is not a DOCX. Export your document as .docx and try again.");
      setFile(null);
      return;
    }
    if (candidate.size > MAX_BYTES) {
      setError("That file is larger than 10 MB.");
      setFile(null);
      return;
    }
    setError(null);
    setFile({ name: candidate.name, sizeBytes: candidate.size });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragging(false);
    accept(event.dataTransfer.files[0]);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    accept(event.target.files?.[0]);
  }

  return (
    <section className="surface-card p-4 sm:p-6" aria-labelledby="upload-heading">
      <h2 id="upload-heading" className="font-display text-lg font-bold">
        Upload your Word document
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        DOCX only · Maximum 10 MB · Guest files expire within 24 hours
      </p>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`mt-4 rounded-lg border-2 border-dashed p-6 text-center transition-colors sm:p-8 ${
          isDragging ? "border-primary bg-primary-soft" : "border-border-strong bg-surface-muted"
        }`}
      >
        <span className="mx-auto grid size-11 place-items-center rounded-md bg-surface text-primary shadow-card">
          <UploadCloud className="size-5" aria-hidden="true" />
        </span>
        <p className="mt-3 text-sm font-medium">Drag and drop your DOCX here</p>
        <p className="mt-1 text-sm text-muted-foreground">or pick it from your computer</p>
        <div className="mt-4">
          <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
            <FileText className="size-4" aria-hidden="true" />
            Choose DOCX file
          </Button>
        </div>
        <label className="sr-only" htmlFor="docx-input">
          Choose a DOCX file
        </label>
        <input
          id="docx-input"
          ref={inputRef}
          type="file"
          accept=".docx"
          className="sr-only"
          onChange={handleChange}
        />
      </div>

      {error && <div className="mt-4">{<LayoutWarning tone="error" title={error} />}</div>}

      {file && (
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-surface-muted p-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-surface text-muted-foreground">
              <FileText className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{file.name}</span>
              <span className="block text-xs text-muted-foreground">
                {formatFileSize(file.sizeBytes)}
              </span>
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Remove ${file.name}`}
            className="min-h-11 min-w-11 shrink-0"
            onClick={() => setFile(null)}
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          size="lg"
          disabled={!file || isAnalyzing}
          onClick={() => file && onAnalyze(file)}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Analyzing document…
            </>
          ) : (
            "Upload and analyze document"
          )}
        </Button>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
          Your original document stays unchanged.
        </p>
      </div>
    </section>
  );
}
