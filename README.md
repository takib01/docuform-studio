# DocuForm Studio

Build a polished, responsive web UI for a SaaS called “DocuFill” — a format-preserving DOCX template generator

  for small businesses.

  Product purpose:

  Users upload an existing Microsoft Word invoice, quotation, purchase order, HR letter, or certificate. They

  can either:

  1. Upload a prepared DOCX containing placeholders like {{invoice_number}}, or

  2. Upload a normal already-filled DOCX and later use AI-assisted field suggestions.

  This is not a Word/Canva editor. Preserve the original document design. The experience should feel like

  turning a Word document into a reusable form.

  Tech/style constraints:

  - React + TypeScript + Tailwind CSS

  - Clean component structure, responsive desktop and mobile UI

  - No `any`; avoid type assertions

  - Accessible labels, keyboard-friendly controls, visible focus states

  - Use a professional small-business SaaS visual style

  - Light theme with warm neutral background, dark navy text, emerald primary actions, subtle borders/shadows

  - Use Lucide icons

  - Avoid overly rounded “AI toy” styling

  - Do not implement backend logic; use realistic mock data and typed interfaces

  Build these screens and states:

  1. Landing / Upload page

  - Header: logo “DocuFill”, nav links “How it works”, “Templates”, “Sign in”

  - Hero:

    - Heading: “Turn your Word documents into reusable forms.”

    - Subheading: “Upload an existing DOCX, fill only the values that change, and generate a new document

    without rebuilding your layout.”

  - Main upload card:

    - Drag-and-drop zone

    - “Choose DOCX file” button

    - Text: “DOCX only · Maximum 10 MB · Guest files expire within 24 hours”

    - Show selected file name, file size, remove action

    - Primary button: “Upload and analyze document”

  - Security/privacy note: “Your original document stays unchanged.”

  - Small “How it works” three-step section:

    1. Upload DOCX

    2. Confirm editable fields

    3. Generate your document

  2. Placeholder-detected state

  - Show a compact upload-success banner:

    - File name

    - “Document ready”

    - “3 fields detected”

  - Two-column desktop layout; stacked on mobile:

    - Left: document preview mockup with realistic invoice page, highlighted editable locations

    - Right: “Detected fields” panel

  - Field cards show:

    - Editable human label, e.g. “Invoice number”

    - Technical key, e.g. `invoice_number`

    - Field type select: Text, Number, Date, Currency, Email, Multiline Text

    - Occurrence count, e.g. “Appears in 2 places”

  - Include a warning box if a placeholder is invalid:

    - “{{Customer Name}} is invalid. Use lowercase letters, numbers, and underscores.”

  - Buttons:

    - Secondary: “Upload another document”

    - Primary: “Continue to fill values”

  3. No-placeholder state / AI path

  - Show a document preview mockup of a filled commercial invoice.

  - Heading: “No prepared fields found”

  - Explain: “This document does not contain {{placeholders}}. You can prepare it manually or ask AI to suggest

  values that commonly change.”

  - Two clear options:

    - “Use placeholders instead” — explains deterministic setup

    - “Auto-detect fields” — primary button with sparkle icon

  - AI disclosure:

    - “AI only suggests fields. Nothing in your document changes until you review and confirm.”

  - Include suggested examples: invoice number, date, buyer name, quantity, unit price, total amount.

  4. AI field-review state

  - Table/list of suggested fields with:

    - Checkbox to include/exclude

    - Current document value

    - Editable label

    - Field type dropdown

    - Confidence indicator: High / Medium / Low

  - Example suggestions:

    - Invoice number — FM/ZY/026/26 — Text

    - Invoice date — 18/06/2026 — Date

    - Buyer name — XYZ International Pvt Ltd — Text

    - Total amount — US $25,000.00 — Currency

  - “AI suggestion” badge on each row

  - Buttons:

    - Secondary: “Back”

    - Primary: “Confirm selected fields”

  - Make it obvious users remain in control.

  5. Fill-values state

  - Two-column layout:

    - Left: editable field form

    - Right: read-only document preview mockup with highlighted field values

  - Form includes:

    - Invoice number

    - Invoice date

    - Buyer name

    - Buyer address

    - Goods description

    - Quantity

    - Unit price

    - Total amount

  - Add a layout-risk warning example:

    - “Buyer address is longer than the original value and may affect the document layout.”

  - Primary action: “Generate DOCX”

  - Secondary action: “Generate PDF”

  - Show processing states for generation.

  6. Templates dashboard for signed-in users

  - Page title: “Your templates”

  - Search box, “New template” button

  - Template cards/table with:

    - Template name

    - Last updated

    - Field count

    - Actions: Use template, Rename, Delete

  - Empty state: “Save your first reusable document template.”

  - Use realistic examples:

    - Commercial Invoice

    - Sales Quotation

    - Delivery Note

  Important UX rules:

  - The original DOCX is always the source of truth.

  - Do not imply users can drag, resize, move, edit images, edit stamps, or edit arbitrary document text.

  - Clearly distinguish deterministic placeholders from AI suggestions.

  - AI suggestions must always require explicit confirmation.

  - Show guest-retention messaging where appropriate.

  - Use polished loading, success, empty, warning, and error states.

  - Create reusable components for UploadCard, DocumentPreview, FieldEditor, AiSuggestionList, LayoutWarning,

  and TemplateCard.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d3605c35-eba1-4137-b73f-cad13e9ad081).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
