# 📋 DevLog

Sistema de registro de logs para projetos de desenvolvimento. Permite gerenciar múltiplos projetos e registrar eventos como updates, erros e features.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

## ✨ Funcionalidades

- 📁 **Gerenciamento de Projetos** - Criar, editar e excluir projetos
- 🏷️ **Stack de Tecnologias** - Seletor visual com ícones de 35+ tecnologias
- 📝 **Registro de Logs** - Registrar eventos (update, error, feature)
- 📊 **Gráfico de Atividade** - Visualização da atividade recente
- 🌙 **Dark Mode** - Interface moderna com tema escuro

## 🛠️ Tecnologias

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- Recharts (gráficos)
- React Icons

### Backend
- Node.js + Express
- Better-SQLite3
- CORS

## 📁 Estrutura do Projeto

```
DevLog/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── ActivityChart/
│   │   │   ├── LogList/
│   │   │   ├── Modals/
│   │   │   ├── ProjectHeader/
│   │   │   ├── Sidebar/
│   │   │   └── TechSelect/
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Chamadas API
│   │   └── App.jsx
│   ├── Dockerfile
│   └── nginx.conf
├── server/                 # Backend Node.js
│   ├── server.js
│   ├── Dockerfile
│   ├── .env
│   └── .env.example
├── data/                   # Banco de dados SQLite
├── docker-compose.yml
└── README.md
```

## 🚀 Como Rodar

### Desenvolvimento Local

**1. Backend**
```bash
cd server
npm install
node server.js
```

**2. Frontend**
```bash
cd client
npm install
npm run dev
```

**3. Acessar**
- Frontend: http://localhost:5173
- API: http://localhost:3003

### 🐳 Docker (Produção)

```bash
# Build e start dos containers
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

**URLs após deploy:**
- Frontend: http://seu-ip (porta 80)
- API: http://seu-ip:3003

## ⚙️ Configuração

### Variáveis de Ambiente (server/.env)

```env
# Porta do servidor
PORT=3003

# Ambiente
NODE_ENV=production

# Caminho do banco de dados
DB_PATH=./data/devlog.db

# URLs permitidas no CORS (separar por vírgula)
CORS_ORIGIN=http://10.0.0.126,http://localhost:5173
```

### Configurar IP do Servidor

1. **Backend** - Editar `server/.env`:
   ```env
   CORS_ORIGIN=http://SEU_IP,http://localhost:5173
   ```

2. **Frontend** - Editar `client/src/services/api.js`:
   ```javascript
   const API_URL = 'http://SEU_IP:3003';
   ```

## 📡 API Endpoints

### Projetos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/projects` | Listar todos os projetos |
| POST | `/projects` | Criar projeto |
| PUT | `/projects/:id` | Atualizar projeto |
| DELETE | `/projects/:id` | Excluir projeto |

### Logs
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/projects/:id/logs` | Listar logs do projeto |
| POST | `/logs` | Criar log |
| PUT | `/logs/:id` | Atualizar log |
| DELETE | `/logs/:id` | Excluir log |

## 🎨 Screenshots

### Tela Principal
- Sidebar com lista de projetos e ícones das tecnologias
- Header com nome do projeto e badges das tecnologias
- Gráfico de atividade recente
- Lista de logs com badges coloridos por tipo

### Modal de Projeto
- Campo de nome
- Seletor de tecnologias com busca e checkboxes

### Modal de Log
- Seletor de tipo (update, error, feature)
- Campo de descrição com suporte a múltiplas linhas

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar.

---

Desenvolvido com ❤️ em 25/12/2025
