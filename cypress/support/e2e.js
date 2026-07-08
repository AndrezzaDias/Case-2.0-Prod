import './commands'

// Ignora erros de hidratação do React (minified #418/#423) que ocorrem no
// carregamento do site público e não representam falha real do fluxo testado.
Cypress.on('uncaught:exception', (err) => {
  if (/Minified React error #(418|423)/.test(err.message)) {
    return false
  }
})
