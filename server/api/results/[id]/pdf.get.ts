// server/api/results/[id]/pdf.get.ts
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';
import { sendStream, type H3Event } from 'h3';
import PDFDocument from 'pdfkit';
import type PDFKit from 'pdfkit';
import type { StoredResult } from '../../results.post';
import { buildTemperamentsPdfContent } from '../../report-builders/temperamentsPdf';

interface StoredResultRow {
  session_id: string;
  slug: StoredResult['slug'];
  user_id: string | null;
  client_id: string | null;
  results: StoredResult['results'];
  top_summaries: StoredResult['topSummaries'] | null;
  meta: StoredResult['meta'] | null;
  created_at: string;
}

async function loadStoredResult(
  event: H3Event,
  id: string,
): Promise<StoredResult | null> {
  // usuário logado (pode ser null)
  const user = await serverSupabaseUser(event).catch(() => null);

  // 1) tenta pelo Supabase
  try {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('session_id', id)
      .maybeSingle<StoredResultRow>();

    if (!error && data) {
      if (data.user_id && (!user || user.id !== data.user_id)) {
        throw createError({
          statusCode: 403,
          message: 'Você não tem permissão para ver estes resultados.',
        });
      }

      return {
        id: data.session_id,
        slug: data.slug,
        userId: data.user_id,
        email: null,
        clientId: data.client_id,
        results: data.results,
        topSummaries: data.top_summaries ?? undefined,
        meta: data.meta ?? undefined,
        timestamp: data.created_at,
      };
    }

    if (error) {
      console.error(
        '[Supabase] erro ao buscar resultado para PDF, fallback storage',
        error,
      );
    }
  } catch (err) {
    console.error(
      '[Supabase] erro inesperado ao buscar resultado para PDF',
      err,
    );
  }

  // 2) fallback: storage local
  const storage = useStorage<StoredResult[]>('results');
  const all = (await storage.getItem('items')) ?? [];
  const entry = all.find((item) => item.id === id) ?? null;

  if (!entry) return null;

  if (entry.userId && (!user || user.id !== entry.userId)) {
    throw createError({
      statusCode: 403,
      message: 'Você não tem permissão para ver estes resultados.',
    });
  }

  return entry;
}

function addSectionTitle(doc: PDFKit.PDFDocument, text: string) {
  doc.moveDown(1.2);
  doc.fontSize(14).font('Helvetica-Bold').text(text);
  doc.moveDown(0.3);
  doc.fontSize(11).font('Helvetica');
}

function addBulletList(doc: PDFKit.PDFDocument, items: string[]) {
  items.forEach((item) => {
    doc.text(`• ${item}`, {
      indent: 15,
      align: 'justify',
    });
    doc.moveDown(0.1);
  });
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID de sessão não informado.',
    });
  }

  const entry = await loadStoredResult(event, id);

  if (!entry) {
    throw createError({
      statusCode: 404,
      message: 'Resultados não encontrados para geração de PDF.',
    });
  }

  if (entry.slug !== 'temperaments') {
    throw createError({
      statusCode: 400,
      message:
        'Relatório PDF disponível apenas para o teste de temperamentos neste momento.',
    });
  }

  const content = buildTemperamentsPdfContent(entry);

  setHeader(event, 'Content-Type', 'application/pdf');
  setHeader(
    event,
    'Content-Disposition',
    `attachment; filename="relatorio-temperamentos-${id}.pdf"`,
  );

  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
  });

  const stream = doc as unknown as NodeJS.ReadableStream;

  // CAPA
  doc.font('Helvetica-Bold')
    .fontSize(18)
    .text('Relatório completo de temperamentos', { align: 'center' });

  doc.moveDown(0.5);
  doc.fontSize(12).font('Helvetica');
  doc.text(
    entry.meta?.title ??
      'Temperamentos Clássicos (Colérico, Melancólico, Sanguíneo e Fleumático)',
    { align: 'center' },
  );

  doc.moveDown(0.5);
  doc.fontSize(9).text(`ID da sessão: ${entry.id}`, { align: 'center' });
  doc.moveDown(2);

  // 1. Visão geral
  addSectionTitle(doc, '1. Visão geral dos resultados');

  content.resultsOrdered.forEach((r) => {
    doc.text(`${r.name}: média ${r.average.toFixed(2)} / 5`, {
      align: 'left',
    });
  });

  // 2. Principal
  addSectionTitle(
    doc,
    `2. Temperamento principal: ${content.mainProfile.label}`,
  );

  doc.text(content.mainProfile.overview, { align: 'justify' });

  addSectionTitle(doc, '2.1 Forças e virtudes-chave');
  addBulletList(doc, content.mainProfile.strengths);

  addSectionTitle(doc, '2.2 Riscos típicos e pontos de atenção');
  addBulletList(doc, content.mainProfile.risks);

  addSectionTitle(doc, '2.3 No trabalho e na vocação profissional');
  addBulletList(doc, content.mainProfile.work);

  addSectionTitle(doc, '2.4 Nos relacionamentos afetivos e amizades');
  addBulletList(doc, content.mainProfile.relationships);

  addSectionTitle(doc, '2.5 Na família e na vida doméstica');
  addBulletList(doc, content.mainProfile.family);

  addSectionTitle(doc, '2.6 Na vida espiritual');
  addBulletList(doc, content.mainProfile.spiritual);

  // 3. Secundário + combinação
  if (content.secondary && content.secondaryProfile) {
    doc.addPage();

    addSectionTitle(
      doc,
      `3. Temperamento secundário: ${content.secondaryProfile.label}`,
    );

    doc.text(content.secondaryProfile.overview, { align: 'justify' });

    addSectionTitle(doc, '3.1 Forças específicas desse temperamento');
    addBulletList(doc, content.secondaryProfile.strengths);

    addSectionTitle(doc, '3.2 Riscos e desequilíbrios mais comuns');
    addBulletList(doc, content.secondaryProfile.risks);

    addSectionTitle(
      doc,
      '3.3 Trabalho, decisões de carreira e estilo de execução',
    );
    addBulletList(doc, content.secondaryProfile.work);

    addSectionTitle(
      doc,
      '3.4 Dinâmica afetiva: como esse temperamento se expressa nos vínculos',
    );
    addBulletList(doc, content.secondaryProfile.relationships);

    addSectionTitle(
      doc,
      '3.5 Papel na família, no casamento e na educação dos filhos',
    );
    addBulletList(doc, content.secondaryProfile.family);

    addSectionTitle(doc, '3.6 Dinâmica espiritual desse temperamento');
    addBulletList(doc, content.secondaryProfile.spiritual);

    doc.addPage();
    addSectionTitle(
      doc,
      `4. Como a combinação ${content.mainProfile.label} + ${content.secondaryProfile.label} se manifesta`,
    );

    doc.text(
      `Sua combinação dominante é formada por ${content.mainProfile.label} (principal) e ${content.secondaryProfile.label} (secundário). ` +
        'Na prática, isso significa que o modo como você reage rapidamente segue o padrão do temperamento principal, ' +
        'enquanto o secundário colore o estilo, a sensibilidade e o ritmo com que você vive essas mesmas reações.',
      { align: 'justify' },
    );

    doc.moveDown(0.8);
    doc.text(
      'O temperamento não é uma sentença nem uma desculpa, mas um ponto de partida. ' +
        'A maturidade consiste em reconhecer seus padrões espontâneos, agradecer pelas forças que você recebeu ' +
        'e trabalhar com paciência nas áreas frágeis, integrando razão, vontade e afetividade.',
      { align: 'justify' },
    );
  }

  doc.end();

  return sendStream(event, stream);
});
