import { buildTemperamentsResultPayload } from '../support/temperaments-fixtures';

describe('temperaments pdf endpoint', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('returns valid headers, filename without uuid and normalized content', () => {
    const runId = Date.now();
    const sessionId = `result-temperaments-pdf-${runId}`;
    const clientId = `e2e-client-pdf-${runId}`;
    const payload = buildTemperamentsResultPayload('sanguine', 'choleric');

    cy.request('POST', '/api/results', {
      sessionId,
      clientId,
      ...payload,
    }).its('status').should('eq', 200);

    cy.request({
      url: `/api/results/${sessionId}/pdf?clientId=${clientId}`,
      encoding: 'binary',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(String(response.headers['content-type'])).to.contain('application/pdf');
      expect(response.body.length).to.be.greaterThan(80_000);

      const disposition = String(response.headers['content-disposition'] ?? '');
      expect(disposition).to.contain('inline');
      expect(disposition).to.contain(
        'filename="relatorio-temperamentos-sanguineo-colerico.pdf"',
      );
      expect(disposition).to.not.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/i);

      const base64 = Cypress.Buffer.from(response.body, 'binary').toString('base64');
      cy.task('parsePdfText', { base64 }).then((parsed) => {
        const text = String((parsed as { text?: string }).text ?? '').toLowerCase();
        expect(text).to.not.contain('1-7');
        expect(text).to.not.match(/\/\s*5/);
      });
    });
  });
});
