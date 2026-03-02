describe('billing checkout and portal with mock provider', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('loads plans and starts checkout', () => {
    cy.visit('/planos');
    cy.scrollTo('top');
    cy.get('[data-cy="plan-action-premium_annual"]')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/planos?checkout=mock-success');
  });

  it('opens portal when customer is premium', () => {
    cy.intercept('GET', '**/api/billing/plans', {
      statusCode: 200,
      body: {
        plans: [
          {
            key: 'free',
            name: 'Essencial',
            description: 'Para explorar os testes principais.',
            price: { id: 'price_free', unitAmount: 0, currency: 'BRL' },
            features: ['Resultados essenciais'],
            ctaLabel: 'Comecar agora',
          },
          {
            key: 'premium_monthly',
            name: 'Premium mensal',
            description: 'Flexibilidade para ir mais fundo.',
            price: {
              id: 'price_premium_monthly',
              unitAmount: 2900,
              currency: 'BRL',
              interval: 'month',
              intervalCount: 1,
            },
            features: ['Relatorios completos'],
            ctaLabel: 'Assinar mensal',
          },
          {
            key: 'premium_annual',
            name: 'Premium anual',
            description: 'Economia para quem leva a jornada a serio.',
            price: {
              id: 'price_premium_annual',
              unitAmount: 29000,
              currency: 'BRL',
              interval: 'year',
              intervalCount: 1,
            },
            features: ['Tudo do plano mensal'],
            ctaLabel: 'Assinar anual',
            highlight: true,
          },
        ],
        customer: {
          isLoggedIn: true,
          isPremium: true,
        },
      },
    }).as('plansPremiumRequest');

    cy.intercept('POST', '**/api/billing/portal', {
      statusCode: 200,
      body: { url: '/planos?portal=mock' },
    }).as('portalRequest');

    cy.visit('/planos');
    cy.wait('@plansPremiumRequest');
    cy.contains('button', 'Gerenciar assinatura').first().click();
    cy.wait('@portalRequest');
    cy.url().should('include', '/planos?portal=mock');
  });
});
