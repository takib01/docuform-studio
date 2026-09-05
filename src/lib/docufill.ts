export type FieldType = "text" | "number" | "date" | "currency" | "email" | "multiline";

export const FIELD_TYPE_OPTIONS: ReadonlyArray<{ value: FieldType; label: string }> = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "currency", label: "Currency" },
  { value: "email", label: "Email" },
  { value: "multiline", label: "Multiline Text" },
];

export type Confidence = "high" | "medium" | "low";

export interface DetectedField {
  id: string;
  label: string;
  key: string;
  type: FieldType;
  occurrences: number;
  invalidPlaceholder?: string;
}

export interface SuggestedField {
  id: string;
  label: string;
  key: string;
  currentValue: string;
  type: FieldType;
  confidence: Confidence;
  included: boolean;
}

export interface FillField {
  id: string;
  label: string;
  key: string;
  type: FieldType;
  value: string;
  originalLength: number;
  helper?: string;
}

export interface UploadedFile {
  name: string;
  sizeBytes: number;
}

export interface TemplateSummary {
  id: string;
  name: string;
  updatedAt: string;
  fieldCount: number;
  documentType: string;
}

export const MOCK_FILE: UploadedFile = {
  name: "commercial-invoice-template.docx",
  sizeBytes: 248_320,
};

export const DETECTED_FIELDS: ReadonlyArray<DetectedField> = [
  { id: "f1", label: "Invoice number", key: "invoice_number", type: "text", occurrences: 2 },
  { id: "f2", label: "Invoice date", key: "invoice_date", type: "date", occurrences: 1 },
  { id: "f3", label: "Total amount", key: "total_amount", type: "currency", occurrences: 2 },
];

export const SUGGESTED_FIELDS: ReadonlyArray<SuggestedField> = [
  {
    id: "s1",
    label: "Invoice number",
    key: "invoice_number",
    currentValue: "FM/ZY/026/26",
    type: "text",
    confidence: "high",
    included: true,
  },
  {
    id: "s2",
    label: "Invoice date",
    key: "invoice_date",
    currentValue: "18/06/2026",
    type: "date",
    confidence: "high",
    included: true,
  },
  {
    id: "s3",
    label: "Buyer name",
    key: "buyer_name",
    currentValue: "XYZ International Pvt Ltd",
    type: "text",
    confidence: "medium",
    included: true,
  },
  {
    id: "s4",
    label: "Quantity",
    key: "quantity",
    currentValue: "500 MT",
    type: "number",
    confidence: "medium",
    included: false,
  },
  {
    id: "s5",
    label: "Unit price",
    key: "unit_price",
    currentValue: "US $50.00",
    type: "currency",
    confidence: "low",
    included: false,
  },
  {
    id: "s6",
    label: "Total amount",
    key: "total_amount",
    currentValue: "US $25,000.00",
    type: "currency",
    confidence: "high",
    included: true,
  },
];

export const FILL_FIELDS: ReadonlyArray<FillField> = [
  {
    id: "v1",
    label: "Invoice number",
    key: "invoice_number",
    type: "text",
    value: "FM/ZY/026/26",
    originalLength: 12,
  },
  {
    id: "v2",
    label: "Invoice date",
    key: "invoice_date",
    type: "date",
    value: "2026-06-18",
    originalLength: 10,
  },
  {
    id: "v3",
    label: "Buyer name",
    key: "buyer_name",
    type: "text",
    value: "XYZ International Pvt Ltd",
    originalLength: 25,
  },
  {
    id: "v4",
    label: "Buyer address",
    key: "buyer_address",
    type: "multiline",
    value: "Plot 41, Industrial Estate, Ring Road North, Karachi 74900, Pakistan",
    originalLength: 38,
    helper: "Keep the address close to the original length to protect the layout.",
  },
  {
    id: "v5",
    label: "Goods description",
    key: "goods_description",
    type: "multiline",
    value: "Cotton knitted fabric, 180 GSM, undyed",
    originalLength: 40,
  },
  { id: "v6", label: "Quantity", key: "quantity", type: "number", value: "500", originalLength: 3 },
  {
    id: "v7",
    label: "Unit price",
    key: "unit_price",
    type: "currency",
    value: "50.00",
    originalLength: 5,
  },
  {
    id: "v8",
    label: "Total amount",
    key: "total_amount",
    type: "currency",
    value: "25,000.00",
    originalLength: 9,
  },
];

export const TEMPLATES: ReadonlyArray<TemplateSummary> = [
  {
    id: "t1",
    name: "Commercial Invoice",
    updatedAt: "Updated 2 days ago",
    fieldCount: 8,
    documentType: "Invoice",
  },
  {
    id: "t2",
    name: "Sales Quotation",
    updatedAt: "Updated 1 week ago",
    fieldCount: 6,
    documentType: "Quotation",
  },
  {
    id: "t3",
    name: "Delivery Note",
    updatedAt: "Updated 23 May 2026",
    fieldCount: 5,
    documentType: "Logistics",
  },
];

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isValidPlaceholderKey(key: string): boolean {
  return /^[a-z0-9_]+$/.test(key);
}

export function isFieldType(value: string): value is FieldType {
  return FIELD_TYPE_OPTIONS.some((option) => option.value === value);
}
