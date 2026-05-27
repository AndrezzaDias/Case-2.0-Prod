# AutomaçãoCase 2.0 - Prod

Automação de testes E2E em **produção** para validar que o CMS Autódromo está no ar e renderizando corretamente.

---

## 🛠 Tecnologias

- [Cypress](https://www.cypress.io/) v15
- GitHub Actions (CI/CD)

---

## 📁 Estrutura dos Testes

```
cypress/e2e/cms/
├── conteudos/
│   └── conteudos.cy.js       → Valida as coleções da conta (Blog, Seminovos)
└── sites/
    ├── sites.cy.js            → Valida listagem e criação de sites
    └── sitesConteudos.cy.js   → Valida conteúdos dentro de um site
```

---

## 🧪 O que cada teste valida

### `conteudos.cy.js`
- Faz login na conta **Teste QA - Não excluir**
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
```

---

## 🚀 Pipeline CI/CD

Os testes rodam no **GitHub Actions** de forma manual.

**Para executar:**
1. Acesse a aba **Actions** no repositório
2. Selecione **CMS Prod - Testes Automatizados**
3. Clique em **Run workflow**
4. Escolha um spec específico ou deixe em branco para rodar todos

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
