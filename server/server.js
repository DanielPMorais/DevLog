require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const DataBase = require('better-sqlite3');

const app = express();

// Configurações do ambiente
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.DB_PATH || './data/devlog.db';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Garante que o diretório do banco existe
const dbDir = path.dirname(DB_PATH);
const fs = require('fs');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new DataBase(DB_PATH);

// Middlewares
app.use(cors({
  origin: CORS_ORIGIN.split(',').map(url => url.trim()),
  credentials: true
}));
app.use(express.json());

db.exec(`
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    stack TEXT,
    status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    type TEXT, -- 'error', 'update', 'feature'
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );
`);

app.get('/projects', (req, res) => {
    const stmt = db.prepare('SELECT * FROM projects');
    res.json(stmt.all());
});

app.post('/projects', (req, res) => {
    const { name, stack } = req.body;
    const stmt = db.prepare('INSERT INTO projects (name, stack) VALUES (?, ?)');
    const info = stmt.run(name, stack);
    res.json({ id: info.lastInsertRowid });
});

app.get('/projects/:id/logs', (req, res) => {
    const stmt = db.prepare('SELECT * FROM logs WHERE project_id = ? ORDER BY created_at DESC');
    res.json(stmt.all(req.params.id));
});

app.post('/logs', (req, res) => {
    const { project_id, type, description } = req.body;
    const stmt = db.prepare('INSERT INTO logs (project_id, type, description) VALUES (?, ?, ?)');
    stmt.run(project_id, type, description);
    res.json({ success: true });
});

app.put('/projects/:id', (req, res) => {
  const { name, stack } = req.body;
  const { id } = req.params;
  const stmt = db.prepare('UPDATE projects SET name = ?, stack = ? WHERE id = ?');
  stmt.run(name, stack, id);
  res.json({ success: true });
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM logs WHERE project_id = ?').run(id);
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  res.json({ success: true });
});

// Rotas de logs
app.put('/logs/:id', (req, res) => {
  const { type, description } = req.body;
  const { id } = req.params;
  const stmt = db.prepare('UPDATE logs SET type = ?, description = ? WHERE id = ?');
  stmt.run(type, description, id);
  res.json({ success: true });
});

app.delete('/logs/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM logs WHERE id = ?').run(id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
  console.log(`📁 Banco de dados: ${DB_PATH}`);
  console.log(`🌐 CORS habilitado para: ${CORS_ORIGIN}`);
});