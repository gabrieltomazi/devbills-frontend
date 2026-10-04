# 💻 DevBills - Frontend

O **DevBills** é uma plataforma moderna e intuitiva de controle financeiro pessoal. Este repositório contém o código-fonte da aplicação **frontend**, desenvolvida com foco em alta performance, tipagem estática e experiência do usuário (UI/UX) fluida e responsiva.

---

## 🏛️ Arquitetura da Aplicação

### Padrão Arquitetural: Arquitetura em Camadas Técnicas (Layered Architecture)

O frontend adota uma **Arquitetura em Camadas Técnicas (Layered Architecture)** baseada em componentes React, com separação clara de responsabilidades:

1. **Camada de Apresentação (UI Layer):** 
   - **Presentational / Dumb Components (`src/components/`, `src/layout/`):** Componentes visuais desacoplados que renderizam a interface e comunicam eventos via *props*.
   - **Smart Components / Containers (`src/pages/`):** Telas que gerenciam estado local (`useState`), efeitos (`useEffect`) e orquestram a montagem dos componentes visuais.
2. **Camada de Aplicação e Estado (Application & State Layer):**
   - **Roteamento & Guards (`src/routes/`):** Gerenciamento de rotas com React Router e proteção de telas via `PrivateRoutes.tsx`.
   - **Estado Global (`src/context/`):** Centralização da sessão do usuário via React Context API (`authContext.tsx`).
3. **Camada de Acesso a Dados (Data Access / Service Layer):**
   - **Serviços HTTP (`src/services/`):** Métodos assíncronos desacoplados (`transactionsService.ts`, `categoryService.ts`) sobre o cliente Axios centralizado (`api.ts`), com interceptors dinâmicos para envio do Bearer Token JWT do Firebase.
4. **Camada Transversal e Infraestrutura (Cross-Cutting & Infra Layer):**
   - **Contratos & Tipagens (`src/types/`):** Interfaces e DTOs TypeScript compartilhados.
   - **Configurações Externas (`src/config/`):** Inicialização do Firebase Authentication SDK (`firebase.ts`).
   - **Utilitários Puros (`src/utils/`):** Formatadores de moeda (BRL) e datas.

---

## ✨ Funcionalidades Principais

*   **🔒 Autenticação com Google**: Login rápido e seguro via popup com Google Sign-In integrado ao Firebase Authentication.
*   **📊 Dashboard Financeiro Interativo**: Cards com KPIs (Saldo, Receitas, Despesas) e gráficos visuais responsivos construídos com Recharts.
*   **💸 Gestão de Transações**: Listagem completa de movimentações financeiras com suporte a criação e exclusão.
*   **📅 Filtros Dinâmicos**: Filtragem por Categoria, Tipo (Receita/Despesa) e competência mensal/anual.
*   **🎨 UI/UX Moderna**: Interface elegante estilizada com Tailwind CSS v4, ícones do Lucide React e toasts informativos com React-Toastify.

---

## 🛠️ Tecnologias Utilizadas

*   [**React**](https://react.dev/) — Biblioteca para construção de interfaces declarativas baseadas em componentes.
*   [**TypeScript**](https://www.typescriptlang.org/) — Superset com tipagem estática rigorosa para maior previsibilidade.
*   [**Vite**](https://vite.dev/) — Build tool de alta performance com Fast Refresh e Hot Module Replacement (HMR).
*   [**Tailwind CSS**](https://tailwindcss.com/) — Framework de estilização utilitária moderna.
*   [**React Router**](https://reactrouter.com/) — Gerenciamento de rotas e proteção de páginas da SPA.
*   [**Axios**](https://axios-http.com/) — Cliente HTTP com interceptors para envio dinâmico do token Bearer JWT.
*   [**Recharts**](https://recharts.org/) — Gráficos interativos e responsivos para visualização de métricas financeiras.
*   [**Firebase Auth**](https://firebase.google.com/docs/auth) — Provedor de identidade e autenticação com Google.
*   [**Lucide React**](https://lucide.dev/) — Conjunto moderno e limpo de ícones SVG.
*   [**React Toastify**](https://fkhadra.github.io/react-toastify/) — Notificações visuais e feedbacks de ações do usuário.

---

## 📂 Estrutura de Pastas

```text
src/
├── components/         # Componentes visuais reutilizáveis (Inputs, Botões, Cards, Selects)
├── config/             # Configurações de serviços externos (Firebase Auth)
├── context/            # Contextos globais do React (AuthContext)
├── layout/             # Estrutura base da aplicação (AppLayout com Header e Footer)
├── pages/              # Telas da aplicação (Dashboard, Transações, Formulários, etc.)
├── routes/             # Definição de rotas da aplicação e guarda de autenticação
├── services/           # Comunicação HTTP e integração com a API Backend
├── types/              # Definições de tipos e interfaces do TypeScript
├── utils/              # Funções utilitárias e formatadores de dados (moeda e datas)
├── App.tsx             # Componente raiz da aplicação
├── index.css           # Estilos globais e diretivas do Tailwind CSS
└── main.tsx            # Ponto de entrada React com montagem da árvore DOM
```

---

## 🛣️ Rotas da Aplicação

| Rota | Acesso | Componente | Descrição |
| :--- | :--- | :--- | :--- |
| `/` | Pública | `HomePage` | Página inicial de apresentação da plataforma |
| `/login` | Pública | `LoginPage` | Tela de autenticação com Google Sign-In |
| `/dashboard` | 🔒 Privada | `DashboardPage` | Painel de controle com saldo, métricas e gráficos |
| `/transacoes` | 🔒 Privada | `Transactions` | Histórico e listagem de transações com filtros |
| `/transacoes/nova` | 🔒 Privada | `TransactionsForm` | Formulário para registro de nova receita ou despesa |

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente:

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
*   API Backend do DevBills em execução (por padrão em `http://localhost:3333`)

---

### Passo a Passo

1.  **Clonar o repositório**:
    ```bash
    git clone https://github.com/gabrieltomazi/devbills-frontend.git
    cd devbills-frontend
    ```

2.  **Instalar as dependências**:
    ```bash
    npm install
    ```

3.  **Configurar as Variáveis de Ambiente**:
    Crie o arquivo `.env` na raiz do projeto baseado no `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Preencha os valores com as credenciais do seu projeto Firebase e a URL da API Backend:
    ```env
    VITE_API_URL=http://localhost:3333
    VITE_FIREBASE_API_KEY=sua_api_key
    VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
    VITE_FIREBASE_PROJECT_ID=seu_project_id
    VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
    VITE_FIREBASE_APP_ID=seu_app_id
    ```

4.  **Iniciar o Servidor de Desenvolvimento**:
    ```bash
    npm run dev
    ```
    A aplicação estará disponível no endereço indicado no terminal (geralmente `http://localhost:5173`).

---

## ⚙️ Scripts Disponíveis

No diretório do projeto, você pode executar:

*   `npm run dev`: Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR).
*   `npm run build`: Compila e gera os arquivos otimizados para produção na pasta `dist/`.
*   `npm run preview`: Executa um servidor local para testar o build de produção.
*   `npm run lint`: Executa a verificação estática de código com o ESLint/Biome.

---

## 🔮 O que poderia ser feito com mais tempo? (Melhorias Futuras)

*   **🧪 Testes Automatizados**: Implementação de testes unitários e de componentes com [**Vitest**](https://vitest.dev/) e [**React Testing Library**](https://testing-library.com/), além de testes E2E com [**Playwright**](https://playwright.dev/).
*   **📊 Exportação de Relatórios**: Download de extratos financeiros em formato CSV e relatórios consolidados em PDF.
*   **👤 Personalização de Perfil**: Funcionalidade para o usuário editar seu nome de exibição e fazer upload de foto de perfil via Firebase Storage.
*   **🌓 Alternância de Tema**: Suporte a Light Mode e Dark Mode configurável pelo usuário.

