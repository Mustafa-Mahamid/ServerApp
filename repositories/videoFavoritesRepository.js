const db = require("../config/db");

db.run(`
  CREATE TABLE IF NOT EXISTS video_favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    video_id TEXT NOT NULL,
    title TEXT NOT NULL,
    channel TEXT,
    thumbnail TEXT,
    UNIQUE(user_id, video_id)
  )
`);

exports.getByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM video_favorites WHERE user_id=? ORDER BY id DESC",
      [userId],
      (err, rows) => (err ? reject(err) : resolve(rows))
    );
  });
};

exports.add = (userId, v) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR IGNORE INTO video_favorites(user_id, video_id, title, channel, thumbnail)
       VALUES(?,?,?,?,?)`,
      [userId, v.video_id, v.title, v.channel, v.thumbnail],
      (err) => (err ? reject(err) : resolve())
    );
  });
};

exports.remove = (userId, favId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM video_favorites WHERE id=? AND user_id=?",
      [favId, userId],
      (err) => (err ? reject(err) : resolve())
    );
  });
};