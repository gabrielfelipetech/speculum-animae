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

    cy.visit('/planos?auth=1', {
      onBeforeLoad(window) {
        cy.spy(window.console, 'error').as('consoleError');
      },
    });

    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="auth-email"]').length > 0) {
        return;
      }
      cy.get('[data-cy="open-auth-modal"]').should('be.visible').click({ force: true });
    });

    cy.get('[data-cy="auth-email"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy="auth-forgot-password"]').should('be.visible').click();
    cy.get('[data-cy="auth-email"]').type('tester@example.com');
    cy.get('[data-cy="auth-submit"]').click();

    cy.wait('@passwordResetRequest');
    cy.get('[data-cy="auth-feedback-success"]').should(
      'contain.text',
      'Se este e-mail existir',
    );
    cy.get('[data-cy="auth-feedback-error"]').should('not.exist');
  });
});
