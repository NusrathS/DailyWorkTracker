require('dotenv').config();
const mysql = require('mysql2/promise');

async function setup() {
  console.log('Connecting to TiDB Cloud...');

  const conn = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: parseInt(process.env.TIDB_PORT || '4000'),
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
  });

  console.log('Connected. Creating database and table...');

  await conn.execute('CREATE DATABASE IF NOT EXISTS worktracker');
  await conn.execute('USE worktracker');
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS work_logs (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      date       DATE NOT NULL,
      project    VARCHAR(255) NOT NULL,
      tasks      TEXT NOT NULL,
      notes      TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Done! Database "worktracker" and table "work_logs" are ready.');
  await conn.end();
}

setup().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
