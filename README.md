# AutomaçãoCase 2.0 - Prod

Automação de testes E2E em **produção** para validar que o CMS Autódromo está no ar e renderizando corretamente.

---

## 🛠 Tecnologias

- [Cypress](https://www.cypress.io/) v15
- GitHub Actions (CI/CD)

---

## 📁 Estrutura dos Testes

```
cypress/e2e/
├── cms/
│   ├── conteudos/
│   │   └── conteudos.cy.js        → Valida as coleções da conta (Blog, Seminovos)
│   └── sites/
│       ├── sites.cy.js            → Valida listagem e criação de sites
│       └── sitesConteudos.cy.js   → Valida conteúdos dentro de um site
├── login/
│   └── login.cy.js                → Valida login com sucesso, senha incorreta e campos vazios
├── layout/
│   ├── sidebarAreaAdministrativa.cy.js  → Valida a sidebar da Área Administrativa
│   ├── sidebarWorkspaceSite.cy.js       → Valida a sidebar de Workspace e a tela de Sites
│   └── sidebarPainelDeControle.cy.js    → Valida a sidebar do Painel de Controle do site
└── contas/
    ├── contas.cy.js                → Smoke test: totais e listagem de contas
    └── leads/
        └── envioDeLead.cy.js       → Envia um lead pelo site público e confere na listagem
```

---

## 🧪 O que cada teste valida

### `conteudos.cy.js`
- Faz login na conta **Teste QA- Não excluir**
- Acessa a seção **Conteúdos da Conta**
- Valida que as coleções **Blog** e **Seminovos** estão visíveis
- Valida que os contadores de cada coleção são maiores que zero

### `sites.cy.js`
**SITES-001** — Listagem de sites
- Faz login e acessa a conta
- Valida que os cards de sites estão renderizando
- Confirma que os botões **Acessar site** e **Painel de Controle** estão visíveis

**SITES-002** — Criação e exclusão de site
- Cria um novo site chamado `Validação automação de site`
- Seleciona template e página inicial
- Valida que o site foi criado com sucesso
- Exclui o site ao final para não deixar lixo em produção

### `sitesConteudos.cy.js`
- Acessa o **Painel de Controle** do primeiro site da lista
- Clica em **Conteúdos** na sidebar
- Valida que todas as **Coleções Disponíveis** estão visíveis na tela

### `login.cy.js`
- Faz login com credenciais válidas e valida o redirecionamento para **Contas**
- Tenta logar com senha incorreta e valida que **não** é redirecionado
- Tenta logar com os campos vazios e valida que **não** é redirecionado

### `sidebarAreaAdministrativa.cy.js`
- Faz login e valida o logo e o label **Área Administrativa**
- Valida os itens principais do menu (Contas, Administradores, Tipos de conteúdo, Integradores, Paddock)
- Abre o menu **Templates** e valida os submenus (Sites, Páginas, Módulos)
- Valida a seção **Outros** (Central de Ajuda, Sair)

### `sidebarWorkspaceSite.cy.js`
- Acessa a conta de teste e valida os itens do menu Workspace (Sites, Conteúdos, Unidades, Configurações, Integradores)
- Abre o menu **Leads** e valida os submenus (Listagem, Equipes)
- Valida os itens da Área Administrativa (Contas, Administradores, Templates, Paddock)
- Valida os elementos da tela de Sites (título, "Acessar site", "Painel de Controle")

### `sidebarPainelDeControle.cy.js`
- Acessa o Painel de Controle do site e valida os itens de configuração (Painel de controle, Conteúdos, Informações, Unidades, WhatsApp, Integrações, Domínio)
- Abre o menu **Formulários** e valida os submenus (Cookies, Scripts, Ações sensíveis)
- Valida a seção **Global** (Header, Footer)

### `contas.cy.js`
- Faz login e valida que o **Total de contas** é igual à soma de **Contas de clientes** e **Total de contas de teste**
- Valida que a tabela de contas carrega com ao menos uma linha

### `envioDeLead.cy.js`
- Acessa o site público **Site da Automação [Não alterar]**
- Preenche e envia o formulário de conversão de lead (nome, e-mail, telefone, mensagem, preferência de contato e consentimento de marketing)
- Valida que a requisição de conversão retorna sucesso (200/201/202) com os dados enviados
- Valida a mensagem **"Obrigado!"**
- Acessa **Leads → Listagem** na conta de teste e confere que o lead enviado aparece

> ⚠️ O botão de envio usa um seletor gerado por CSS-in-JS (`.sc-c7d92de3-0 > .sc-3675ea87-0`), confirmado manualmente no site — se um novo deploy do site mudar essas classes, ajuste o seletor em [cypress/e2e/contas/leads/envioDeLead.cy.js](cypress/e2e/contas/leads/envioDeLead.cy.js).
>
> O site público apresenta erros de hidratação do React (`Minified React error #418/#423`) no carregamento inicial; eles são ignorados em [cypress/support/e2e.js](cypress/support/e2e.js) pois não afetam o fluxo de envio do lead.

---

## ▶️ Como rodar localmente

**Pré-requisito:** ter o arquivo `cypress.env.json` na raiz do projeto com as credenciais:



```bash
# Instalar dependências
npm install

# Abrir interface visual
npm run cy:open

# Rodar todos os testes em headless
npm run cy:run

# Rodar apenas os testes de CMS
npx cypress run --spec "cypress/e2e/cms/**/*.cy.js" --browser chrome

# Rodar login, layout e contas
npx cypress run --spec "cypress/e2e/login/**/*.cy.js,cypress/e2e/layout/**/*.cy.js,cypress/e2e/contas/**/*.cy.js" --browser chrome
```

---

## ⚙️ Comandos Customizados

| Comando | Descrição |
|---|---|
| `cy.realizarLoginProducao()` | Realiza login com as credenciais de `email-producao`/`senha-producao` |
| `cy.acessarContaTesteProducao()` | Faz login, pesquisa e acessa a conta **Teste QA- Não excluir** |
| `cy.acessarPainelDoSiteProducao()` | Acessa a conta de teste e entra no Painel de Controle do primeiro site |

---

## 🚀 Pipeline CI/CD

Os testes rodam no **GitHub Actions** automaticamente a cada **push** ou **pull request** para `main`, e também podem ser disparados manualmente.

**Para executar manualmente:**
1. Acesse a aba **Actions** no repositório
2. Selecione **CMS Prod - Testes Automatizados**
3. Clique em **Run workflow**
4. Escolha um spec específico ou deixe em branco para rodar todos

> ⚠️ Como os testes rodam contra **produção** e incluem criação/exclusão de site e envio de um lead real, todo push/PR para `main` dispara essas ações — evite pushes desnecessários nessa branch.

Os screenshots aparecem diretamente no **Job Summary** ao final da execução.

---

## 🔐 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `producaoUrl` | URL de acesso ao admin |
| `email-producao` | E-mail de login |
| `senha-producao` | Senha de login |

> **Local:** configure no `cypress.env.json` (nunca suba este arquivo para o Git)
>
> **CI:** configure nas **Secrets** do repositório GitHub

---

## 📸 Screenshots

Gerados automaticamente após cada execução e organizados em:

```
cypress/screenshots/
├── conteudo/
└── sites/
```
