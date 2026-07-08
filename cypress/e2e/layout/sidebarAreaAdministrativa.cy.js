/// <reference types="cypress" />

import loginPage from '../../pages/login'
import el from '../../support/specs/elementos.cy'

describe('[PROD] - [Layout] - [Sidebar Área Administrativa]', () => {

  beforeEach(() => {
    loginPage.acessar('producaoUrl')
    cy.realizarLoginProducao()
  })

  it('[SIDEBAR-ADM-001] - [Sidebar Área Administrativa] - [Deve exibir o logo e o label]', () => {
    cy.get(el.sidebarAdministrativa.logo).should('be.visible')
    cy.contains('Área Administrativa').should('be.visible')
  })

  it('[SIDEBAR-ADM-002] - [Sidebar Área Administrativa] - [Deve exibir os itens principais do menu]', () => {
    cy.get(el.sidebarAdministrativa.contas).should('be.visible')
    cy.get(el.sidebarAdministrativa.administradores).should('be.visible')
    cy.get(el.sidebarAdministrativa.tiposConteudo).should('be.visible')
    cy.get(el.sidebarAdministrativa.integradores).should('be.visible')
    cy.contains('div.flex.items-center.gap-2', 'Paddock').should('be.visible')
  })

  it('[SIDEBAR-ADM-003] - [Sidebar Área Administrativa] - [Deve exibir o menu Templates com seus submenus]', () => {
    cy.contains('div.flex.items-center.gap-2', 'Templates').should('be.visible').click()
    cy.get(el.sidebarAdministrativa.sites).should('be.visible')
    cy.get(el.sidebarAdministrativa.paginas).should('be.visible')
    cy.get(el.sidebarAdministrativa.modulos).should('be.visible')
  })

  it('[SIDEBAR-ADM-004] - [Sidebar Área Administrativa] - [Deve exibir a seção Outros]', () => {
    cy.contains('Outros').should('be.visible')
    cy.contains('Central de Ajuda').should('be.visible')
    cy.contains('Sair').should('be.visible')
  })

})
