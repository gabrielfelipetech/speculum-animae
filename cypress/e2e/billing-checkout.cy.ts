describe('billing checkout and portal with mock provider', () => {
  const mockPlans = [
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
  ];

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('loads plans and starts checkout', () => {
    cy.intercept('GET', '**/api/billing/plans*', {
      statusCode: 200,
      body: {
        plans: mockPlans,
        customer: {
          isLoggedIn: false,
          isPremium: false,
        },
      },
    }).as('plansRequest');

    cy.intercept('POST', '**/api/billing/checkout*', {
      statusCode: 200,
      body: { url: '/planos?checkout=mock-success' },
    }).as('checkoutRequest');

    cy.visit('/planos');
    cy.wait('@plansRequest', { timeout: 20000 });
    cy.get('[data-cy="plan-action-free"]').should('be.visible');
    cy.get('[data-cy="plan-action-premium_monthly"]').should('be.visible');
    cy.get('[data-cy="plan-action-premium_annual"]').should('be.visible');
    cy.get('[data-cy="plan-action-premium_annual"]').click();
    cy.wait('@checkoutRequest')
      .its('request.body')
      .should('include', { plan: 'premium_annual', planId: 'premium_annual' });
    cy.url().should('include', '/planos?checkout=mock-success');
  });

  it('opens portal when customer is premium', () => {
    cy.intercept('GET', '**/api/billing/plans*', {
      statusCode: 200,
      body: {
        plans: mockPlans,
        customer: {
          isLoggedIn: true,
          isPremium: true,
        },
      },
    }).as('plansRequest');

    cy.intercept('POST', '**/api/billing/portal*', {
      statusCode: 200,
      body: { url: '/planos?portal=mock' },
    }).as('portalRequest');

    cy.visit('/planos');
    cy.wait('@plansRequest', { timeout: 20000 });
    cy.contains('button', 'Gerenciar assinatura').first().click();
    cy.wait('@portalRequest');
    cy.url().should('include', '/planos?portal=mock');
  });
});
