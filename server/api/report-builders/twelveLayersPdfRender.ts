import PDFDocument from 'pdfkit';
import type { Buffer } from 'node:buffer';
import type { StoredResult } from '../results.post';
import { buildTwelveLayersPdfContent } from './twelveLayersPdf';
import {
  collectPdfBuffer,
  createLayoutState,
  drawHeaderFooter,
  ensureSpace,
  writeBulletList,
  writeCallout,
  writeCover,
  writeDivider,
  writeH2,
  writeH3,
  writeParagraph,
} from '../../pdf/layout';

export type TwelveLayersPdfBinary = {
  fileName: string;
  buffer: Buffer;
};

function writeScoreOverview(
  doc: PDFKit.PDFDocument,
  state: ReturnType<typeof createLayoutState>,
  content: ReturnType<typeof buildTwelveLayersPdfContent>,
): void {
  writeH2(doc, state, '1. Visao geral das 12 camadas (0-10)');
  for (const layer of content.orderedScores) {
    ensureSpace(doc, 42);
    doc
      .font('Helvetica-Bold')
      .fontSize(11)
      .fillColor('#111827')
      .text(layer.name, {
        continued: true,
      })
      .font('Helvetica-Oblique')
      .fontSize(10.5)
      .fillColor('#6B7280')
      .text(`  Media (0-10): ${layer.score.toFixed(2)}`, {
        width: state.contentWidth,
      });

    const x = doc.page.margins.left;
    const y = doc.y + 3;
    const barWidth = state.contentWidth;
    const barHeight = 10;
    const fillWidth = Math.max(0, Math.min(1, layer.score / 10)) * barWidth;

    doc.save();
    doc.rect(x, y, barWidth, barHeight).fill('#F3F4F6');
    doc.rect(x, y, barWidth, barHeight).lineWidth(0.8).strokeColor('#E5E7EB').stroke();
    doc.rect(x, y, fillWidth, barHeight).fill('#D97706');
    doc.restore();
    doc.y = y + barHeight + 7;
  }

  writeCallout(
    doc,
    state,
    `Camadas de maior intensidade: ${content.topLayers
      .map((layer) => layer.name)
      .join(', ')}. Camadas com maior necessidade de reforco: ${content.bottomLayers
      .map((layer) => layer.name)
      .join(', ')}.`,
  );
  writeDivider(doc, state);
}

function writeLayerSections(
  doc: PDFKit.PDFDocument,
  state: ReturnType<typeof createLayoutState>,
  content: ReturnType<typeof buildTwelveLayersPdfContent>,
): void {
  writeH2(doc, state, '2. Leitura detalhada por camada');
  content.sections.forEach((section, index) => {
    writeH3(
      doc,
      state,
      `2.${index + 1} ${section.name} (${section.score.toFixed(2)}/10)`,
    );
    writeParagraph(doc, state, section.description);
    writeParagraph(doc, state, section.strengths);
    writeParagraph(doc, state, section.risks);
    writeParagraph(doc, state, section.practice);
  });
  writeDivider(doc, state);
}

function renderTwelveLayersPdf(
  doc: PDFKit.PDFDocument,
  entry: StoredResult,
  content: ReturnType<typeof buildTwelveLayersPdfContent>,
): void {
  const state = createLayoutState(doc);
  writeCover(
    doc,
    state,
    'Relatorio Completo - 12 Camadas',
    content.subtitle,
    {
      badge: 'Escala unica 0-10',
      summary:
        'Este PDF detalha cada camada com descricao, forcas, riscos e praticas, seguido de plano de melhoria em 7 e 30 dias.',
    },
  );

  writeScoreOverview(doc, state, content);
  writeLayerSections(doc, state, content);

  writeH2(doc, state, '3. Leitura integrada');
  writeParagraph(doc, state, content.integratedReading);
  writeDivider(doc, state);

  writeH2(doc, state, '4. Plano de 7 dias');
  writeBulletList(doc, state, content.sevenDayPlan);
  writeDivider(doc, state);

  writeH2(doc, state, '5. Plano de 30 dias');
  writeBulletList(doc, state, content.thirtyDayPlan);

  drawHeaderFooter(doc, {
    brand: 'Speculum Animae',
    sessionId: entry.id,
  });
}

export async function generateTwelveLayersPdfBinary(
  entry: StoredResult,
): Promise<TwelveLayersPdfBinary> {
  const content = buildTwelveLayersPdfContent(entry);
  const fileName = 'relatorio-12-camadas.pdf';

  const doc = new PDFDocument({
    size: 'A4',
    margin: 56,
    bufferPages: true,
    compress: false,
  });

  const bufferPromise = collectPdfBuffer(doc);
  renderTwelveLayersPdf(doc, entry, content);
  doc.end();

  const buffer = await bufferPromise;
  return { fileName, buffer };
}
