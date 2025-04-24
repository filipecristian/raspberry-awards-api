const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Database connected sucessfully!');
  }
});

module.exports = db;
