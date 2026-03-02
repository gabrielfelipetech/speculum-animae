describe('tests page last-result redirect', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('redirects to the last result with actor key', () => {
    const sessionId = `result-melancholic-redirect-${Date.now()}`;
    const clientId = `e2e-client-redirect-${Date.now()}`;
    const slug = 'temperamentos-classicos';

    cy.fixture('result-temperaments-melancholic.json').then((fixtureReport) => {
      cy.intercept('GET', `**/api/results/${sessionId}*`, {
        statusCode: 200,
        body: {
          ...fixtureReport,
          sessionId,
        },
      }).as('resultRequest');
    });

    cy.visit(`/testes/${slug}`, {
      onBeforeLoad(window) {
        window.localStorage.setItem('sa:clientId', clientId);
        window.localStorage.setItem(
          `sa:lastResult:c:${clientId}:${slug}`,
          sessionId,
        );
        window.localStorage.setItem(`sa:lastResult:${slug}`, sessionId);
      },
    });

    cy.url({ timeout: 10000 }).should('include', `/resultados/${sessionId}`);
    cy.wait('@resultRequest');
    cy.contains('h1', 'Melancolico').should('exist');
  });
});
