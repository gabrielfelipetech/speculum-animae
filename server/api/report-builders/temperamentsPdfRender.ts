import { Buffer } from 'node:buffer';
import PDFDocument from 'pdfkit';
import type { StoredResult } from '../results.post';
import {
  buildTemperamentsPdfContent,
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

function addSectionTitle(doc: PDFKit.PDFDocument, text: string): void {
  doc.moveDown(1.1);
  doc.font('Helvetica-Bold').fontSize(14).text(text);
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(11);
}

function addParagraph(doc: PDFKit.PDFDocument, text: string): void {
  doc.text(text, { align: 'justify' });
  doc.moveDown(0.6);
}

function addChecklist(doc: PDFKit.PDFDocument, items: string[]): void {
  for (const item of items) {
    doc.text(`- ${item}`, {
      indent: 14,
      align: 'justify',
    });
    doc.moveDown(0.2);
  }
}

function addSessionFooter(doc: PDFKit.PDFDocument, sessionId: string): void {
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const y = doc.page.height - doc.page.margins.bottom + 10;
  const previousX = doc.x;
  const previousY = doc.y;

  doc.save();
  doc.font('Helvetica')
    .fontSize(7)
    .fillColor('#6b7280')
    .text(`Session: ${sessionId}`, doc.page.margins.left, y, {
      width,
      align: 'right',
      lineBreak: false,
    });
  doc.restore();

  doc.x = previousX;
  doc.y = previousY;
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

function renderTemperamentsPdfDocument(
  doc: PDFKit.PDFDocument,
  entry: StoredResult,
  content: TemperamentsPdfContent,
): void {
  let isRenderingFooter = false;

  const renderFooter = () => {
    if (isRenderingFooter) return;

    isRenderingFooter = true;
    try {
      addSessionFooter(doc, entry.id);
    } finally {
      isRenderingFooter = false;
    }
  };

  doc.on('pageAdded', renderFooter);
  renderFooter();

  const mainLabel = TEMPERAMENT_LABELS_PT[content.main.id];
  const secondaryLabel = content.secondary
    ? TEMPERAMENT_LABELS_PT[content.secondary.id]
    : null;
  const titleCombination = secondaryLabel
    ? `${mainLabel}-${secondaryLabel}`
    : mainLabel;

  doc.font('Helvetica-Bold')
    .fontSize(18)
    .text(`Relatorio de Temperamentos - ${titleCombination}`, { align: 'center' });

  doc.moveDown(0.5);
  doc.font('Helvetica')
    .fontSize(11)
    .text(
      'Leitura premium com base textual unificada entre resultado web e PDF.',
      { align: 'center' },
    );

  addSectionTitle(doc, '1. Visao geral dos resultados');
  for (const score of content.resultsOrdered) {
    doc.text(
      `${score.name}: Media (0-10) ${score.base10Average.toFixed(2)} | ` +
        `Media (escala ${content.scale.min}-${content.scale.max}) ${score.sourceAverage.toFixed(2)}`,
    );
  }

  addSectionTitle(doc, `2. Temperamento principal: ${content.mainProfile.label}`);
  addParagraph(doc, content.mainProfile.overview);

  addSectionTitle(doc, '2.1 Forcas e virtudes-chave');
  addParagraph(doc, content.mainProfile.strengths.join(' '));

  addSectionTitle(doc, '2.2 Riscos tipicos e pontos de atencao');
  addParagraph(doc, content.mainProfile.risks.join(' '));

  addSectionTitle(doc, '2.3 Trabalho e vocacao');
  addParagraph(doc, content.mainProfile.work.join(' '));

  addSectionTitle(doc, '2.4 Relacionamentos');
  addParagraph(doc, content.mainProfile.relationships.join(' '));

  addSectionTitle(doc, '2.5 Praticas de crescimento');
  addParagraph(doc, content.mainProfile.spiritual.join(' '));

  if (content.secondary && content.secondaryProfile) {
    doc.addPage();
    addSectionTitle(
      doc,
      `3. Temperamento secundario: ${content.secondaryProfile.label}`,
    );
    addParagraph(doc, content.secondaryProfile.overview);

    addSectionTitle(doc, '3.1 Forcas e virtudes-chave');
    addParagraph(doc, content.secondaryProfile.strengths.join(' '));

    addSectionTitle(doc, '3.2 Riscos tipicos e pontos de atencao');
    addParagraph(doc, content.secondaryProfile.risks.join(' '));

    addSectionTitle(doc, '3.3 Trabalho e vocacao');
    addParagraph(doc, content.secondaryProfile.work.join(' '));

    addSectionTitle(doc, '3.4 Relacionamentos');
    addParagraph(doc, content.secondaryProfile.relationships.join(' '));
  }

  addSectionTitle(doc, '4. Leitura integrada da combinacao');
  const combinationParagraph = secondaryLabel
    ? `A combinacao ${mainLabel}-${secondaryLabel} mostra um eixo dominante no temperamento principal, ` +
      'com modulacao do secundario nos contextos de maior pressao, convivio e tomada de decisao. ' +
      'O foco pratico e integrar iniciativa, limites e ritmo para reduzir excessos e sustentar consistencia.'
    : `O eixo dominante ${mainLabel} orienta a maior parte das respostas emocionais e comportamentais. ` +
      'O foco pratico e consolidar virtudes desse perfil enquanto reduz os padroes de excesso mais recorrentes.';
  addParagraph(doc, combinationParagraph);

  addSectionTitle(doc, '5. Checklist pratico (resumo)');
  addChecklist(doc, content.mainProfile.examen ?? []);
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
    margin: 50,
  });

  const bufferPromise = collectPdfBuffer(doc);
  renderTemperamentsPdfDocument(doc, entry, content);
  doc.end();

  const buffer = await bufferPromise;
  return { fileName, buffer };
}
