/// <reference types="cypress" />

import loginPage from '../../../pages/login'
import el from '../../../support/specs/elementos.cy'

const CONTA_ALVO = 'Teste QA- Não excluir'

describe('[CMS PROD] - [Sites] - [Verificação de Renderização]', () => {

  beforeEach(() => {
    loginPage.acessar('producaoUrl')
    cy.realizarLoginProducao()
  })

  it('[SITES-001] - [Sites] - [Deve pesquisar, acessar a conta e validar que os cards de sites estão carregando]', () => {

    cy.intercept('GET', '**/accounts**').as('buscaConta')

    cy.get(el.contas.campoPesquisa)
      .should('be.visible')
      .type(CONTA_ALVO)

    cy.wait('@buscaConta')

    cy.contains('.items-center', CONTA_ALVO).as('itemConta')
    cy.get('@itemConta').click()

    cy.url().should('include', 'sites')

    cy.contains('Acessar site', { timeout: 15000 }).should('be.visible')
    cy.contains('Painel de Controle').should('be.visible')

    cy.wait(2000)
    cy.screenshot('sites/sites-cards-carregados', { capture: 'fullPage' })
  })

  it('[SITES-002] - [Sites] - [Deve criar um novo site e excluí-lo ao final]', () => {

    const NOME_SITE = 'Validação automação de site'

    // Pesquisa e acessa a conta
    cy.intercept('GET', '**/accounts**').as('buscaConta')

    cy.get(el.contas.campoPesquisa)
      .should('be.visible')
      .type(CONTA_ALVO)

    cy.wait('@buscaConta')

    cy.contains('.items-center', CONTA_ALVO).as('itemConta')
    cy.get('@itemConta').click()

    cy.url().should('include', 'sites')

    // Abre o fluxo de criação de novo site
    cy.get('button').contains('Novo site').click()

    // Preenche o nome do site
    cy.get('[data-cy="input-title"]').type(NOME_SITE)

    // Avança para o próximo passo
    cy.get('[data-cy="next-step-site"]').click()

    // Seleciona o template vazio
    cy.get('[data-cy="select-template-empty"]').click()

    // Abre o dropdown de tipo de página e seleciona Painel de Controle
    cy.get('.inline-flex > .flex').click()
    cy.contains('Painel de Controle').click()

    // Valida que o site foi criado com o nome correto
    cy.get('div.gap-2 > .flex-col > .text-lg', { timeout: 15000 })
      .should('contain', NOME_SITE)

    cy.wait(2000)
    cy.screenshot('sites/site-criado', { capture: 'fullPage' })

    // --- EXCLUSÃO DO SITE CRIADO ---

    cy.get('[data-cy="domain-button"]')
      .should('be.visible')
      .click()

    cy.get('.md\\:flex-row.gap-6 > .md\\:flex-col > :nth-child(6)')
      .should('be.visible')
      .click()

    cy.get('.rounded-lg.flex-col > .inline-flex')
      .should('be.visible')
      .click()

    cy.get('[data-cy="name-input"]')
      .should('be.visible')
      .type(NOME_SITE)

    cy.get('[data-cy="confirm-button"]')
      .should('be.visible')
      .click()

    cy.contains('excluído', { timeout: 10000 }).should('be.visible')

    cy.wait(2000)
    cy.screenshot('sites/site-excluido', { capture: 'fullPage' })
  })

})
