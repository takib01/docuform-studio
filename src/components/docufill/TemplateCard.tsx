import { Clock, FileText, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TemplateSummary } from "@/lib/docufill";

export interface TemplateCardProps {
  template: TemplateSummary;
  onUse: (id: string) => void;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TemplateCard({ template, onUse, onRename, onDelete }: TemplateCardProps) {
  return (
    <article className="surface-card flex flex-col p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary-soft text-accent-foreground">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-bold">{template.name}</h3>
            <p className="text-xs text-muted-foreground">{template.documentType}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="min-h-11 min-w-11 shrink-0"
              aria-label={`More actions for ${template.name}`}
            >
              <MoreVertical className="size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onRename(template.id)}>
              <Pencil className="size-4" aria-hidden="true" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => onDelete(template.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5 shrink-0" aria-hidden="true" />
          <dt className="sr-only">Last updated</dt>
          <dd>{template.updatedAt}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt>Fields</dt>
          <dd className="font-medium text-foreground">{template.fieldCount}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => onUse(template.id)}>Use template</Button>
        <Button variant="outline" onClick={() => onRename(template.id)}>
          Rename
        </Button>
      </div>
    </article>
  );
}
