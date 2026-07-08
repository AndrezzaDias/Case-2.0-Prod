/// <reference types="cypress" />

import loginPage from '../../pages/login'
import el from '../../support/specs/elementos.cy'

describe('[PROD] - [Contas] - [Smoke Test]', () => {

  beforeEach(() => {
    loginPage.acessar('producaoUrl')
    cy.realizarLoginProducao()
  })

  it('[CONTAS-001] - [Contas] - [O total de contas deve bater com a soma de contas de clientes e contas de teste]', () => {
    cy.get(el.contas.totais).then(($valores) => {
      const contasDeClientes = parseInt($valores.eq(1).text())
      const totalDeContasDeTeste = parseInt($valores.eq(2).text())
      const totalDeContas = parseInt($valores.eq(3).text())

      expect(totalDeContas).to.eq(contasDeClientes + totalDeContasDeTeste)
    })
  })

  it('[CONTAS-002] - [Contas] - [A tabela de contas deve carregar com itens]', () => {
    cy.get(el.contas.tabela).find('tr').should('have.length.greaterThan', 0)
  })

})
