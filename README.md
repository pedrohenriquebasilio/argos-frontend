# JSON Placeholder Explorer

Aplicação React desenvolvida como solução para uma prova técnica de frontend. O objetivo é consumir a API pública [JSON Placeholder](https://jsonplaceholder.typicode.com/) e oferecer uma experiência de uso fluida e responsiva, abordando autenticação, CRUD, listagem de posts e galeria de álbuns.


## Funcionalidades

### Painel Administrativo
- Tela de autenticação simples para acessar o painel.
- CRUD completo de usuários, com validações de campos obrigatórios e formatos de e‑mail.

### Postagens
- Página com listagem de postagens paginada.
- Visualização dos detalhes de cada postagem e de seus comentários.
- Inclusão de novos comentários.

### Galeria de Álbuns
- Listagem dos álbuns disponíveis.
- Exibição das fotos de cada álbum em layout responsivo.

## Tecnologias Utilizadas
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) e [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/) para navegação
- [TanStack Query](https://tanstack.com/query/latest) para requisições à API

## Instalação e Execução
```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd json-placeholder-explorer

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

## Estrutura do Projeto
```
├── src
│   ├── components/   # Componentes reutilizáveis
│   ├── pages/        # Páginas e rotas
│   ├── services/     # Comunicação com a API
│   ├── hooks/        # Hooks personalizados
│   ├── lib/          # Utilidades e helpers
│   └── types/        # Definições de tipos TypeScript
└── public            # Arquivos estáticos
```

## Decisões Técnicas
- **React + Vite**: desempenho e DX elevados.
- **Tailwind + shadcn/ui**: agilidade na criação de interfaces com design consistente.
- **TanStack Query**: gerenciamento de estado assíncrono e cache de requisições.

## Possíveis Melhorias Futuras
- Cobertura de testes unitários e E2E.
- Refinamento de acessibilidade (A11Y).
- Suporte offline e otimizações de desempenho.
- Deploy automatizado em Vercel/Netlify.

