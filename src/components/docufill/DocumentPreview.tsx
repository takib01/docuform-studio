import type { ReactElement, ReactNode } from "react";
import { FileText, Lock } from "lucide-react";

export interface PreviewValues {
  invoiceNumber: string;
  invoiceDate: string;
  buyerName: string;
  buyerAddress: string;
  goodsDescription: string;
  quantity: string;
  unitPrice: string;
  totalAmount: string;
}

export const DEFAULT_PREVIEW: PreviewValues = {
  invoiceNumber: "FM/ZY/026/26",
  invoiceDate: "18/06/2026",
  buyerName: "XYZ International Pvt Ltd",
  buyerAddress: "Plot 41, Industrial Estate, Karachi 74900, Pakistan",
  goodsDescription: "Cotton knitted fabric, 180 GSM, undyed",
  quantity: "500 MT",
  unitPrice: "US $50.00",
  totalAmount: "US $25,000.00",
};

export type PreviewMode = "placeholders" | "filled" | "highlighted";

export interface DocumentPreviewProps {
  fileName: string;
  mode?: PreviewMode;
  values?: PreviewValues;
  caption?: string;
}

function Slot({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}): React.ReactElement {
  return active ? (
    <mark className="field-highlight bg-highlight text-paper-ink">{children}</mark>
  ) : (
    <span>{children}</span>
  );
}

export function DocumentPreview({
  fileName,
  mode = "filled",
  values = DEFAULT_PREVIEW,
  caption = "Preview only. The original layout, fonts, logo and stamps are never modified.",
}: DocumentPreviewProps) {
  const highlight = mode !== "filled";
  const shown: PreviewValues =
    mode === "placeholders"
      ? {
          ...values,
          invoiceNumber: "{{invoice_number}}",
          invoiceDate: "{{invoice_date}}",
          totalAmount: "{{total_amount}}",
        }
      : values;

  return (
    <figure className="surface-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-muted px-4 py-2.5">
        <p className="flex min-w-0 items-center gap-2 text-sm font-medium">
          <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="truncate">{fileName}</span>
        </p>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
          <Lock className="size-3" aria-hidden="true" />
          Read-only
        </span>
      </div>

      <div className="bg-surface-muted p-3 sm:p-5">
        <div className="mx-auto max-w-[38rem] bg-paper p-5 text-[11px] leading-relaxed text-paper-ink shadow-paper sm:p-8 sm:text-xs">
          <div className="flex items-start justify-between gap-4 border-b-2 border-paper-ink/70 pb-3">
            <div>
              <p className="font-display text-base font-extrabold tracking-tight sm:text-lg">
                FABRIC MILLS LIMITED
              </p>
              <p className="mt-1 opacity-75">
                14 Textile Avenue, Dhaka 1212
                <br />
                Bangladesh · VAT 004-887-2213
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">Invoice</p>
              <p className="mt-1">
                No: <Slot active={highlight}>{shown.invoiceNumber}</Slot>
              </p>
              <p>
                Date: <Slot active={highlight}>{shown.invoiceDate}</Slot>
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-semibold uppercase tracking-wider opacity-60">Buyer</p>
              <p className="mt-1 font-semibold">
                <Slot active={highlight}>{shown.buyerName}</Slot>
              </p>
              <p className="opacity-80">
                <Slot active={highlight}>{shown.buyerAddress}</Slot>
              </p>
            </div>
            <div className="sm:text-right">
              <p className="font-semibold uppercase tracking-wider opacity-60">Terms</p>
              <p className="mt-1">CFR Karachi · 30 days net</p>
              <p className="opacity-80">Contract FM-2026-118</p>
            </div>
          </div>

          <table className="mt-5 w-full border-collapse">
            <thead>
              <tr className="border-y border-paper-ink/30 text-left uppercase tracking-wider opacity-70">
                <th className="py-1.5 pr-2 font-semibold">Description</th>
                <th className="py-1.5 px-2 font-semibold">Qty</th>
                <th className="py-1.5 px-2 font-semibold">Unit price</th>
                <th className="py-1.5 pl-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-paper-ink/15">
                <td className="py-2 pr-2">
                  <Slot active={highlight}>{shown.goodsDescription}</Slot>
                </td>
                <td className="py-2 px-2">
                  <Slot active={highlight}>{shown.quantity}</Slot>
                </td>
                <td className="py-2 px-2">
                  <Slot active={highlight}>{shown.unitPrice}</Slot>
                </td>
                <td className="py-2 pl-2 text-right">
                  <Slot active={highlight}>{shown.totalAmount}</Slot>
                </td>
              </tr>
              <tr className="border-b border-paper-ink/15 opacity-70">
                <td className="py-2 pr-2">Freight and handling</td>
                <td className="py-2 px-2">1</td>
                <td className="py-2 px-2">US $0.00</td>
                <td className="py-2 pl-2 text-right">Included</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="font-semibold">
                <td className="py-2 pr-2" colSpan={3}>
                  Total payable
                </td>
                <td className="py-2 pl-2 text-right">
                  <Slot active={highlight}>{shown.totalAmount}</Slot>
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-8 flex items-end justify-between gap-6">
            <p className="opacity-70">
              We certify that this invoice is true and correct.
              <br />
              Country of origin: Bangladesh
            </p>
            <div className="text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full border-2 border-paper-ink/40 text-[8px] uppercase leading-tight tracking-widest opacity-55">
                Company
                <br />
                Seal
              </div>
              <p className="mt-2 border-t border-paper-ink/40 pt-1 opacity-75">
                Authorised signatory
              </p>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
