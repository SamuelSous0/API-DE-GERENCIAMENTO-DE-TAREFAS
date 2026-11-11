# API de Gerenciamento de Tarefas (`express-01`)

API RESTful em Node.js com Express 5, Sequelize (PostgreSQL / NeonDB) e Zod, implementando o CRUD completo de **Tarefas** com Barrel Pattern, validações e tratamento global de erros.

## Tecnologias

- **Node.js** + **Express 5**
- **Sequelize** + **NeonDB (PostgreSQL)**
- **Zod** (Validação de payload, parâmetros e variáveis de ambiente)
- **Helmet**, **CORS** e **express-rate-limit**
- **Vercel Serverless**

## Configuração Local

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` com base no `.env.sample`.
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Endpoints de Tarefas (`/tarefas`)

| Método | Rota | Descrição | Status de Sucesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/tarefas` | Cria uma nova tarefa | `201 Created` |
| `GET` | `/tarefas` | Lista todas as tarefas | `200 OK` |
| `GET` | `/tarefas/:objectId` | Busca uma tarefa por UUID | `200 OK` |
| `PUT` | `/tarefas/:objectId` | Atualiza uma tarefa existente | `200 OK` |
| `DELETE` | `/tarefas/:objectId` | Remove uma tarefa existente | `204 No Content` |
