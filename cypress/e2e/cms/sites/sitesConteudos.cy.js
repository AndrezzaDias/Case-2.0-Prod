/// <reference types="cypress" />

import loginPage from '../../../pages/login'
import el from '../../../support/specs/elementos.cy'

const CONTA_ALVO = 'Teste QA- Não excluir'

describe('[CMS PROD] - [Sites - Conteúdos] - [Verificação de Conteúdo do Site]', () => {

  beforeEach(() => {
    loginPage.acessar('producaoUrl')
    cy.realizarLoginProducao()

    cy.intercept('GET', '**/accounts**').as('buscaConta')

    cy.get(el.contas.campoPesquisa)
      .should('be.visible')
      .type(CONTA_ALVO)

    cy.wait('@buscaConta')

    cy.contains('.items-center', CONTA_ALVO).as('itemConta')
    cy.get('@itemConta').click()

    cy.url().should('include', 'sites')
  })

  it('[SITES-CONT-001] - [Sites - Conteúdos] - [Deve entrar no site e validar a seção de Conteúdos]', () => {

    cy.get(':nth-child(1) > .p-6 > a.w-full > [data-cy="control-panel-button"]')
      .should('be.visible')
      .click()

    // Intercepta a API de coleções ANTES de clicar — garante que os cards
    // estarão totalmente carregados antes do screenshot (sem skeleton loaders)
    cy.intercept('GET', '**/content-types**').as('carregarColecoes')

    cy.get('[data-cy="Conteúdos-sidebar-button"]')
      .should('be.visible')
      .click()

    // Aguarda a API responder — só aí os cards reais substituem os skeletons
    cy.wait('@carregarColecoes')

    // Confirma que a seção de Coleções Disponíveis carregou
    cy.contains('Coleções Disponíveis').should('be.visible')

    // Valida que há ao menos um card de coleção na grade
    cy.get(':nth-child(3) > .flex-wrap')
      .children()
      .should('have.length.greaterThan', 0)

    // Valida que cada card está visível individualmente
    cy.get(':nth-child(3) > .flex-wrap').children().each(($item) => {
      cy.wrap($item).should('be.visible')
    })

    // Aguarda 2s para garantir renderização completa antes do print
    cy.wait(2000)
    cy.screenshot('sites/sitesConteudos-colecoes', { capture: 'fullPage' })
  })

})
