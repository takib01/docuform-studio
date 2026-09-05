import { AlertTriangle, Info, CircleAlert } from "lucide-react";

export type WarningTone = "warning" | "error" | "info";

export interface LayoutWarningProps {
  title: string;
  description?: string;
  tone?: WarningTone;
}

const TONE_CLASSES: Record<WarningTone, string> = {
  warning: "border-warning/30 bg-warning-soft text-warning-foreground",
  error: "border-destructive/30 bg-destructive/8 text-destructive",
  info: "border-border-strong bg-info-soft text-foreground",
};

export function LayoutWarning({ title, description, tone = "warning" }: LayoutWarningProps) {
  const Icon = tone === "error" ? CircleAlert : tone === "info" ? Info : AlertTriangle;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex gap-3 rounded-md border p-3 text-sm ${TONE_CLASSES[tone]}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        {description && <p className="mt-1 opacity-90">{description}</p>}
      </div>
    </div>
  );
}
