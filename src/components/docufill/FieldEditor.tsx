import { Hash, Repeat } from "lucide-react";
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
  isFieldType,
  type DetectedField,
  type FieldType,
} from "@/lib/docufill";
} from "@/lib/docufill";
import { LayoutWarning } from "./LayoutWarning";

export interface FieldEditorProps {
  field: DetectedField;
  onLabelChange: (id: string, label: string) => void;
  onTypeChange: (id: string, type: FieldType) => void;
}

export function FieldEditor({ field, onLabelChange, onTypeChange }: FieldEditorProps) {
  const labelId = `label-${field.id}`;
  const typeId = `type-${field.id}`;

  return (
    <li className="surface-card p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <Label htmlFor={labelId} className="text-xs font-semibold uppercase tracking-wide">
            Field label
          </Label>
          <Input
            id={labelId}
            value={field.label}
            onChange={(event) => onLabelChange(field.id, event.target.value)}
            className="mt-1.5"
          />
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Hash className="size-3.5 shrink-0" aria-hidden="true" />
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono">{field.key}</code>
          </p>
        </div>
        <div className="min-w-0">
          <Label htmlFor={typeId} className="text-xs font-semibold uppercase tracking-wide">
            Field type
          </Label>
          <Select value={field.type} onValueChange={(value) => {
                if (isFieldType(value)) onTypeChange(field.id, value);
              }}>
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
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Repeat className="size-3.5 shrink-0" aria-hidden="true" />
            Appears in {field.occurrences} {field.occurrences === 1 ? "place" : "places"}
          </p>
        </div>
      </div>
      {field.invalidPlaceholder && (
        <div className="mt-4">
          <LayoutWarning
            tone="error"
            title={`${field.invalidPlaceholder} is invalid. Use lowercase letters, numbers, and underscores.`}
            description="Rename the placeholder in Word, then upload the document again."
          />
        </div>
      )}
    </li>
  );
}
