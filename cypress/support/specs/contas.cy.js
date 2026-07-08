import loginPage from '../../pages/login'
import el from './elementos.cy.js'

const CONTA_ALVO = 'Teste QA- Não excluir'

Cypress.Commands.add('acessarContaTesteProducao', () => {
  loginPage.acessar('producaoUrl')
  cy.realizarLoginProducao()

  cy.intercept('GET', '**/accounts**').as('buscaConta')

  cy.get(el.contas.campoPesquisa)
    .should('be.visible')
    .type(CONTA_ALVO)

  cy.wait('@buscaConta')

  cy.contains('.items-center', CONTA_ALVO).as('itemConta')
  cy.get('@itemConta').click()
})

Cypress.Commands.add('acessarPainelDoSiteProducao', () => {
  cy.acessarContaTesteProducao()

  cy.url().should('include', 'sites')

  cy.get(el.sidebarPainelControle.botaoPainelControle)
    .should('be.visible')
    .click()
})
