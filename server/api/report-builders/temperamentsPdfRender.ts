import { Buffer } from 'node:buffer';
import PDFDocument from 'pdfkit';
import type { StoredResult } from '../results.post';
import {
  buildTemperamentsPdfContent,
  type TemperamentProfile,
  type TemperamentsPdfContent,
} from './temperamentsPdf';
import {
  TEMPERAMENT_FILENAME_SLUGS,
  TEMPERAMENT_LABELS_PT,
} from '../../texts/premiumTemperaments';

export type TemperamentsPdfBinary = {
  fileName: string;
  buffer: Buffer;
};

type PdfTheme = {
  colors: {
    primary: string;
    accent: string;
    text: string;
    muted: string;
    border: string;
    surface: string;
  };
  typography: {
    h1: number;
    h2: number;
    h3: number;
    body: number;
    small: number;
  };
  spacing: {
    sectionTop: number;
    paragraphGap: number;
    dividerGap: number;
  };
};

type RenderState = {
  contentWidth: number;
  justAddedPage: boolean;
};

const PDF_THEME: PdfTheme = {
  colors: {
    primary: '#1D4ED8',
    accent: '#D97706',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    surface: '#F3F4F6',
  },
  typography: {
    h1: 25,
    h2: 16,
    h3: 13,
    body: 11.5,
    small: 8,
  },
  spacing: {
    sectionTop: 18,
    paragraphGap: 8,
    dividerGap: 12,
  },
};

function ensureSpace(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  requiredHeight: number,
): void {
  const available = doc.page.height - doc.page.margins.bottom - doc.y;

  if (available < requiredHeight && !state.justAddedPage) {
    doc.addPage();
    state.justAddedPage = true;
  }
}

function writeHeading(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  text: string,
  level: 2 | 3,
): void {
  const size = level === 2 ? PDF_THEME.typography.h2 : PDF_THEME.typography.h3;
  const requiredHeight = level === 2 ? 28 : 22;

  doc.moveDown(level === 2 ? 0.8 : 0.4);
  ensureSpace(doc, state, requiredHeight);

  doc
    .font('Helvetica-Bold')
    .fontSize(size)
    .fillColor(PDF_THEME.colors.primary)
    .text(text, {
      width: state.contentWidth,
      align: 'left',
      lineGap: 2,
    });

  doc.moveDown(0.1);
  state.justAddedPage = false;
}

function writeParagraph(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  text: string,
  options?: { italic?: boolean },
): void {
  const content = text.trim();
  if (!content) return;

  const estimatedHeight =
    doc.heightOfString(content, {
      width: state.contentWidth,
      align: 'justify',
      lineGap: 4,
    }) + PDF_THEME.spacing.paragraphGap;

  ensureSpace(doc, state, Math.min(estimatedHeight, 220));

  doc
    .font(options?.italic ? 'Helvetica-Oblique' : 'Helvetica')
    .fontSize(PDF_THEME.typography.body)
    .fillColor(PDF_THEME.colors.text)
    .text(content, {
      width: state.contentWidth,
      align: 'justify',
      lineGap: 4,
    });

  doc.moveDown(0.45);
  state.justAddedPage = false;
}

function writeDivider(doc: PDFKit.PDFDocument, state: RenderState): void {
  ensureSpace(doc, state, 18);
  const startX = doc.page.margins.left;
  const y = doc.y + 2;
  const endX = startX + state.contentWidth;

  doc
    .save()
    .moveTo(startX, y)
    .lineTo(endX, y)
    .lineWidth(0.8)
    .strokeColor(PDF_THEME.colors.border)
    .stroke()
    .restore();

  doc.y = y + PDF_THEME.spacing.dividerGap;
  state.justAddedPage = false;
}

function collectPdfBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer | Uint8Array) => {
      chunks.push(Buffer.from(chunk));
    });

    doc.once('end', () => {
      resolve(Buffer.concat(chunks));
    });

    doc.once('error', reject);
  });
}

function scoreBarColor(
  scoreId: string,
  content: TemperamentsPdfContent,
): string {
  if (scoreId === content.main.id) {
    return PDF_THEME.colors.primary;
  }

  if (content.secondary && scoreId === content.secondary.id) {
    return PDF_THEME.colors.accent;
  }

  return '#9CA3AF';
}

function writeCover(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  content: TemperamentsPdfContent,
): void {
  const mainLabel = TEMPERAMENT_LABELS_PT[content.main.id];
  const secondaryLabel = content.secondary
    ? TEMPERAMENT_LABELS_PT[content.secondary.id]
    : null;

  const topBandHeight = 148;
  doc
    .save()
    .rect(0, 0, doc.page.width, topBandHeight)
    .fill(PDF_THEME.colors.primary)
    .restore();

  const left = doc.page.margins.left;
  doc.y = 42;

  doc
    .font('Helvetica-Bold')
    .fontSize(PDF_THEME.typography.h1)
    .fillColor('#FFFFFF')
    .text('Relatorio Premium de Temperamentos', left, doc.y, {
      width: state.contentWidth,
      align: 'left',
      lineGap: 2,
    });

  doc.moveDown(0.2);

  doc
    .font('Helvetica')
    .fontSize(11.5)
    .fillColor('#E5E7EB')
    .text('Leitura premium baseada nos textos oficiais de temperamentos em src/assets/texts.', {
      width: state.contentWidth,
      align: 'left',
      lineGap: 2,
    });

  doc.moveDown(0.5);

  doc
    .font('Helvetica-Bold')
    .fontSize(13)
    .fillColor('#FFFFFF')
    .text('Combinacao principal-secundaria: ', {
      continued: true,
    })
    .text(mainLabel, {
      continued: Boolean(secondaryLabel),
      underline: true,
    });

  if (secondaryLabel) {
    doc.text(' + ', {
      continued: true,
      underline: false,
    });
    doc.text(secondaryLabel, {
      underline: true,
    });
  }

  doc.moveDown(1.1);

  doc
    .font('Helvetica')
    .fontSize(10.5)
    .fillColor(PDF_THEME.colors.muted)
    .text('Este material organiza pontos fortes, riscos, trabalho, relacionamentos e praticas de crescimento em um formato aplicavel.', {
      width: state.contentWidth,
      align: 'left',
      lineGap: 3,
    });

  doc.moveDown(0.4);
  writeDivider(doc, state);
}

function writeScoreOverview(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  content: TemperamentsPdfContent,
): void {
  writeHeading(doc, state, '1. Visao geral dos resultados', 2);

  for (const score of content.resultsOrdered) {
    ensureSpace(doc, state, 42);

    doc
      .font('Helvetica-Bold')
      .fontSize(11)
      .fillColor(PDF_THEME.colors.text)
      .text(score.name, {
        continued: true,
      })
      .font('Helvetica-Oblique')
      .fontSize(10.5)
      .fillColor(PDF_THEME.colors.muted)
      .text(
        `  Media (0-10): ${score.base10Average.toFixed(2)}  |  Media (escala ${content.scale.min}-${content.scale.max}): ${score.sourceAverage.toFixed(2)}`,
        {
          width: state.contentWidth,
        },
      );

    const x = doc.page.margins.left;
    const y = doc.y + 3;
    const barWidth = state.contentWidth;
    const barHeight = 10;
    const fillWidth = Math.max(0, Math.min(1, score.base10Average / 10)) * barWidth;

    doc.save();
    doc.rect(x, y, barWidth, barHeight).fill(PDF_THEME.colors.surface);
    doc.rect(x, y, barWidth, barHeight).lineWidth(0.8).strokeColor(PDF_THEME.colors.border).stroke();
    doc.rect(x, y, fillWidth, barHeight).fill(scoreBarColor(score.id, content));
    doc.restore();

    doc.y = y + barHeight + 7;
    state.justAddedPage = false;
  }

  const topOne = content.resultsOrdered[0];
  const topTwo = content.resultsOrdered[1] ?? null;
  const bottomOne = content.resultsOrdered[content.resultsOrdered.length - 1];

  const quickRead = topTwo
    ? `Leitura rapida: ${topOne.name} lidera o perfil e ${topTwo.name} atua como eixo secundario de modulacao. ${bottomOne.name} aparece com menor influencia relativa neste momento.`
    : `Leitura rapida: ${topOne.name} aparece como eixo dominante neste momento, com variacoes menores nos demais temperamentos.`;

  writeParagraph(doc, state, quickRead, { italic: true });
  writeParagraph(
    doc,
    state,
    `Escala tecnica: os resultados foram normalizados para 0-10 e preservam a referencia original (${content.scale.min}-${content.scale.max}) para leitura comparavel entre web e PDF.`,
  );
  writeParagraph(
    doc,
    state,
    'Interprete cada barra como tendencia atual, nao como rotulo fixo. O objetivo e orientar escolhas praticas de comportamento, rotina e convivio com mais clareza.',
  );

  writeDivider(doc, state);
}

function writeProfile(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  profile: TemperamentProfile,
  sectionIndex: 2 | 3,
  title: string,
): void {
  writeHeading(doc, state, `${sectionIndex}. ${title}: ${profile.label}`, 2);

  writeHeading(doc, state, `${sectionIndex}.1 Visao geral`, 3);
  writeParagraph(doc, state, profile.overview);

  writeHeading(doc, state, `${sectionIndex}.2 Forcas`, 3);
  for (const paragraph of profile.strengths) {
    writeParagraph(doc, state, paragraph);
  }

  writeHeading(doc, state, `${sectionIndex}.3 Riscos`, 3);
  for (const paragraph of profile.risks) {
    writeParagraph(doc, state, paragraph);
  }

  writeHeading(doc, state, `${sectionIndex}.4 Trabalho`, 3);
  for (const paragraph of profile.work) {
    writeParagraph(doc, state, paragraph);
  }

  writeHeading(doc, state, `${sectionIndex}.5 Relacionamentos`, 3);
  for (const paragraph of profile.relationships) {
    writeParagraph(doc, state, paragraph);
  }

  writeHeading(doc, state, `${sectionIndex}.6 Praticas`, 3);
  for (const paragraph of profile.spiritual) {
    writeParagraph(doc, state, paragraph);
  }

  writeDivider(doc, state);
}

function writeIntegratedReading(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  paragraphs: string[],
): void {
  writeHeading(doc, state, '4. Leitura integrada da combinacao', 2);
  writeParagraph(
    doc,
    state,
    'Observacao: esta leitura sintetiza os dois eixos predominantes para orientar acao concreta de curto prazo.',
    { italic: true },
  );

  for (const paragraph of paragraphs.slice(0, 4)) {
    writeParagraph(doc, state, paragraph);
  }

  writeDivider(doc, state);
}

function writeChecklist(
  doc: PDFKit.PDFDocument,
  state: RenderState,
  items: string[],
): void {
  writeHeading(doc, state, '5. Checklist pratico', 2);
  writeParagraph(
    doc,
    state,
    'Use este checklist ao revisar sua semana. Marque o que foi aplicado e ajuste o proximo ciclo.',
  );

  for (const item of items) {
    const bullet = `- ${item.trim()}`;
    ensureSpace(doc, state, 18);

    doc
      .font('Helvetica')
      .fontSize(PDF_THEME.typography.body)
      .fillColor(PDF_THEME.colors.text)
      .text(bullet, {
        width: state.contentWidth,
        align: 'left',
        lineGap: 4,
      });

    doc.moveDown(0.15);
    state.justAddedPage = false;
  }
}

function drawHeaderFooter(
  doc: PDFKit.PDFDocument,
  sessionId: string,
): void {
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
      .fontSize(PDF_THEME.typography.small)
      .fillColor(PDF_THEME.colors.muted)
      .text('Speculum Animae', left, top - 24, {
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
      .strokeColor(PDF_THEME.colors.border)
      .stroke();

    doc.text(`Session: ${sessionId}`, left, doc.page.height - bottom + 14, {
      width,
      align: 'right',
      lineBreak: false,
    });

    doc.restore();
  }

  const lastPage = range.start + Math.max(0, range.count - 1);
  doc.switchToPage(lastPage);
}

function renderTemperamentsPdfDocument(
  doc: PDFKit.PDFDocument,
  entry: StoredResult,
  content: TemperamentsPdfContent,
): void {
  const state: RenderState = {
    contentWidth:
      doc.page.width - doc.page.margins.left - doc.page.margins.right,
    justAddedPage: false,
  };

  writeCover(doc, state, content);
  writeScoreOverview(doc, state, content);
  writeProfile(doc, state, content.mainProfile, 2, 'Temperamento principal');

  if (content.secondaryProfile) {
    writeProfile(
      doc,
      state,
      content.secondaryProfile,
      3,
      'Temperamento secundario',
    );
  }

  writeIntegratedReading(doc, state, content.integratedReadingParagraphs);
  writeChecklist(doc, state, content.finalChecklist);

  drawHeaderFooter(doc, entry.id);
}

export async function generateTemperamentsPdfBinary(
  entry: StoredResult,
): Promise<TemperamentsPdfBinary> {
  const content = buildTemperamentsPdfContent(entry);
  const primarySlug = TEMPERAMENT_FILENAME_SLUGS[content.main.id];
  const secondarySlug = content.secondary
    ? TEMPERAMENT_FILENAME_SLUGS[content.secondary.id]
    : primarySlug;
  const fileName = `relatorio-temperamentos-${primarySlug}-${secondarySlug}.pdf`;

  const doc = new PDFDocument({
    size: 'A4',
    margin: 56,
    bufferPages: true,
  });

  const bufferPromise = collectPdfBuffer(doc);
  renderTemperamentsPdfDocument(doc, entry, content);
  doc.end();

  const buffer = await bufferPromise;
  return { fileName, buffer };
}
