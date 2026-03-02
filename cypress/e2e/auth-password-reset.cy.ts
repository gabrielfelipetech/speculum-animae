describe('auth password reset flow', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('submits reset request and shows success feedback', () => {
    cy.intercept('POST', '**/auth/v1/recover*', {
      statusCode: 200,
      body: {},
    }).as('passwordResetRequest');

    cy.visit('/planos?auth=1');
    cy.window().its('__NUXT__', { timeout: 20000 }).should('exist');
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="auth-email"]').length > 0) {
        return;
      }
      cy.get('[data-cy="open-auth-modal"]').should('be.visible').click({ force: true });
    });

    cy.get('[data-cy="auth-email"]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-cy="auth-forgot-password"]').should('be.visible').click();
    cy.get('[data-cy="auth-reset-email"]').should('be.visible').clear().type('tester@example.com');
    cy.get('[data-cy="auth-reset-submit"]').click();

    cy.wait('@passwordResetRequest', { timeout: 20000 });
    cy.get('[data-cy="auth-feedback-success"]').should(
      'contain.text',
      'Se este e-mail existir',
    );
    cy.get('[data-cy="auth-feedback-error"]').should('not.exist');
  });
});
