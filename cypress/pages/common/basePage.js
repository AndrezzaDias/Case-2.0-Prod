/// <reference types="cypress" />

class basePage {

  clicar(selector, options = {}) {
    cy.get(selector).click(options)
    return this
  }

  preencher(selector, texto) {
    cy.get(selector)
      .should('be.visible')
      .clear()
      .type(texto)
    return this
  }

  deveConterTexto(selector, texto) {
    cy.get(selector).should('contain.text', texto)
    return this
  }

  limparDados() {
    cy.clearCookies()
    cy.clearLocalStorage()
    return this
  }

  recarregar() {
    cy.reload()
    return this
  }

  interceptarApi(method, url) {
    cy.intercept(method, url).as('apiCheck')
    return this
  }

  aguardarApi() {
    cy.wait('@apiCheck').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201, 304])
    })
    return this
  }
}

export default basePage
