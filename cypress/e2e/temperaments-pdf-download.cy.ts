describe('temperaments pdf endpoint', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('returns a valid PDF response', () => {
    const runId = Date.now();
    const sessionId = `result-melancholic-pdf-${runId}`;
    const clientId = `e2e-client-pdf-${runId}`;

    cy.request('POST', '/api/results', {
      sessionId,
      clientId,
      slug: 'temperaments',
      results: [
        { groupId: 'phlegmatic', name: 'Fleumatico', average: 6.2 },
        { groupId: 'melancholic', name: 'Melancolico', average: 5.1 },
        { groupId: 'sanguine', name: 'Sanguineo', average: 4.0 },
        { groupId: 'choleric', name: 'Colerico', average: 3.4 }
      ],
      topSummaries: [],
      meta: {
        title: 'Temperamentos',
        subtitle: 'Resultado para PDF',
        groupsLabel: 'Bloco'
      },
    }).its('status').should('eq', 200);

    cy.request({
      url: `/api/results/${sessionId}/pdf?clientId=${clientId}`,
      encoding: 'binary',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.contain('application/pdf');
      expect(response.body.length).to.be.greaterThan(50_000);
    });
  });
});
