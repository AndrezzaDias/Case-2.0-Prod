/// <reference types="cypress" />

const elementos = {

  loginProducao: {
    campoUsuario: '[id="email"]',
    campoSenha: '[id="password"]',
    botaoLogin: '[data-cy="enter-button"]'
  },

  contas: {
    campoPesquisa: '.md\\:gap-0 > :nth-child(1) > .relative > .flex',
    itemConta: '.min-w-\\[200px\\] > .items-center',
    totais: '.text-2xl.text-foreground.font-bold',
    tabela: '.\\[\\&_tr\\:last-child\\]\\:border-0'
  },

  cms: {
    botaoConteudos: '[data-cy="Conteúdos-sidebar-button"]',
    sites: {
      tituloPagina: 'h1, h2, [class*="title"], [class*="heading"]',
      listaSites: 'table tbody tr, [class*="list"] [class*="item"], [class*="card"]',
      campoBusca: '[placeholder*="Buscar site"], [placeholder*="buscar"], input[type="search"]',
      botaoNovoSite: '[class*="button"]:contains("Novo site"), button:contains("Novo site")'
    }
  },

  sidebarAdministrativa: {
    logo: 'svg[width="186"][height="24"]',
    contas: '[data-cy="Contas-sidebar-button"]',
    administradores: '[data-cy="Administradores-sidebar-button"]',
    tiposConteudo: '[data-cy="Tipos de conteúdo-sidebar-button"]',
    integradores: '[data-cy="Integradores-sidebar-button"]',
    sites: '[data-cy="Sites-sidebar-button"]',
    paginas: '[data-cy="Páginas-sidebar-button"]',
    modulos: '[data-cy="Módulos-sidebar-button"]'
  },

  sidebarWorkspace: {
    sites: '[data-cy="Sites-sidebar-button"]',
    conteudos: '[data-cy="Conteúdos-sidebar-button"]',
    unidades: '[data-cy="Unidades-sidebar-button"]',
    configuracoes: '[data-cy="Configurações-sidebar-button"]',
    integradores: '[data-cy="Integradores-sidebar-button"]',
    listagem: '[data-cy="Listagem-sidebar-button"]',
    equipes: '[data-cy="Equipes-sidebar-button"]'
  },

  sidebarPainelControle: {
    painelDeControle: '[data-cy="Painel de controle-sidebar-button"]',
    conteudos: '[data-cy="Conteúdos-sidebar-button"]',
    informacoes: '[data-cy="Informações-sidebar-button"]',
    unidades: '[data-cy="Unidades-sidebar-button"]',
    whatsapp: '[data-cy="WhatsApp-sidebar-button"]',
    integracoes: '[data-cy="Integrações-sidebar-button"]',
    dominio: '[data-cy="Domínio-sidebar-button"]',
    cookies: '[data-cy="Cookies-sidebar-button"]',
    scripts: '[data-cy="Scripts-sidebar-button"]',
    acoesSensiveis: '[data-cy="Ações sensíveis-sidebar-button"]',
    header: '[data-cy="Header-sidebar-button"]',
    footer: '[data-cy="Footer-sidebar-button"]',
    botaoPainelControle: ':nth-child(1) > .p-6 > a.w-full > [data-cy="control-panel-button"]'
  }

}

export default elementos
