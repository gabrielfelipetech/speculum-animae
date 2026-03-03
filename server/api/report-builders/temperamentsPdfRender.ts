import type { Buffer } from 'node:buffer';
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

export type TemperamentsPdfBinary = {
  fileName: string;
  buffer: Buffer;
};

function scoreBarColor(scoreId: string, content: TemperamentsPdfContent): string {
  if (scoreId === content.main.id) return '#1D4ED8';
  if (content.secondary && scoreId === content.secondary.id) return '#D97706';
  return '#6B7280';
}

function writeScoreOverview(
  doc: PDFKit.PDFDocument,
  state: ReturnType<typeof createLayoutState>,
  content: TemperamentsPdfContent,
): void {
  writeH2(doc, state, '1. Intensidade dos quatro temperamentos (0-10)');

  for (const score of content.resultsOrdered) {
    ensureSpace(doc, 42);

    doc
      .font('Helvetica-Bold')
      .fontSize(11)
      .fillColor('#111827')
      .text(score.name, {
        continued: true,
      })
      .font('Helvetica-Oblique')
      .fontSize(10.5)
      .fillColor('#6B7280')
      .text(`  Media (0-10): ${score.base10Average.toFixed(2)}`, {
        width: state.contentWidth,
      });

    const x = doc.page.margins.left;
    const y = doc.y + 3;
    const barWidth = state.contentWidth;
    const barHeight = 10;
    const fillWidth = Math.max(0, Math.min(1, score.base10Average / 10)) * barWidth;

    doc.save();
    doc.rect(x, y, barWidth, barHeight).fill('#F3F4F6');
    doc.rect(x, y, barWidth, barHeight).lineWidth(0.8).strokeColor('#E5E7EB').stroke();
    doc.rect(x, y, fillWidth, barHeight).fill(scoreBarColor(score.id, content));
    doc.restore();
    doc.y = y + barHeight + 7;
  }

  const topOne = content.resultsOrdered[0];
  const topTwo = content.resultsOrdered[1] ?? null;
  const bottomOne = content.resultsOrdered[content.resultsOrdered.length - 1];
  const quickRead = topTwo
    ? `Leitura rapida: ${topOne.name} lidera o perfil e ${topTwo.name} atua como eixo secundario. ${bottomOne.name} aparece como menor influencia relativa no momento.`
    : `Leitura rapida: ${topOne.name} aparece como eixo dominante neste momento.`;
  writeCallout(doc, state, quickRead);
  writeDivider(doc, state);
}

function writeFullProfile(
  doc: PDFKit.PDFDocument,
  state: ReturnType<typeof createLayoutState>,
  profile: TemperamentProfile,
  sectionNumber: number,
  title: string,
): void {
  writeH2(doc, state, `${sectionNumber}. ${title}: ${profile.label}`);

  writeH3(doc, state, `${sectionNumber}.1 Visao geral`);
  writeParagraph(doc, state, profile.overview);

  writeH3(doc, state, `${sectionNumber}.2 Forcas`);
  for (const paragraph of profile.strengths) {
    writeParagraph(doc, state, paragraph);
  }

  writeH3(doc, state, `${sectionNumber}.3 Riscos`);
  for (const paragraph of profile.risks) {
    writeParagraph(doc, state, paragraph);
  }

  writeH3(doc, state, `${sectionNumber}.4 Trabalho`);
  for (const paragraph of profile.work) {
    writeParagraph(doc, state, paragraph);
  }

  writeH3(doc, state, `${sectionNumber}.5 Relacionamentos`);
  for (const paragraph of profile.relationships) {
    writeParagraph(doc, state, paragraph);
  }

  writeH3(doc, state, `${sectionNumber}.6 Praticas`);
  for (const paragraph of profile.spiritual) {
    writeParagraph(doc, state, paragraph);
  }

  writeDivider(doc, state);
}

function writeRemainingSummaries(
  doc: PDFKit.PDFDocument,
  state: ReturnType<typeof createLayoutState>,
  content: TemperamentsPdfContent,
  startNumber: number,
): void {
  if (content.remaining.length === 0 || content.remainingProfiles.length === 0) {
    return;
  }

  writeH2(doc, state, `${startNumber}. Resumo dos temperamentos restantes`);
  content.remaining.forEach((score, index) => {
    const profile = content.remainingProfiles[index];
    if (!profile) return;
    writeH3(
      doc,
      state,
      `${startNumber}.${index + 1} ${profile.label} (${score.base10Average.toFixed(2)}/10)`,
    );
    writeParagraph(doc, state, profile.overview);
    const strengths = profile.strengths.slice(0, 1).join(' ');
    const risks = profile.risks.slice(0, 1).join(' ');
    writeCallout(
      doc,
      state,
      `Forca central: ${strengths}\nRisco central: ${risks}`,
    );
  });
  writeDivider(doc, state);
}

function writeIntegratedReading(
  doc: PDFKit.PDFDocument,
  state: ReturnType<typeof createLayoutState>,
  paragraphs: string[],
  sectionNumber: number,
): void {
  writeH2(doc, state, `${sectionNumber}. Leitura integrada`);
  writeParagraph(
    doc,
    state,
    'Esta leitura combina os eixos principal e secundario sem usar templates de combinacao cruzada, focando apenas os dois temperamentos predominantes do seu resultado.',
    { italic: true },
  );

  for (const paragraph of paragraphs.slice(0, 4)) {
    writeParagraph(doc, state, paragraph);
  }
  writeDivider(doc, state);
}

function writePlans(
  doc: PDFKit.PDFDocument,
  state: ReturnType<typeof createLayoutState>,
  content: TemperamentsPdfContent,
  sectionNumber: number,
): void {
  writeH2(doc, state, `${sectionNumber}. Plano de 7 dias`);
  writeBulletList(doc, state, content.sevenDayPlan);
  writeDivider(doc, state);

  writeH2(doc, state, `${sectionNumber + 1}. Plano de 30 dias e checklist`);
  writeBulletList(doc, state, content.thirtyDayPlan);
  writeH3(doc, state, `${sectionNumber + 1}.1 Checklist final`);
  writeBulletList(doc, state, content.finalChecklist);
}

function renderTemperamentsPdfDocument(
  doc: PDFKit.PDFDocument,
  entry: StoredResult,
  content: TemperamentsPdfContent,
): void {
  const state = createLayoutState(doc);
  const mainLabel = TEMPERAMENT_LABELS_PT[content.main.id];
  const secondaryLabel = content.secondary
    ? TEMPERAMENT_LABELS_PT[content.secondary.id]
    : null;
  const comboLabel = secondaryLabel
    ? `Combinacao principal-secundaria: ${mainLabel} + ${secondaryLabel}`
    : `Combinacao principal-secundaria: ${mainLabel}`;

  writeCover(
    doc,
    state,
    'Relatorio Premium de Temperamentos',
    'Leitura completa baseada nos textos oficiais de cada temperamento em src/assets/texts.',
    {
      badge: comboLabel,
      summary:
        'Este material organiza intensidade, forcas, riscos, trabalho, relacionamentos e um plano de crescimento em ciclos de 7 e 30 dias.',
    },
  );

  writeScoreOverview(doc, state, content);
  writeFullProfile(doc, state, content.mainProfile, 2, 'Temperamento principal');

  let nextSection = 3;
  if (content.secondaryProfile) {
    writeFullProfile(
      doc,
      state,
      content.secondaryProfile,
      nextSection,
      'Temperamento secundario',
    );
    nextSection += 1;
  }

  writeRemainingSummaries(doc, state, content, nextSection);
  nextSection += 1;
  writeIntegratedReading(doc, state, content.integratedReadingParagraphs, nextSection);
  writePlans(doc, state, content, nextSection + 1);
  drawHeaderFooter(doc, { brand: 'Speculum Animae', sessionId: entry.id });
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
    compress: false,
  });

  const bufferPromise = collectPdfBuffer(doc);
  renderTemperamentsPdfDocument(doc, entry, content);
  doc.end();

  const buffer = await bufferPromise;
  return { fileName, buffer };
}
