import {
  TEMPERAMENTS,
  buildTemperamentsResultPayload,
  type TemperamentId,
} from '../support/temperaments-fixtures';

type Pair = {
  primary: TemperamentId;
  secondary: TemperamentId;
};

const FILE_NAME_SLUGS: Record<TemperamentId, string> = {
  choleric: 'colerico',
  sanguine: 'sanguineo',
  phlegmatic: 'fleumatico',
  melancholic: 'melancolico',
};

const UI_NAMES: Record<TemperamentId, string> = {
  choleric: 'Colerico',
  sanguine: 'Sanguineo',
  phlegmatic: 'Fleumatico',
  melancholic: 'Melancolico',
};

const ALL_PAIRS: Pair[] = TEMPERAMENTS.flatMap((primary) =>
  TEMPERAMENTS.filter((secondary) => secondary !== primary).map((secondary) => ({
    primary,
    secondary,
  })),
);

const SMOKE_PAIRS: Pair[] = [
  { primary: 'choleric', secondary: 'sanguine' },
  { primary: 'melancholic', secondary: 'phlegmatic' },
  { primary: 'sanguine', secondary: 'choleric' },
];

const mode = String(Cypress.env('CYPRESS_TEMPERAMENT_COMBOS') || '').toLowerCase();
const pairs = mode === 'smoke' ? SMOKE_PAIRS : ALL_PAIRS;

describe('temperaments combinatorial report and pdf', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  pairs.forEach(({ primary, secondary }, index) => {
    it(`renders and downloads ${primary} -> ${secondary}`, () => {
      const runId = `${Date.now()}-${index}`;
      const sessionId = `result-combo-${primary}-${secondary}-${runId}`;
      const clientId = `e2e-client-combo-${runId}`;
      const payload = buildTemperamentsResultPayload(primary, secondary);

      cy.request('POST', '/api/results', {
        sessionId,
        clientId,
        ...payload,
      }).its('status').should('eq', 200);

      cy.visit(`/resultados/${sessionId}`, {
        onBeforeLoad(window) {
          window.localStorage.setItem('sa:clientId', clientId);
        },
      });

      cy.get('h1', { timeout: 15000 })
        .invoke('text')
        .then((title) => {
          expect(title).to.include(UI_NAMES[primary]);
          expect(title).to.include(UI_NAMES[secondary]);
        });

      cy.contains(/escala 1-7/i).should('not.exist');
      cy.get('body').invoke('text').then((bodyText) => {
        expect(bodyText).to.not.match(/\/\s*5/);
        expect(bodyText).to.not.match(/1-7/);
      });

      cy.request({
        url: `/api/results/${sessionId}/pdf?clientId=${clientId}`,
        encoding: 'binary',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(String(response.headers['content-type'])).to.contain('application/pdf');
        expect(response.body.length).to.be.greaterThan(80_000);

        const expectedFileName =
          `filename="relatorio-temperamentos-${FILE_NAME_SLUGS[primary]}-${FILE_NAME_SLUGS[secondary]}.pdf"`;
        const disposition = String(response.headers['content-disposition'] ?? '');
        expect(disposition).to.contain(expectedFileName);
        expect(disposition).to.not.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/i);

        const base64 = Cypress.Buffer.from(response.body, 'binary').toString('base64');
        cy.task('parsePdfText', { base64 }).then((parsed) => {
          const text = String((parsed as { text?: string }).text ?? '').toLowerCase();
          expect(text).to.not.contain('1-7');
          expect(text).to.not.match(/\/\s*5/);
          expect(text).to.contain(UI_NAMES[primary].toLowerCase());
          expect(text).to.contain(UI_NAMES[secondary].toLowerCase());
        });
      });
    });
  });
});
