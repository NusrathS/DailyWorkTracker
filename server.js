require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '4000'),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
};

async function getConn() {
  return mysql.createConnection(dbConfig);
}

// GET all entries
app.get('/api/entries', async (req, res) => {
  const conn = await getConn();
  try {
    const [rows] = await conn.execute(
      'SELECT id, DATE_FORMAT(date, "%Y-%m-%d") AS date, project, tasks, notes FROM work_logs ORDER BY date DESC, id DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await conn.end();
  }
});

// POST new entry
app.post('/api/entries', async (req, res) => {
  const { date, project, tasks, notes } = req.body;
  if (!date || !project || !tasks) {
    return res.status(400).json({ error: 'date, project, and tasks are required' });
  }
  const conn = await getConn();
  try {
    const [result] = await conn.execute(
      'INSERT INTO work_logs (date, project, tasks, notes) VALUES (?, ?, ?, ?)',
      [date, project, tasks, notes || null]
    );
    res.json({ id: result.insertId, date, project, tasks, notes: notes || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await conn.end();
  }
});

// DELETE entry
app.delete('/api/entries/:id', async (req, res) => {
  const conn = await getConn();
  try {
    await conn.execute('DELETE FROM work_logs WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await conn.end();
  }
});

// Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Daily Work Tracker running at http://localhost:${PORT}`));

module.exports = app;
