/// <reference types="cypress" />

import loginPage from '../../../pages/login'
import el from '../../../support/specs/elementos.cy'

const CONTA_ALVO = 'Teste QA- Não excluir'

describe('[CMS PROD] - [Conteúdos] - [Verificação de Renderização]', () => {

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

    cy.url().should('not.include', 'contas?page=1')

    // Intercepta a API de coleções ANTES de clicar em Conteúdos
    cy.intercept('GET', '**/content-types**').as('carregarConteudos')

    cy.get(el.cms.botaoConteudos)
      .should('be.visible')
      .click()

    // Aguarda a API de coleções responder — só aí os cards estarão no DOM
    cy.wait('@carregarConteudos')

    cy.url().should('include', 'conteudos')
  })

  it('[CMS-001] - [Conteúdos] - [Deve exibir as coleções carregadas após acessar Conteúdos]', () => {
    // Confirma que o título da página está visível
    cy.contains('Conteúdos da Conta').should('be.visible')

    // Confirma que a seção "Minhas Coleções" carregou com ao menos um card
    cy.contains('Minhas Coleções').should('be.visible')

    // Valida que a coleção Blog existe e seu contador é maior que zero
    cy.get('[title="Blog"]', { timeout: 15000 }).should('be.visible')
      .parent()
      .find('.inline-flex')
      .invoke('text')
      .then((texto) => {
        expect(parseInt(texto)).to.be.greaterThan(0)
      })

    // Valida que a coleção Seminovos existe e seu contador é maior que zero
    cy.get('[title="Seminovos"]').should('be.visible')
      .parent()
      .find('.inline-flex')
      .invoke('text')
      .then((texto) => {
        expect(parseInt(texto)).to.be.greaterThan(0)
      })

    // Aguarda 2s para garantir renderização completa antes do print
    cy.wait(2000)
    cy.screenshot('conteudo/cms-conteudos-carregados', { capture: 'fullPage' })
  })

})
