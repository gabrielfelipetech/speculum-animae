describe('temperaments pdf filename', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('serves PDF with primary-secondary filename and no uuid in filename', () => {
    const runId = Date.now();
    const sessionId = `result-temperaments-pdf-name-${runId}`;
    const clientId = `e2e-client-pdf-name-${runId}`;

    cy.request('POST', '/api/results', {
      sessionId,
      clientId,
      slug: 'temperaments',
      results: [
        { groupId: 'sanguine', name: 'Sanguineo', average: 6.7 },
        { groupId: 'choleric', name: 'Colerico', average: 6.1 },
        { groupId: 'melancholic', name: 'Melancolico', average: 4.3 },
        { groupId: 'phlegmatic', name: 'Fleumatico', average: 3.8 },
      ],
      topSummaries: [],
      meta: {
        title: 'Temperamentos',
        subtitle: 'PDF filename validation',
        groupsLabel: 'Bloco',
      },
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
      expect(disposition).to.not.contain(sessionId);
    });
  });
});
