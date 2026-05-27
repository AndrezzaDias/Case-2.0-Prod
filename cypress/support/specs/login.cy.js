import loginPage from '../../pages/login'
import el from './elementos.cy.js'

Cypress.Commands.add('realizarLoginProducao', () => {
  const email = Cypress.env('email-producao')
  const senha = Cypress.env('senha-producao')
  const seletores = el.loginProducao

  loginPage.preencherUsuario(seletores.campoUsuario, email)
  loginPage.preencherSenha(seletores.campoSenha, senha)
  loginPage.interceptarApi('GET', '**/accounts**')
  loginPage.clicarBotaoLogin(seletores.botaoLogin)
  loginPage.aguardarApi()
})
