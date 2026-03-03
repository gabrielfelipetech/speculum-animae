import type PDFKit from 'pdfkit';
import { Buffer } from 'node:buffer';

export type PdfTheme = {
  colors: {
    primary: string;
    accent: string;
    text: string;
    muted: string;
    border: string;
    surface: string;
    coverText: string;
    coverMuted: string;
  };
  typography: {
    h1: number;
    h2: number;
    h3: number;
    body: number;
    small: number;
  };
};

export type LayoutState = {
  contentWidth: number;
};

const DEFAULT_THEME: PdfTheme = {
  colors: {
    primary: '#1D4ED8',
    accent: '#D97706',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    surface: '#F3F4F6',
    coverText: '#FFFFFF',
    coverMuted: '#E5E7EB',
  },
  typography: {
    h1: 25,
    h2: 16,
    h3: 13,
    body: 11.5,
    small: 8,
  },
};

export function createLayoutState(doc: PDFKit.PDFDocument): LayoutState {
  return {
    contentWidth: doc.page.width - doc.page.margins.left - doc.page.margins.right,
  };
}

export function ensureSpace(
  doc: PDFKit.PDFDocument,
  requiredHeight: number,
): void {
  const available = doc.page.height - doc.page.margins.bottom - doc.y;
  if (available < requiredHeight) {
    doc.addPage();
  }
}

export function writeCover(
  doc: PDFKit.PDFDocument,
  state: LayoutState,
  title: string,
  subtitle: string,
  options?: {
    badge?: string;
    summary?: string;
    theme?: Partial<PdfTheme>;
  },
): void {
  const theme = mergeTheme(options?.theme);
  const topBandHeight = 150;
  const left = doc.page.margins.left;

  doc.save();
  doc.rect(0, 0, doc.page.width, topBandHeight).fill(theme.colors.primary);
  doc.restore();

  doc.y = 42;
  doc
    .font('Helvetica-Bold')
    .fontSize(theme.typography.h1)
    .fillColor(theme.colors.coverText)
    .text(title, left, doc.y, {
      width: state.contentWidth,
      align: 'left',
      lineGap: 2,
    });

  doc.moveDown(0.2);
  doc
    .font('Helvetica')
    .fontSize(11.5)
    .fillColor(theme.colors.coverMuted)
    .text(subtitle, {
      width: state.contentWidth,
      align: 'left',
      lineGap: 2,
    });

  if (options?.badge) {
    doc.moveDown(0.6);
    doc
      .font('Helvetica-Bold')
      .fontSize(12.5)
      .fillColor(theme.colors.coverText)
      .text(options.badge, {
        width: state.contentWidth,
        align: 'left',
        lineGap: 2,
      });
  }

  if (options?.summary) {
    doc.moveDown(1);
    doc
      .font('Helvetica')
      .fontSize(theme.typography.body)
      .fillColor(theme.colors.text)
      .text(options.summary, {
        width: state.contentWidth,
        align: 'left',
        lineGap: 4,
      });
  }

  doc.moveDown(0.5);
  writeDivider(doc, state, options?.theme);
}

export function writeH2(
  doc: PDFKit.PDFDocument,
  state: LayoutState,
  text: string,
  themeInput?: Partial<PdfTheme>,
): void {
  const theme = mergeTheme(themeInput);
  doc.moveDown(0.8);
  ensureSpace(doc, 28);
  doc
    .font('Helvetica-Bold')
    .fontSize(theme.typography.h2)
    .fillColor(theme.colors.primary)
    .text(text, {
      width: state.contentWidth,
      align: 'left',
      lineGap: 2,
    });
  doc.moveDown(0.1);
}

export function writeH3(
  doc: PDFKit.PDFDocument,
  state: LayoutState,
  text: string,
  themeInput?: Partial<PdfTheme>,
): void {
  const theme = mergeTheme(themeInput);
  doc.moveDown(0.4);
  ensureSpace(doc, 22);
  doc
    .font('Helvetica-Bold')
    .fontSize(theme.typography.h3)
    .fillColor(theme.colors.primary)
    .text(text, {
      width: state.contentWidth,
      align: 'left',
      lineGap: 2,
    });
  doc.moveDown(0.1);
}

export function writeParagraph(
  doc: PDFKit.PDFDocument,
  state: LayoutState,
  text: string,
  options?: {
    italic?: boolean;
    theme?: Partial<PdfTheme>;
  },
): void {
  const content = text.trim();
  if (!content) return;
  const theme = mergeTheme(options?.theme);
  const estimatedHeight =
    doc.heightOfString(content, {
      width: state.contentWidth,
      align: 'justify',
      lineGap: 4,
    }) + 8;

  ensureSpace(doc, Math.min(estimatedHeight, 260));
  doc
    .font(options?.italic ? 'Helvetica-Oblique' : 'Helvetica')
    .fontSize(theme.typography.body)
    .fillColor(theme.colors.text)
    .text(content, {
      width: state.contentWidth,
      align: 'justify',
      lineGap: 4,
    });
  doc.moveDown(0.45);
}

export function writeBulletList(
  doc: PDFKit.PDFDocument,
  state: LayoutState,
  items: string[],
  themeInput?: Partial<PdfTheme>,
): void {
  const theme = mergeTheme(themeInput);
  for (const item of items) {
    const content = `- ${item.trim()}`;
    ensureSpace(doc, 18);
    doc
      .font('Helvetica')
      .fontSize(theme.typography.body)
      .fillColor(theme.colors.text)
      .text(content, {
        width: state.contentWidth,
        align: 'left',
        lineGap: 4,
      });
    doc.moveDown(0.15);
  }
}

export function writeDivider(
  doc: PDFKit.PDFDocument,
  state: LayoutState,
  themeInput?: Partial<PdfTheme>,
): void {
  const theme = mergeTheme(themeInput);
  ensureSpace(doc, 18);
  const startX = doc.page.margins.left;
  const y = doc.y + 2;
  const endX = startX + state.contentWidth;

  doc
    .save()
    .moveTo(startX, y)
    .lineTo(endX, y)
    .lineWidth(0.8)
    .strokeColor(theme.colors.border)
    .stroke()
    .restore();

  doc.y = y + 12;
}

export function writeCallout(
  doc: PDFKit.PDFDocument,
  state: LayoutState,
  text: string,
  options?: {
    theme?: Partial<PdfTheme>;
  },
): void {
  const content = text.trim();
  if (!content) return;
  const theme = mergeTheme(options?.theme);
  const boxPadding = 10;
  const lineGap = 4;
  const textHeight = doc.heightOfString(content, {
    width: state.contentWidth - boxPadding * 2,
    align: 'left',
    lineGap,
  });
  const boxHeight = textHeight + boxPadding * 2;

  ensureSpace(doc, boxHeight + 12);

  const x = doc.page.margins.left;
  const y = doc.y;
  doc.save();
  doc.rect(x, y, state.contentWidth, boxHeight).fill(theme.colors.surface);
  doc
    .rect(x, y, state.contentWidth, boxHeight)
    .lineWidth(0.8)
    .strokeColor(theme.colors.border)
    .stroke();
  doc.restore();

  doc
    .font('Helvetica')
    .fontSize(theme.typography.body)
    .fillColor(theme.colors.text)
    .text(content, x + boxPadding, y + boxPadding, {
      width: state.contentWidth - boxPadding * 2,
      align: 'left',
      lineGap,
    });
  doc.y = y + boxHeight + 8;
}

export function drawHeaderFooter(
  doc: PDFKit.PDFDocument,
  options: {
    brand: string;
    sessionId: string;
    theme?: Partial<PdfTheme>;
  },
): void {
  const theme = mergeTheme(options.theme);
  const range = doc.bufferedPageRange();

  for (let offset = 0; offset < range.count; offset += 1) {
    const pageIndex = range.start + offset;
    doc.switchToPage(pageIndex);

    const left = doc.page.margins.left;
    const top = doc.page.margins.top;
    const right = doc.page.margins.right;
    const bottom = doc.page.margins.bottom;
    const width = doc.page.width - left - right;

    doc.save();
    doc
      .font('Helvetica')
      .fontSize(theme.typography.small)
      .fillColor(theme.colors.muted)
      .text(options.brand, left, top - 24, {
        width,
        align: 'left',
        lineBreak: false,
      });

    doc.text(`Pagina ${offset + 1}/${range.count}`, left, top - 24, {
      width,
      align: 'right',
      lineBreak: false,
    });

    doc
      .moveTo(left, top - 8)
      .lineTo(left + width, top - 8)
      .lineWidth(0.7)
      .strokeColor(theme.colors.border)
      .stroke();

    doc.text(`Session: ${options.sessionId}`, left, doc.page.height - bottom + 14, {
      width,
      align: 'right',
      lineBreak: false,
    });
    doc.restore();
  }

  const lastPage = range.start + Math.max(0, range.count - 1);
  doc.switchToPage(lastPage);
}

export function collectPdfBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer | Uint8Array) => {
      chunks.push(Buffer.from(chunk));
    });

    doc.once('end', () => resolve(Buffer.concat(chunks)));
    doc.once('error', reject);
  });
}

function mergeTheme(input?: Partial<PdfTheme>): PdfTheme {
  if (!input) return DEFAULT_THEME;
  return {
    colors: {
      ...DEFAULT_THEME.colors,
      ...(input.colors ?? {}),
    },
    typography: {
      ...DEFAULT_THEME.typography,
      ...(input.typography ?? {}),
    },
  };
}
