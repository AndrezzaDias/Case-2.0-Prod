/// <reference types="cypress" />

import el from '../../support/specs/elementos.cy'

describe('[PROD] - [Layout] - [Sidebar Painel de Controle do Site]', () => {

  beforeEach(() => {
    cy.acessarPainelDoSiteProducao()
  })

  it('[SIDEBAR-PC-001] - [Sidebar Painel de Controle] - [Deve exibir os itens de configuração]', () => {
    cy.get(el.sidebarPainelControle.painelDeControle).should('be.visible')
    cy.get(el.sidebarPainelControle.conteudos).should('be.visible')
    cy.get(el.sidebarPainelControle.informacoes).should('be.visible')
    cy.get(el.sidebarPainelControle.unidades).should('be.visible')
    cy.get(el.sidebarPainelControle.whatsapp).should('be.visible')
    cy.get(el.sidebarPainelControle.integracoes).should('be.visible')
    cy.get(el.sidebarPainelControle.dominio).should('be.visible')
  })

  it('[SIDEBAR-PC-002] - [Sidebar Painel de Controle] - [Deve exibir o menu Formulários com seus submenus]', () => {
    cy.contains('Formulários').should('be.visible').click()
    cy.get(el.sidebarPainelControle.cookies).should('be.visible')
    cy.get(el.sidebarPainelControle.scripts).should('be.visible')
    cy.get(el.sidebarPainelControle.acoesSensiveis).should('be.visible')
  })

  it('[SIDEBAR-PC-003] - [Sidebar Painel de Controle] - [Deve exibir a seção Global]', () => {
    cy.get(el.sidebarPainelControle.header).should('be.visible')
    cy.get(el.sidebarPainelControle.footer).should('be.visible')
  })

})
