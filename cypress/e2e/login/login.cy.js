/// <reference types="cypress" />

import loginPage from '../../pages/login'
import el from '../../support/specs/elementos.cy'

describe('[PROD] - [Login] - [Verificação de Acesso]', () => {

  beforeEach(() => {
    loginPage.acessar('producaoUrl')
  })

  it('[LOGIN-001] - [Login] - [Deve logar com sucesso e redirecionar para Contas]', () => {
    cy.realizarLoginProducao()

    cy.url().should('include', 'contas')
  })

  it('[LOGIN-002] - [Login] - [Não deve logar com senha incorreta]', () => {
    const email = Cypress.env('email-producao')
    const seletores = el.loginProducao

    loginPage
      .preencherUsuario(seletores.campoUsuario, email)
      .preencherSenha(seletores.campoSenha, 'senha-incorreta-teste')
      .clicarBotaoLogin(seletores.botaoLogin)

    cy.url().should('not.include', 'contas')
  })

  it('[LOGIN-003] - [Login] - [Não deve logar com campos vazios]', () => {
    cy.get(el.loginProducao.botaoLogin).click()

    cy.url().should('not.include', 'contas')
  })

})
