const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");
const fs = require("fs");

const sessionDbPath =
  process.env.SESSIONS_DB_PATH ||
  (process.env.RENDER ? "/tmp/sessions.sqlite" : path.join(__dirname, "..", "sessions.sqlite"));

fs.mkdirSync(path.dirname(sessionDbPath), { recursive: true });

module.exports = session({
  store: new SQLiteStore({
    db: path.basename(sessionDbPath),
    dir: path.dirname(sessionDbPath),
  }),
  secret: process.env.SESSION_SECRET || "super-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  },
});