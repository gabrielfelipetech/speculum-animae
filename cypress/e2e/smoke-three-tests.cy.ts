type ResultPayload = {
  slug: 'temperaments' | 'twelve-layers' | 'temperaments-compatibility';
  results: { groupId: string; name: string; average: number }[];
  title: string;
};

function visitRunner(slug: string, clientId: string): void {
  cy.visit(`/testes/${slug}?fresh=1`, {
    onBeforeLoad(window) {
      window.localStorage.setItem('sa:clientId', clientId);
    },
  });
  cy.get('[data-test-step-container]', { timeout: 15000 }).should('exist');
}

function createAndOpenResult(
  sessionId: string,
  clientId: string,
  payload: ResultPayload,
): void {
  cy.request('POST', '/api/results', {
    sessionId,
    clientId,
    slug: payload.slug,
    results: payload.results,
    topSummaries: [],
    meta: {
      title: payload.title,
      subtitle: 'Smoke regression',
      groupsLabel: 'Bloco',
    },
  }).its('status').should('eq', 200);

  cy.visit(`/resultados/${sessionId}`, {
    onBeforeLoad(window) {
      window.localStorage.setItem('sa:clientId', clientId);
    },
  });

  cy.contains(/Resultado indispon/i).should('not.exist');
  cy.get('h1', { timeout: 15000 }).should('exist');
  cy.get('body')
    .invoke('text')
    .then((text) => {
      expect(text).to.not.match(/1-7/);
      expect(text).to.not.match(/\/\s*7/);
      expect(text).to.not.match(/\/\s*5/);
    });
}

describe('smoke three enabled tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('keeps temperaments, temperaments-compatibility and twelve-layers flows available', () => {
    const runId = Date.now();
    const clientId = `e2e-client-smoke-${runId}`;

    cy.visit('/testes');
    cy.get('section.mx-auto.max-w-5xl a[href^="/testes/"]').then(($links) => {
      const hrefs = [...$links]
        .map((link) => link.getAttribute('href') || '')
        .filter((href) => href.includes('?fresh=1'));

      expect(hrefs).to.have.length(3);
      expect(hrefs.some((href) => href.startsWith('/testes/temperaments?'))).to.equal(
        true,
      );
      expect(
        hrefs.some((href) => href.startsWith('/testes/temperaments-compatibility?')),
      ).to.equal(true);
      expect(hrefs.some((href) => href.startsWith('/testes/twelve-layers?'))).to.equal(
        true,
      );
    });

    visitRunner('temperaments', clientId);
    createAndOpenResult(`result-smoke-temp-${runId}`, clientId, {
      slug: 'temperaments',
      title: 'Temperamentos',
      results: [
        { groupId: 'sanguine', name: 'Sanguineo', average: 6.5 },
        { groupId: 'choleric', name: 'Colerico', average: 6.0 },
        { groupId: 'melancholic', name: 'Melancolico', average: 4.1 },
        { groupId: 'phlegmatic', name: 'Fleumatico', average: 3.7 },
      ],
    });

    visitRunner('twelve-layers', clientId);
    createAndOpenResult(`result-smoke-12-${runId}`, clientId, {
      slug: 'twelve-layers',
      title: '12 Camadas',
      results: [
        { groupId: 'layer-1', name: 'Camada 1', average: 6.6 },
        { groupId: 'layer-2', name: 'Camada 2', average: 6.1 },
        { groupId: 'layer-3', name: 'Camada 3', average: 5.6 },
        { groupId: 'layer-4', name: 'Camada 4', average: 4.4 },
        { groupId: 'layer-5', name: 'Camada 5', average: 3.8 },
        { groupId: 'layer-6', name: 'Camada 6', average: 2.9 },
      ],
    });

    visitRunner('temperaments-compatibility', clientId);
    createAndOpenResult(`result-smoke-compat-${runId}`, clientId, {
      slug: 'temperaments-compatibility',
      title: 'Compatibilidade de Temperamentos',
      results: [
        { groupId: 'choleric', name: 'Colerico', average: 6.2 },
        { groupId: 'sanguine', name: 'Sanguineo', average: 5.7 },
        { groupId: 'phlegmatic', name: 'Fleumatico', average: 4.9 },
        { groupId: 'melancholic', name: 'Melancolico', average: 3.6 },
      ],
    });
  });
});
