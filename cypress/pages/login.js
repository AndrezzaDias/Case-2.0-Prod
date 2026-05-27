/// <reference types="cypress" />

import basePage from './common/basePage'

class LoginPage extends basePage {

  acessar(urlEnvKey) {
    const url = Cypress.env(urlEnvKey)
    cy.visit(url)
    return this
  }

  preencherUsuario(elemento, usuario) {
    this.preencher(elemento, usuario)
    return this
  }

  preencherSenha(elemento, senha) {
    this.preencher(elemento, senha)
    return this
  }

  clicarBotaoLogin(elemento) {
    this.clicar(elemento)
    return this
  }

  limparDadosPagina() {
    this.limparDados()
    return this
  }
}

export default new LoginPage()
