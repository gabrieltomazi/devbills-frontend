# ⚙️ DevBills - Backend

O **DevBills** é uma plataforma moderna e intuitiva de controle financeiro pessoal. Este repositório contém o código-fonte da **API REST (backend)** da aplicação, desenvolvida com foco em alta performance, tipagem estática e segurança.

---

> [!AVISO]
> **Nota sobre a Hospedagem (Render):** Esta API está hospedada no plano gratuito do **Render**. Consequentemente, após alguns minutos de inatividade, a aplicação entra em modo de repouso. A primeira requisição feita à API pode demorar cerca de **50 a 60 segundos** para responder (tempo necessário para o servidor "acordar"). As chamadas seguintes serão instantâneas.

---

## 🏛️ Arquitetura da Aplicação

### Padrão Arquitetural: MVC

Diferente de uma arquitetura em camadas tradicional rígida (como *Controller-Service-Repository*), este backend adota um **padrão direto centrado em Controllers (Route-Controller-Data Pattern)**:

```mermaid
graph TD
    Client([Cliente / Frontend]) --> Routes["1. Camada de Rotas (Fastify Routes)"]
    Routes --> Middleware["2. Interceptor de Segurança (auth.middleware)"]
    Middleware --> Controller["3. Camada de Controle (Controllers)"]
    Controller --> Schema["4. Validação de Entrada (Zod Schemas)"]
    Controller --> Prisma["5. Acesso a Dados & ORM (Prisma Client)"]
    Prisma --> Database[(PostgreSQL Database)]

    Boot([Inicialização / Server Boot]) -.-> ServiceSeed["Serviço de Inicialização / globalCategories.service"]
    ServiceSeed -.-> Prisma
```

### Por que não utiliza Repository nem Services para cada entidade?

1. **Prisma como Abstração de Dados**: O **Prisma Client** já atua nativamente como uma camada de abstração de dados e *Query Builder* fortemente tipado. Criar uma camada de *Repository* manual adicionaria código redundante (*boilerplate*) sem ganhos práticos para o escopo do projeto.
2. **Controllers Focados e Autocontidos**: Em vez de concentrar todos os métodos em um único arquivo gigante, as operações de transações foram modularizadas em controladores específicos dentro de `src/controllers/transactions/`:
   - `createTransaction.controller.ts`: Validação do schema Zod, verificação de categoria e inserção via Prisma.
   - `getTransactions.controller.ts`: Filtros combinados (tipo, categoria, mês, ano) e listagem.
   - `getTransactionsSummary.controller.ts`: Agregações, balanço de receitas, despesas e gastos por categoria.
   - `getHistoryTransaction.controller.ts`: Consolidação do histórico dos últimos meses.
   - `deleteTransaction.controller.ts`: Remoção atômica de transações por ID.
3. **Papel da pasta `src/services/`**: A camada de serviços no backend não atua como intermediária de CRUD, mas sim como **Serviços de Infraestrutura e Carga Inicial (Seed/Setup)**, contendo o `globalCategories.service.ts`, responsável por verificar e inicializar as categorias globais padrão no banco ao iniciar o servidor.

---

## ✨ Funcionalidades Principais

*   **🛡️ Autenticação com Firebase Admin SDK**: Validação e decodificação do Token JWT enviado pelo frontend nas rotas protegidas via `auth.middleware.ts`.
*   **📐 Validação de Dados com Zod**: Validação estrita e tipada de parâmetros de rota, query strings e bodies de requisição.
*   **🗄️ Integração com Prisma ORM e PostgreSQL**: Modelagem relacional entre Usuários, Categorias e Transações com integridade referencial.
*   **📊 Lógica de Negócios e Agregações**: Agrupamento dinâmico de despesas por categoria, cálculo de balanço mensal e histórico financeiro.
*   **🌱 Inicialização Automática**: Criação automática de categorias padrão (alimentação, transporte, moradia, salário, etc.) no boot da aplicação.

---

## 🛠️ Tecnologias Utilizadas

A API foi desenvolvida utilizando as seguintes tecnologias e bibliotecas:

*   [**Node.js**](https://nodejs.org/) — Ambiente de execução JavaScript/TypeScript assíncrono.
*   [**TypeScript**](https://www.typescriptlang.org/) — Superset com tipagem estática rigorosa.
*   [**Fastify**](https://fastify.dev/) — Framework web de alta performance e baixo overhead.
*   [**Prisma ORM**](https://www.prisma.io/) — Object-Relational Mapping (ORM) moderno e tipo-seguro.
*   [**PostgreSQL**](https://www.postgresql.org/) — Banco de dados relacional robusto.
*   [**Zod**](https://zod.dev/) — Declaração e validação de esquemas de dados em tempo de execução.
*   [**Firebase Admin SDK**](https://firebase.google.com/docs/admin) — Validação dos tokens de autenticação gerados pelo Google Sign-In.

---

## 📂 Estrutura de Pastas

```text
src/
├── config/                 # Configurações de ambiente, Prisma e Firebase Admin
│   ├── env.ts              # Validação e tipagem de variáveis de ambiente
│   ├── firebase.ts         # Inicialização do Firebase Admin SDK
│   └── prisma.ts           # Instância única e tipada do Prisma Client
├── controllers/            # Controladores que recebem a requisição, validam e chamam o Prisma
│   ├── category.controller.ts # Listagem de categorias
│   └── transactions/       # Controladores dedicados para cada ação de transação
│       ├── createTransaction.controller.ts
│       ├── deleteTransaction.controller.ts
│       ├── getHistoryTransaction.controller.ts
│       ├── getTransactions.controller.ts
│       └── getTransactionsSummary.controller.ts
├── middlewares/            # Interceptadores de requisições
│   └── auth.middleware.ts  # Verificação do Bearer Token JWT via Firebase Admin
├── routes/                 # Definição e registro de rotas do Fastify
│   ├── category.routes.ts  # Endpoints de categorias
│   ├── transaction.routes.ts # Endpoints de transações financeiras
│   └── index.ts            # Agrupador central de rotas da API
├── schemas/                # Esquemas de validação de entrada com Zod
│   └── transaction.schema.ts
├── services/               # Serviços de carga inicial e setup do sistema
│   └── globalCategories.service.ts # Seed e verificação de categorias globais
├── types/                  # Definição de tipos TypeScript compartilhados
│   ├── category.types.ts
│   └── transaction.types.ts
├── app.ts                  # Configuração de plugins, middlewares e rotas do Fastify
└── server.ts               # Inicialização da aplicação e escuta na porta HTTP
```

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o backend localmente:

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (versão 18.x ou superior, recomendado 20.x+)
*   [npm](https://www.npmjs.com/)
*   Instância de banco de dados [PostgreSQL](https://www.postgresql.org/) (local, Docker ou nuvem como Neon/Supabase)

---

### Passo a Passo

1.  **Clonar o repositório**:
    ```bash
    git clone https://github.com/gabrieltomazi/devbills-backend.git
    cd devbills-backend
    ```

2.  **Instalar as dependências**:
    ```bash
    npm install
    ```

3.  **Configurar as Variáveis de Ambiente**:
    Crie um arquivo `.env` na raiz do backend e preencha as variáveis conforme exemplo abaixo:
    ```env
    PORT=3333
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/devbills?schema=public"
    NODE_ENV="dev"
    
    # Credenciais do Firebase Admin
    FIREBASE_PROJECT_ID="seu-projeto-id"
    FIREBASE_CLIENT_EMAIL="seu-email-cliente-firebase"
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nsua-chave-privada\n-----END PRIVATE KEY-----\n"
    ```

4.  **Rodar as Migrations do Prisma**:
    Crie a estrutura do banco de dados executando as migrations:
    ```bash
    npx prisma migrate dev
    ```

5.  **Iniciar o Servidor em Modo de Desenvolvimento**:
    ```bash
    npm run dev
    ```
    A API estará rodando por padrão na porta `3333` (ex: `http://localhost:3333`).

---

## 🛣️ Rotas Principais (Endpoints)

Todas as rotas de transação requerem o cabeçalho `Authorization: Bearer <ID_TOKEN_DO_FIREBASE>`.

| Método | Rota | Autenticação | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/categories` | Pública / Opcional | Lista todas as categorias cadastradas |
| **POST** | `/api/transaction` | 🔒 Bearer Token | Cria uma nova transação (receita ou despesa) |
| **GET** | `/api/transactions` | 🔒 Bearer Token | Lista transações filtradas por mês, ano, tipo e categoria |
| **GET** | `/api/transactions/summary` | 🔒 Bearer Token | Retorna o balanço, total de despesas, receitas e gastos por categoria |
| **GET** | `/api/transactions/history` | 🔒 Bearer Token | Retorna o histórico consolidado de receitas/despesas de meses anteriores |
| **DELETE** | `/api/transactions/:id` | 🔒 Bearer Token | Remove uma transação específica por ID |
