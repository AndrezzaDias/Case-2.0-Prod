/// <reference types="cypress" />

import el from '../../support/specs/elementos.cy'

describe('[PROD] - [Layout] - [Sidebar Workspace do Site]', () => {

  beforeEach(() => {
    cy.acessarContaTesteProducao()
  })

  it('[SIDEBAR-WS-001] - [Sidebar Workspace] - [Deve exibir os itens do menu Workspace]', () => {
    cy.get(el.sidebarWorkspace.sites).should('be.visible')
    cy.get(el.sidebarWorkspace.conteudos).should('be.visible')
    cy.get(el.sidebarWorkspace.unidades).should('be.visible')
    cy.get(el.sidebarWorkspace.configuracoes).should('be.visible')
    cy.get(el.sidebarWorkspace.integradores).should('be.visible')
  })

  it('[SIDEBAR-WS-002] - [Sidebar Workspace] - [Deve exibir o menu Leads com seus submenus]', () => {
    cy.contains('button', 'Leads').should('be.visible').click()
    cy.get(el.sidebarWorkspace.listagem).should('be.visible')
    cy.get(el.sidebarWorkspace.equipes).should('be.visible')
  })

  it('[SIDEBAR-WS-003] - [Sidebar Workspace] - [Deve exibir os itens da Área Administrativa]', () => {
    cy.get(el.sidebarAdministrativa.contas).should('be.visible')
    cy.get(el.sidebarAdministrativa.administradores).should('be.visible')
    cy.contains('div.flex.items-center.gap-2', 'Templates').should('be.visible')
    cy.contains('div.flex.items-center.gap-2', 'Paddock').should('be.visible')
  })

  it('[SIDEBAR-WS-004] - [Sidebar Workspace] - [Deve exibir a seção Outros]', () => {
    cy.contains('Central de Ajuda').should('be.visible')
  })

  it('[SIDEBAR-WS-005] - [Sidebar Workspace] - [Deve exibir os elementos da tela de Sites]', () => {
    cy.contains('span.text-2xl.font-semibold.text-foreground', 'Sites').should('be.visible')
    cy.contains('Acessar site').should('be.visible')
    cy.contains('button', 'Painel de Controle').should('be.visible')
  })

})
