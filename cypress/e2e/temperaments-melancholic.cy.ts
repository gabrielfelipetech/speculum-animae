describe('temperaments melancholic rendering', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('renders melancholic report content without fallback errors', () => {
    const sessionId = `result-melancholic-render-${Date.now()}`;
    const clientId = 'e2e-client-render';

    cy.fixture('result-temperaments-melancholic.json').then((fixtureReport) => {
      cy.intercept('GET', `**/api/results/${sessionId}*`, {
        statusCode: 200,
        body: {
          ...fixtureReport,
          sessionId,
        },
      }).as('resultRequest');
    });

    cy.visit(`/resultados/${sessionId}`, {
      onBeforeLoad(window) {
        window.localStorage.setItem('sa:clientId', clientId);
      },
    });

    cy.contains('h1', 'Melancolico', { timeout: 15000 }).should('exist');
    cy.contains('Retrato de temperamento', { timeout: 15000 }).should('exist');
    cy.contains('Resultado indisponivel').should('not.exist');
  });
});
