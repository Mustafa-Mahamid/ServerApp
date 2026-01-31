const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// On Render Free: use /tmp (writable). Locally: project folder.
const dbPath = process.env.RENDER
  ? "/tmp/db.sqlite"
  : path.join(__dirname, "..", "db.sqlite");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);
});

module.exports = db;