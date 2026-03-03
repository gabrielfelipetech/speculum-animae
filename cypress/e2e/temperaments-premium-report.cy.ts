describe('temperaments premium report', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('renders premium sections from assets text and keeps scale display in base 0-10', () => {
    const runId = Date.now();
    const sessionId = `result-temperaments-premium-${runId}`;
    const clientId = `e2e-client-premium-${runId}`;

    cy.request('POST', '/api/results', {
      sessionId,
      clientId,
      slug: 'temperaments',
      results: [
        { groupId: 'sanguine', name: 'Sanguineo', average: 6.8 },
        { groupId: 'choleric', name: 'Colerico', average: 6.2 },
        { groupId: 'melancholic', name: 'Melancolico', average: 4.2 },
        { groupId: 'phlegmatic', name: 'Fleumatico', average: 3.9 },
      ],
      topSummaries: [],
      meta: {
        title: 'Temperamentos',
        subtitle: 'Premium report',
        groupsLabel: 'Bloco',
      },
    }).its('status').should('eq', 200);

    cy.visit(`/resultados/${sessionId}`, {
      onBeforeLoad(window) {
        window.localStorage.setItem('sa:clientId', clientId);
      },
    });

    cy.contains('Retrato de temperamento', { timeout: 15000 }).should('exist');
    cy.get('h1').invoke('text').then((title) => {
      const normalized = title.toLowerCase();
      expect(normalized).to.include('temperamento');
      expect(title).to.include('Sanguineo');
      expect(title).to.include('Colerico');
      expect(title).to.not.include(sessionId);
    });

    cy.get('body').invoke('text').then((text) => {
      const scoreMatches = [...text.matchAll(/Media \(0-10\):\s*([0-9]+(?:\.[0-9]+)?)/g)];
      expect(scoreMatches.length).to.be.greaterThan(0);

      for (const match of scoreMatches) {
        const value = Number(match[1]);
        expect(value).to.be.at.least(0);
        expect(value).to.be.at.most(10);
      }
    });

    cy.get('#traits article p').its('length').should('be.greaterThan', 0);
    cy.get('#career article p').its('length').should('be.greaterThan', 0);
    cy.get('#growth article p').its('length').should('be.greaterThan', 0);
    cy.get('#relationships article p').its('length').should('be.greaterThan', 0);
    cy.get('#traits ul, #career ul, #growth ul, #relationships ul').should('have.length', 0);
  });
});
