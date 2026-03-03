import PDFDocument from 'pdfkit';
import { a as TEMPERAMENT_FILENAME_SLUGS } from '../../../_/premiumTemperaments.mjs';
import { buildTemperamentsCompatibilityPdfContent } from './temperamentsCompatibilityPdf.mjs';
import { c as collectPdfBuffer, a as createLayoutState, w as writeCover, b as writeDivider, d as writeH2, e as writeH3, f as writeParagraph, g as writeBulletList, h as writeCallout, i as drawHeaderFooter, j as ensureSpace } from '../../../_/layout.mjs';
import 'node:fs';
import 'node:path';
import '../../../_/normalizeScale.mjs';
import 'node:buffer';

function writeScoreOverview(doc, state, content) {
  writeH2(doc, state, "1. Visao geral da compatibilidade (0-10)");
  writeParagraph(doc, state, content.overview);
  for (const score of content.scoresOrdered) {
    ensureSpace(doc, 42);
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111827").text(score.name, {
      continued: true
    }).font("Helvetica-Oblique").fontSize(10.5).fillColor("#6B7280").text(`  Media (0-10): ${score.score.toFixed(2)}`, {
      width: state.contentWidth
    });
    const x = doc.page.margins.left;
    const y = doc.y + 3;
    const barWidth = state.contentWidth;
    const barHeight = 10;
    const fillWidth = Math.max(0, Math.min(1, score.score / 10)) * barWidth;
    doc.save();
    doc.rect(x, y, barWidth, barHeight).fill("#F3F4F6");
    doc.rect(x, y, barWidth, barHeight).lineWidth(0.8).strokeColor("#E5E7EB").stroke();
    doc.rect(x, y, fillWidth, barHeight).fill("#DC2626");
    doc.restore();
    doc.y = y + barHeight + 7;
  }
  writeCallout(
    doc,
    state,
    `Par dominante: ${content.primary.name} + ${content.secondary.name}. O objetivo nao e rotular, mas orientar acordos praticos que reduzem atrito e elevam cooperacao.`
  );
}
function renderCompatibilityPdf(doc, entry, content) {
  const state = createLayoutState(doc);
  writeCover(
    doc,
    state,
    "Relatorio de Compatibilidade de Temperamentos",
    "Leitura do par com foco em dinamicas, atritos e acordos praticos.",
    {
      badge: `Par principal: ${content.primary.name} + ${content.secondary.name}`,
      summary: "Documento estruturado em escala 0-10 com analise do par, estrategias de reparacao e plano de acordos em ciclos de 7 e 30 dias."
    }
  );
  writeScoreOverview(doc, state, content);
  writeDivider(doc, state);
  doc.addPage();
  writeH2(doc, state, "2. Dinamicas do par");
  content.pairDynamics.forEach((section) => {
    writeH3(doc, state, section.title);
    writeParagraph(doc, state, section.body);
  });
  writeDivider(doc, state);
  doc.addPage();
  writeH2(doc, state, "3. Pontos de atrito e estrategias");
  writeParagraph(
    doc,
    state,
    "Atrito recorrente costuma surgir quando expectativas nao combinadas viram cobrancas acumuladas. O foco desta secao e traduzir tensao em acordos verificaveis."
  );
  writeBulletList(doc, state, content.frictionStrategies);
  writeCallout(
    doc,
    state,
    "Regra de ouro: desacordo nao precisa virar desgaste. A combinacao de fatos observaveis, tempo de resposta e proximo passo reduz ciclos improdutivos."
  );
  writeDivider(doc, state);
  doc.addPage();
  writeH2(doc, state, "4. Leitura dos perfis complementares");
  content.scoresOrdered.forEach((score, index) => {
    writeH3(doc, state, `4.${index + 1} ${score.name}`);
    writeParagraph(
      doc,
      state,
      `${score.name} aparece com ${score.score.toFixed(2)}/10 no contexto da compatibilidade. A recomendacao e usar essa energia como recurso de cooperacao, evitando exageros de controle ou omissao.`
    );
    writeParagraph(
      doc,
      state,
      `Aplicacao pratica: traduzir a contribuicao de ${score.name} em um comportamento observavel na rotina semanal, com criterio de validacao definido e revisao quinzenal.`
    );
  });
  writeDivider(doc, state);
  doc.addPage();
  writeH2(doc, state, "5. Plano de 7 dias");
  writeBulletList(doc, state, [
    "Dia 1: alinhar expectativas da semana em 3 prioridades objetivas.",
    "Dia 2: definir limite de tom de conversa e sinal de pausa acordado.",
    "Dia 3: executar uma conversa de ajuste com foco em comportamento observavel.",
    "Dia 4: revisar distribuicao de responsabilidades praticas.",
    "Dia 5: registrar um aprendizado de conflito e uma melhoria concreta.",
    "Dia 6: reservar tempo de conexao sem pauta de problemas.",
    "Dia 7: fechar semana com revisao de acordos e proximo passo."
  ]);
  writeDivider(doc, state);
  doc.addPage();
  writeH2(doc, state, "6. Plano de acordos praticos (30 dias)");
  writeBulletList(doc, state, content.practicalAgreements);
  writeCallout(
    doc,
    state,
    "Checklist final: todo acordo precisa ter dono, prazo e criterio de validacao. Sem esses tres elementos, o combinado vira apenas intencao."
  );
  writeDivider(doc, state);
  doc.addPage();
  writeH2(doc, state, "7. Checklist de monitoramento mensal");
  writeBulletList(doc, state, [
    "Revisamos prioridades da semana com antecedencia minima de 24 horas?",
    "As conversas de conflito terminaram com ao menos um proximo passo verificavel?",
    "O tom da comunicacao permaneceu dentro dos limites definidos pelo casal?",
    "As responsabilidades praticas foram redistribuidas sem sobrecarregar uma unica pessoa?",
    "Houve ritual de conexao semanal sem pauta de cobranca?",
    "Os acordos de reparacao foram cumpridos no prazo combinado?",
    "Os dois lados registraram aprendizados de conflito em linguagem objetiva?",
    "As divergencias de ritmo foram tratadas com previsibilidade e sem punicao silenciosa?",
    "A agenda do casal contemplou descanso, tarefas e convivio em equilibrio realista?",
    "Os gatilhos recorrentes foram nomeados com fatos, nao com rotulos pessoais?",
    "Foi feita revisao quinzenal de progresso dos acordos ativos?",
    "Existe um ajuste concreto para o proximo ciclo de 30 dias?"
  ]);
  writeCallout(
    doc,
    state,
    "Fechamento do ciclo: persistencia em micro-acordos bem definidos produz mais resultado do que grandes promessas sem acompanhamento."
  );
  drawHeaderFooter(doc, {
    brand: "Speculum Animae",
    sessionId: entry.id
  });
}
async function generateTemperamentsCompatibilityPdfBinary(entry) {
  const content = buildTemperamentsCompatibilityPdfContent(entry);
  const primarySlug = TEMPERAMENT_FILENAME_SLUGS[content.primary.id];
  const secondarySlug = TEMPERAMENT_FILENAME_SLUGS[content.secondary.id];
  const fileName = `relatorio-compatibilidade-temperamentos-${primarySlug}-${secondarySlug}.pdf`;
  const doc = new PDFDocument({
    size: "A4",
    margin: 56,
    bufferPages: true,
    compress: false
  });
  const bufferPromise = collectPdfBuffer(doc);
  renderCompatibilityPdf(doc, entry, content);
  doc.end();
  const buffer = await bufferPromise;
  return { fileName, buffer };
}

export { generateTemperamentsCompatibilityPdfBinary };
//# sourceMappingURL=temperamentsCompatibilityPdfRender.mjs.map
