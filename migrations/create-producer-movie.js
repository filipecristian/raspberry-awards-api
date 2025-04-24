const db = require('../config/database');

function run() {
  return new Promise((resolve, reject) => {
    db.get(
      "DROP TABLE IF EXISTS producer_movies",
      (err) => {
        if (err) return reject(err);

        db.run(
          `CREATE TABLE IF NOT EXISTS producer_movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER,
            title TEXT NOT NULL,
            studios TEXT,
            producer TEXT,
            winner TEXT
          )`,
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      }
    );
  })
};

module.exports = { run };