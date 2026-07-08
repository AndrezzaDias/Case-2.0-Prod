/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR'
import el from '../../../support/specs/elementos.cy'

describe('[PROD] - [Leads] - [Envio de Lead pelo Site Público]', () => {
  const nome = faker.person.fullName()
  const email = faker.internet.email().toLowerCase()
  const telefone = '(11) 99999-9999'

  it('[LEADS-001] - [Leads] - [Deve enviar um lead pelo site e conferir que aparece na listagem]', () => {
    cy.intercept('POST', '**/conversions').as('enviarLead')

    cy.visit('https://8d08f7eb-5906-4f27-9d94-819bf7f44523.preview-v2.autodromo.com.br/')
    cy.contains('Aceitar').click()

    cy.get('[name="name"]').type(nome)
    cy.get('[name="email"]').type(email)
    cy.get('[name="phone"]').type(telefone)
    cy.get('[name="message"]').type('Lead de automação QA - ignorar')
    cy.get(':nth-child(1) > [name="contactPreference[]"]').check()
    cy.get(':nth-child(2) > [name="contactPreference[]"]').check()
    cy.get('[name="marketingConsent[]"]').check()
    cy.get('.sc-c7d92de3-0 > .sc-3675ea87-0').click()

    cy.wait('@enviarLead').then(({ request, response }) => {
      expect(response.statusCode).to.be.oneOf([200, 201, 202])
      expect(request.body).to.include({ name: nome, email, phone: telefone })
    })

    cy.contains('Obrigado!').should('be.visible')

    cy.acessarContaTesteProducao()
    cy.contains('button', 'Leads').click()
    cy.get(el.sidebarWorkspace.listagem).click()
    cy.contains(nome).should('be.visible')
  })
})
