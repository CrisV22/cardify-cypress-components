// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('alertErrorHaveText', (expectedText) => {
  cy.contains('.alert-error', expectedText)
    .should('be.visible')
})

Cypress.Commands.add('fillCardForm', (card) => {
  cy.get('[data-cy="number"]').type(card.number)
  cy.get('[data-cy="holderName"]').type(card.holderName)
  cy.get('[data-cy="expirationDate"]').type(card.expirationDate)
  cy.get('[data-cy="cvv"]').type(card.cvv)
  // Implementado data-cy dinâmico com: data-cy={`bank-${bank.value}`}
  cy.get(`[data-cy="bank-${card.bank}"]`).click()
})

Cypress.Commands.add('submitCardForm', () => {
  cy.get('[data-cy="save-my-card"').click()
})
