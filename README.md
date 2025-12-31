## Prerequisites

- Node.js >=20 (Recommended)

## Installation

**Using Yarn (Recommended)**

```sh
yarn install
yarn dev
```

**Using Npm**

```sh
npm i
npm run dev
```

## Build

```sh
yarn build
# or
npm run build
```

## Mock server

By default we provide demo data from : `https://api-dev-minimal-[version].vercel.app`

To set up your local server:

- **Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

- **Resource:** [Download](https://www.dropbox.com/scl/fo/bopqsyaatc8fbquswxwww/AKgu6V6ZGmxtu22MuzsL5L4?rlkey=8s55vnilwz2d8nsrcmdo2a6ci&dl=0).

## Full version

- Create React App ([migrate to CRA](https://docs.minimals.cc/migrate-to-cra/)).
- Next.js
- Vite.js

## Starter version

- To remove unnecessary components. This is a simplified version ([https://starter.minimals.cc/](https://starter.minimals.cc/))
- Good to start a new project. You can copy components from the full version.
- Make sure to install the dependencies exactly as compared to the full version.

---

**NOTE:**
_When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly._

---

## Estrutura de Autenticação

Essa é a minha arvore do front end dedicada ao sistema de autenticação:

└── /src
    ├── app/
    │   └── auth/               # ROTAS PÚBLICAS (O que o usuário acessa no navegador)
    │       ├── reset/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       ├── sign-in/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       ├── sign-up/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       ├── update/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── verify/
    │           ├── layout.tsx
    │           └── page.tsx
    │
    ├── auth/
    │   ├── view/               # COMPONENTES DE UI (Os formulários e botões)
    │   │   ├── index.ts
    │   │   ├── reset.tsx
    │   │   ├── sign-in.tsx
    │   │   ├── sign-up.tsx
    │   │   ├── update.tsx
    │   │   └── verify.tsx
    │   │
    │   ├── context/            # LÓGICA DE ESTADO (O "cérebro" da autenticação)
    │   │   ├── index.ts        # Exportador principal do contexto
    │   │   ├── action.ts       # Ações de login, logout, registro (com chamadas de API)
    │   │   ├── auth-context.tsx  # Definição do Contexto React
    │   │   ├── auth-provider.tsx # Componente que gerencia o estado e o token
    │   │   ├── constant.ts     # Constantes (ex: chave de armazenamento do token)
    │   │   └── utils.ts        # Funções utilitárias (ex: set/get/remove token)
    │   │
    │   ├── guard/              # GUARDAS DE ROTA (Protegem o acesso às páginas)
    │   │   ├── index.ts
    │   │   ├── auth-guard.tsx    # Garante que o usuário esteja logado
    │   │   ├── guest-guard.tsx   # Garante que o usuário NÃO esteja logado
    │   │   └── role-based-guard.tsx # Controle de acesso baseado em permissões
    │   │
    │   └── hooks/              # HOOKS CUSTOMIZADOS (atalhos para consumir o estado)
    │       ├── index.ts
    │       ├── use-auth-context.ts # Hook para acessar o contexto de autenticação
    │       └── use-mocked-user.ts  # Hook para usar dados de usuário mockados

---

## Arquitetura do Módulo de Blog

A arquitetura do blog segue um padrão moderno de Next.js, separando claramente a busca de dados (no servidor), a estrutura da página e os componentes de UI reutilizáveis.

### Fluxo de Dados (Do Servidor para o Ecrã)

1.  **Requisição do Utilizador**: O utilizador acede à página `/post`.
2.  **Página do Servidor (Route)**: O Next.js executa o ficheiro `src/app/post/page.tsx`.
3.  **Ação de Dados (Data Fetching)**: Dentro de `page.tsx`, a função `getPosts()` de `src/actions/blog-ssr.ts` é chamada no servidor.
4.  **Fonte de Dados (Mock)**: A função `getPosts()` atualmente lê os dados da variável `_posts` (localizada em `src/_mock/_blog.ts`).
5.  **Props para o Cliente**: Os dados (`posts`) são retornados e passados como `props` para o componente de view: `<PostListHomeView posts={posts} />`.
6.  **Renderização da UI**: O componente `<PostListHomeView />`, que é um Componente de Cliente (`'use client'`), recebe os `posts` e renderiza a UI no navegador.

### Árvore de Arquivos e Componentes

```
src/
├── 📁 app/
│   └── 📁 post/
│       ├── 📄 page.tsx  (Ponto de Entrada da Lista de Posts)
│       └── 📁 [title]/
│           └── 📄 page.tsx  (Ponto de Entrada do Detalhe do Post)
│
├── 📁 actions/
│   └── 📄 blog-ssr.ts  (Lógica de Dados do Servidor)
│
├── 📁 sections/
│   └── 📁 blog/
│       ├── 📁 view/  (Componentes de Layout de Página)
│       │   ├── 📄 post-list-home-view.tsx  (Layout da Página de Lista)
│       │   └── 📄 post-details-view.tsx  (Layout da Página de Detalhe)
│       │
│       ├── 📄 post-carousel-featured.tsx  (Carrossel de Destaques)
│       ├── 📄 post-list.tsx  (Grelha de Posts)
│       ├── 📄 post-item.tsx  (Item Individual da Grelha/Card)
│       ├── 📄 post-search.tsx  (Componente de Busca)
│       ├── 📄 post-sort.tsx  (Componente de Ordenação)
│       └── 📄 ... (outros componentes de detalhe e comentários)
│
├── 📁 components/  (Componentes de UI Genéricos)
│   ├── 📁 carousel/
│   └── 📁 image/
│
├── 📁 types/
│   └── 📄 blog.ts  (Definições de Tipos TypeScript)
│
├── 📁 _mock/
│   └── 📄 _blog.ts  (Fonte de Dados Mock)
│
└── 📁 routes/
    └── 📄 paths.ts  (Gerador de URLs)
```
