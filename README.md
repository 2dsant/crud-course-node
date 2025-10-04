# API de Cursos - Node.js + Fastify

Este projeto é uma API RESTful para gerenciamento de cursos, construída com Node.js, Fastify, TypeScript e PostgreSQL.

## Funcionalidades
- Criar curso
- Listar cursos
- Buscar curso por ID

## Tecnologias Utilizadas
- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) (validação)
- [PostgreSQL](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/) (presumido pelo padrão de arquivos)
- [Swagger/OpenAPI](https://swagger.io/) (documentação automática)

## Estrutura do Projeto
```
├── src/
│   ├── database/
│   │   ├── client.ts      # Conexão com o banco de dados
│   │   └── schema.ts      # Definição das tabelas
│   └── routes/
│       ├── create-course.ts      # Rota para criar curso
│       ├── get-course-by-id.ts   # Rota para buscar curso por ID
│       └── get-courses.ts        # Rota para listar cursos
├── server.ts              # Inicialização do servidor Fastify
├── package.json
├── tsconfig.json
├── requisicao.http        # Exemplos de requisições
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o banco de dados PostgreSQL (pode usar Docker, veja exemplo de Dockerfile para PostgreSQL 17).

3. Configure as variáveis de ambiente, se necessário (ex: `DATABASE_URL`).

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3333`.

## Documentação
- Acesse `/docs` para visualizar a documentação interativa (Swagger/Scalar) em ambiente de desenvolvimento.

## Exemplos de Requisição
Veja o arquivo `requisicao.http` para exemplos de uso da API.

---

Feito com Fastify, TypeScript e amor. :rocket:
