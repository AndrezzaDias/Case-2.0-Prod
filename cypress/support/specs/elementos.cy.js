/// <reference types="cypress" />

const elementos = {

  loginProducao: {
    campoUsuario: '[id="email"]',
    campoSenha: '[id="password"]',
    botaoLogin: '[data-cy="enter-button"]'
  },

  contas: {
    campoPesquisa: '.md\\:gap-0 > :nth-child(1) > .relative > .flex',
    itemConta: '.min-w-\\[200px\\] > .items-center'
  },

  cms: {
    botaoConteudos: '[data-cy="Conteúdos-sidebar-button"]',
    sites: {
      tituloPagina: 'h1, h2, [class*="title"], [class*="heading"]',
      listaSites: 'table tbody tr, [class*="list"] [class*="item"], [class*="card"]',
      campoBusca: '[placeholder*="Buscar site"], [placeholder*="buscar"], input[type="search"]',
      botaoNovoSite: '[class*="button"]:contains("Novo site"), button:contains("Novo site")'
    }
  }

}

export default elementos
