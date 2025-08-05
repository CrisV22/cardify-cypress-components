import React from 'react'
import AddCard from './AddCard'

describe('<AddCard />', () => {
  const myCard = {
    number: '4242424242424242',
    holderName: 'Cristian Oliveira',
    expirationDate: '12/35',
    cvv: '123',
    bank: 'neon'
  }

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)
  })

  it('Exibe erros quando os campos não são informados', () => {
    // Função mount para montar o componente
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)

    cy.contains('button', 'Adicionar Cartão').click()

    // Abordagem 1: só contains
    // Abordagem 2: data-cy + texto
    // cy.contains('[data-cy='alert-error']', 'Número do cartão é obrigatório')
    // Abordagem 3: CSS selector que faça sentido

    // Abordagem 4:
    const alerts = [
      'Número do cartão é obrigatório',
      'Nome do titular é obrigatório',
      'Data de expiração é obrigatória',
      'CVV é obrigatório',
      'Selecione um banco',
    ]

    alerts.forEach(alert => {
      cy.alertErrorHaveText(alert)
    });
  })

  it('Deve cadastrar um novo cartão de crédito', () => {
    const myCard = {
      number: '4242424242424242',
      holderName: 'Cristian Oliveira',
      expirationDate: '12/35',
      cvv: '123',
      bank: 'neon'
    }

    // Espalha o objeto com ...
    cy.fillCardForm(myCard)

    // INTERCEPTION
    cy.intercept('POST', 'http://wallet.cardfify.dev/api/cards', (req) => {
      req.reply({
        statusCode: 201,
        body: myCard
      })
    }).as('addCard')

    cy.submitCardForm()

    cy.wait('@addCard')

    // Criado CSS com base em comportamento com .notice-sucess
    cy.get('.notice-message')
      .should('be.visible')
      .and('have.text', 'Cartão cadastrado com suceÇo!')
  })

  it('Valida nome do titular com menos de 2 caracteres', () => {
    cy.fillCardForm({...myCard, holderName: 'C'})
    cy.submitCardForm()

    cy.alertErrorHaveText('Nome deve ter pelo menos 2 caracteres')
  })

  it('Valida data de expiração inválida', () => {
    cy.fillCardForm({...myCard, expirationDate: '13/35'})
    cy.submitCardForm()

    cy.alertErrorHaveText('Data de expiração inválida ou vencida')
  })

  it('Valida CVV com menos de 3 dígitos', () => {
    const myCard = {
      number: '4242424242424242',
      holderName: 'Cristian Oliveira',
      expirationDate: '12/35',
      cvv: '12',
      bank: 'neon'
    }

    cy.fillCardForm({...myCard, cvv: '12'})
    cy.submitCardForm()
    cy.alertErrorHaveText('CVV deve ter 3 ou 4 dígitos')
  })
})