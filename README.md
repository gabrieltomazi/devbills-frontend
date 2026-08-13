# 💻 DevBills - Frontend

O **DevBills** é uma plataforma moderna e intuitiva de controle financeiro pessoal. Este repositório contém o código-fonte do **frontend** da aplicação, construído utilizando práticas modernas de desenvolvimento web para proporcionar uma experiência fluida, rápida e responsiva ao usuário.

---

## ✨ Funcionalidades Principais

*   **🔒 Autenticação Integrada**: Login rápido e seguro utilizando o Google Sign-In por meio do Firebase Authentication.
*   **📊 Dashboard Financeiro**: Gráficos dinâmicos e interativos que mostram a distribuição de despesas por categoria, saldo total, receitas e despesas mensais.
*   **💸 Gestão de Transações**: Tela dedicada para listagem completa de transações com suporte a criação, filtros e exclusão.
*   **📅 Filtros Avançados**: Filtre suas transações por Categoria, Tipo (Receita/Despesa) e competência (Mês/Ano).
*   **🎨 Design Premium**: Interface moderna construída com Tailwind CSS v4, suporte a feedback visual dinâmico com toasts de notificação.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e bibliotecas:

*   [**React**](https://react.dev/) — Biblioteca para construção de interfaces.
*   [**TypeScript**](https://www.typescriptlang.org/) — Tipagem estática para maior segurança e produtividade.
*   [**Vite**](https://vite.dev/) — Build tool ultra rápida para o ecossistema web.
*   [**Tailwind CSS**](https://tailwindcss.com/) — Framework utilitário para estilização rápida e moderna.
*   [**Axios**](https://axios-http.com/) — Cliente HTTP para comunicação com a API do backend.
*   [**Recharts**](https://recharts.org/) — Biblioteca de gráficos interativos para React.
*   [**Firebase Auth**](https://firebase.google.com/docs/auth) — Serviço de autenticação em nuvem.


---

## 📂 Estrutura de Pastas

Abaixo está a organização de pastas dentro do diretório `src/`:

```text
src/
├── config/         # Configurações de serviços externos (Firebase, API)
├── context/        # Contextos do React (como AuthContext)
├── pages/          # Páginas principais da aplicação (Dashboard, Formulários, etc.)
├── components/     # Componentes visuais reutilizáveis (Inputs, Botões, Selects)
├── services/       # Chamadas de API e integração com o backend
├── types/          # Declaração de interfaces e tipos do TypeScript
└── utils/          # Funções utilitárias e formatadores
```

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente:

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

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
    Duplique o arquivo `.env.example` e renomeie-o para `.env`:
    ```bash
    cp .env.example .env
    ```
    Preencha os valores das chaves do Firebase e a URL da sua API Backend:
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
    A aplicação estará disponível no endereço indicado no seu terminal (geralmente `http://localhost:5173`).

---

## ⚙️ Scripts Disponíveis

No diretório do projeto, você pode executar:

*   `npm run dev`: Executa a aplicação em modo de desenvolvimento.
*   `npm run build`: Compila a aplicação para produção (gera os arquivos otimizados na pasta `dist`).
*   `npm run lint`: Executa a checagem de erros do linter (ESLint / Biome).
*   `npm run preview`: Visualiza localmente a build de produção gerada.
