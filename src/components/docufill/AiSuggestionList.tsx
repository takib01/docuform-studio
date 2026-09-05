import { Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FIELD_TYPE_OPTIONS,
  type Confidence,
  type FieldType,
  type SuggestedField,
  isFieldType,
} from "@/lib/docufill";

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const CONFIDENCE_CLASS: Record<Confidence, string> = {
  high: "bg-success-soft text-success-foreground border-success/30",
  medium: "bg-warning-soft text-warning-foreground border-warning/30",
  low: "bg-secondary text-muted-foreground border-border-strong",
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${CONFIDENCE_CLASS[confidence]}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {CONFIDENCE_LABEL[confidence]} confidence
    </span>
  );
}

export interface AiSuggestionListProps {
  suggestions: ReadonlyArray<SuggestedField>;
  onToggle: (id: string, included: boolean) => void;
  onLabelChange: (id: string, label: string) => void;
  onTypeChange: (id: string, type: FieldType) => void;
}

export function AiSuggestionList({
  suggestions,
  onToggle,
  onLabelChange,
  onTypeChange,
}: AiSuggestionListProps) {
  return (
    <ul className="space-y-3">
      {suggestions.map((suggestion) => {
        const checkboxId = `include-${suggestion.id}`;
        const labelId = `ai-label-${suggestion.id}`;
        const typeId = `ai-type-${suggestion.id}`;
        return (
          <li
            key={suggestion.id}
            className={`surface-card p-4 transition-colors ${
              suggestion.included ? "border-primary/40 bg-surface" : "bg-surface-muted"
            }`}
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
              <Checkbox
                id={checkboxId}
                checked={suggestion.included}
                onCheckedChange={(checked) => onToggle(suggestion.id, checked === true)}
                className="mt-1"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Label htmlFor={checkboxId} className="text-sm font-semibold">
                    Include “{suggestion.label}”
                  </Label>
                  <span className="inline-flex items-center gap-1 rounded-full border border-info/30 bg-info-soft px-2 py-0.5 text-xs font-medium text-foreground">
                    <Sparkles className="size-3" aria-hidden="true" />
                    AI suggestion
                  </span>
                  <ConfidenceBadge confidence={suggestion.confidence} />
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Current document value:{" "}
                  <span className="font-medium text-foreground">{suggestion.currentValue}</span>
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="min-w-0">
                    <Label htmlFor={labelId} className="text-xs font-semibold uppercase">
                      Label
                    </Label>
                    <Input
                      id={labelId}
                      value={suggestion.label}
                      disabled={!suggestion.included}
                      onChange={(event) => onLabelChange(suggestion.id, event.target.value)}
                      className="mt-1.5"
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Key:{" "}
                      <code className="rounded bg-secondary px-1.5 py-0.5 font-mono">
                        {suggestion.key}
                      </code>
                    </p>
                  </div>
                  <div className="min-w-0">
                    <Label htmlFor={typeId} className="text-xs font-semibold uppercase">
                      Field type
                    </Label>
                    <Select
                      value={suggestion.type}
                      disabled={!suggestion.included}
                      onValueChange={(value) => {
                if (isFieldType(value)) onTypeChange(suggestion.id, value);
              }}
                    >
                      <SelectTrigger id={typeId} className="mt-1.5 w-full">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FIELD_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
