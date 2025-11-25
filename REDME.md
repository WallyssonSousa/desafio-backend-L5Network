# 📘 Documentação Completa da API 

---

# 📌 1. Visão Geral
API construída em **Node.js + Express**, com:
- Autenticação via **JWT**
- Cache com **Redis**
- Integração com a API do **TMDB**
- Banco de dados **MySQL 8**
- Docker compose para orquestração

---

# 📦 2. Arquitetura da API

```
src/
 ├── controllers/
 ├── middlewares/
 ├── models/
 ├── routes/
 ├── services/
 ├── utils/
 └── config/
```

---

# ⚙ 3. Variáveis de Ambiente (.env)

```
PORT=3000
NODE_ENV=development

# MySQL
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=tmdb_challenge

# JWT
JWT_SECRET=uma_chave_secreta_bem_forte
JWT_EXPIRES_IN=1h

# TMDB
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3

# Redis
REDIS_URL=redis://localhost:6379
```

---

# 🐳 4. Docker Compose

Contém 3 serviços: API, Redis e MySQL.
Inclui inicialização do banco via scripts na pasta `sql`.

---

# 🔐 5. Autenticação
A API usa **JWT Bearer Token**.

### Como enviar:
```
Authorization: Bearer <token>
```

---

# 🛣 6. Endpoints

Abaixo está a documentação **completa** de cada rota.

---

# 🔑 6.1. Autenticação (/api/auth)

## 📍 POST /api/auth/register
Cria um novo usuário.

### Body
```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "123456"
}
```

### Respostas
- **201 Created** → Usuário criado
- **409 Conflict** → Email já registrado

### Exemplo de resposta
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@mail.com"
}
```

---

## 📍 POST /api/auth/login
Realiza login e retorna um token JWT.

### Body
```json
{
  "email": "john@mail.com",
  "password": "123456"
}
```

### Respostas
- **200 OK**
- **401 Unauthorized** (credenciais inválidas)

### Exemplo de resposta
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com"
  }
}
```

---

# 🎬 6.2. Filmes (/api/movies)
Integração com a API TMDB + cache com Redis.

---

## 📍 GET /api/movies/seach
Busca filmes no TMDB.

### Query Params
| Param | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| q | string | "" | Texto da busca |
| page | number | 1 | Paginação |

### Resposta
Retorna objetos do TMDB.

---

## 📍 GET /api/movies
Lista filmes populares.

### Query Params
`page` → número da página

---

## 📍 GET /api/movies/:id
Obtém detalhes de um filme pelo TMDB ID.

➡ Também registra o filme como **visualização recente** (com ou sem usuário autenticado).

---

## ⭐ 6.2.1. Favoritos
Requer JWT.

---

## 📍 POST /api/movies/favorite
Adiciona um filme aos favoritos.

### Headers (obrigatório)
`Authorization: Bearer <token>`

### Body
```json
{
  "tmdbId": 123,
  "title": "The Batman"
}
```

### Respostas
- **201 Created** → Adicionado
- **409 Conflict** → Já favoritado
- **400 Bad Request** → tmdbId ausente

---

## 📍 GET /api/movies/favorites
Lista favoritos do usuário.

### Query de paginação
- `limit`
- `offset`

### Resposta
```json
{
  "data": [...],
  "limit": 10,
  "offset": 0
}
```

---

## 📍 DELETE /api/movies/favorites/:tmdbId
Remove um filme dos favoritos.

### Resposta
```json
{ "message": "Removed" }
```

---

# 👁 6.3. Visualizações (/api/movies/views/recent)

## 📍 GET /api/movies/views/recent
Lista visualizações recentes, com limite opcional.

### Query Params
| Param | Tipo | Default |
|-------|------|----------|
| limit | number | 20 |

### Resposta
```json
{
  "data": [ ... ]
}
```

---

# 🧩 7. Middlewares

## 🔐 authMiddleware
Valida JWT e injeta `req.user`:
```ts
req.user = { id, email }
```

Erros comuns:
- 401 → Token ausente
- 403 → Token inválido

---

# 💾 8. Modelos

## userModel
- create
- findByEmail
- createLoginLog

## favoriteModel
- add
- exists
- list
- remove

## viewLogModel
- create
- listRecente

---

# 🔌 9. Serviços

## TMDB Service
Tem cache Redis TTL 5 minutos.
- searchMovies
- listPopular
- getDetails

---

# 📐 10. Paginação
Função utilitária:
```ts
paginationFromReq(req)
```
Retorna:
```
{ limit, offset }
```

---

# 🧱 11. Estrutura da Resposta de Erro
Middleware global de erros retorna:
```json
{
  "message": "Error message",
  "stack": "(em dev)"
}
```

---

# 🚀 12. Endpoint Base
## 📍 GET /
Retorna status básico:
```json
{ "ok": true, "version": "1.0.0" }
```


## Instalação e Execução da API com Docker

### 📌 Pré-requisitos
Antes de iniciar, garanta que possui instalado em sua máquina:
- **Docker** (última versão recomendada)
- **Docker Compose**
- Arquivo **.env** configurado corretamente na raiz do projeto

### 📁 Estrutura esperada do projeto
```
/ (raiz)
 ├─ Dockerfile
 ├─ docker-compose.yml
 ├─ .env
 ├─ src/
 ├─ package.json
 └─ sql/ (scripts de criação do banco MySQL)
```

### ⚙️ 1. Configurar o arquivo `.env`
Certifique-se de preencher seu arquivo `.env` com as variáveis necessárias: 
```
PORT=3000
NODE_ENV=development
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=tmdb_challenge
JWT_SECRET=uma_chave_secreta_bem_forte
JWT_EXPIRES_IN=1h
TMDB_API_KEY=sua_chave_tmdb
TMDB_BASE_URL=https://api.themoviedb.org/3
REDIS_URL=redis://redis:6379
```
> Observação importante: No ambiente Docker, o host do banco deve ser **db** e do Redis **redis**, pois esses são os nomes dos serviços definidos no docker-compose.

### 🐳 2. Subir os containers
No terminal, dentro da pasta raiz do projeto, execute:
```
docker-compose up -d --build
```
Isso fará:
- Build da API Node.js
- Subir um container Redis
- Subir um MySQL 8 com banco inicializado

### 🔍 3. Verificar se está funcionando
Liste os containers:
```
docker ps
```
Deve aparecer algo como:
```
api
redis
mysql
```

Agora teste no navegador ou via curl/postman:
```
GET http://localhost:3000/
```
Resposta esperada:
```json
{ "ok": true, "version": "1.0.0" }
```

### 🚫 4. Parar os containers
```
docker-compose down
```
Se quiser remover volumes (apaga o banco):
```
docker-compose down -v
```

### ♻️ 5. Logs da aplicação
```
docker-compose logs -f api
```
