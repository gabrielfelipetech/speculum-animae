describe('tests catalog only three', () => {
  it('shows only the three enabled tests on /testes', () => {
    const expectedSlugs = [
      'temperaments',
      'temperaments-compatibility',
      'twelve-layers',
    ].sort();

    cy.visit('/testes');

    cy.get('section.mx-auto.max-w-5xl a[href^="/testes/"]').then(($links) => {
      const hrefs = [...$links]
        .map((link) => link.getAttribute('href') || '')
        .filter((href) => href.includes('?fresh=1'));

      expect(hrefs).to.have.length(3);

      const slugs = hrefs
        .map((href) => href.split('?')[0].replace('/testes/', ''))
        .sort();

      expect(slugs).to.deep.equal(expectedSlugs);
    });
  });

  it('renders runner for temperaments', () => {
    cy.visit('/testes/temperaments?fresh=1');
    cy.get('[data-test-step-container]', { timeout: 15000 }).should('exist');
  });

  it('rejects unknown slug route', () => {
    cy.visit('/testes/some-old-slug', { failOnStatusCode: false });

    cy.location('pathname').then((pathname) => {
      if (pathname === '/testes') {
        cy.contains('h1', /testes/i).should('exist');
        return;
      }

      expect(pathname).to.equal('/testes/some-old-slug');
      cy.contains(/P.gina n.o encontrada/i).should('exist');
    });
  });
});
