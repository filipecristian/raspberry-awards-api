const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('./db');

async function createTable() {
    try {
      // Verifica se a tabela já existe de forma mais robusta
      const isDroped = await new Promise((resolve, reject) => {
        db.get(
          "DROP TABLE IF EXISTS producer_movies",
          (err) => {
            if (err) return reject(err);
            resolve(true);
          }
        );
      });
      
      if (isDroped) {
        await new Promise((resolve, reject) => {
          db.run(
            `CREATE TABLE IF NOT EXISTS producer_movies (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              year INTEGER,
              title TEXT NOT NULL,
              studios TEXT,
              producer TEXT,
              winner TEXT
            )`,
            function(err) {
              if (err) return reject(err);
              resolve();
            }
          );
        });
        console.log('Tabela producer_movies criada com sucesso');
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao verificar/criar tabela:', error);
      throw error; // Propaga o erro para quem chamou a função
    }
  }

function insertMovie(movie, producer) {
    
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO producer_movies (year, title, studios, producer, winner)
      VALUES (?, ?, ?, ?, ?)
    `, [movie.year, movie.title, movie.studios, producer, movie.winner], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function extractProducers(textoProdutores) {
  return textoProdutores
    .replace(/\s+and\s+/gi, ', ')
    .split(',')
    .map(nome => nome.trim())
    .filter(nome => nome.length > 0);
}

async function loadCSV(filename) {
  await createTable();

  return new Promise((resolve, reject) => {
    const results = [];
    let producers = [];
    fs.createReadStream(filename ?? path.join(__dirname, '../data/movies.csv'))
      .pipe(csv({separator: ';'}))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const movie of results) {
          producers = extractProducers(movie.producers);
          for (const producer of producers) {
            await insertMovie(movie, producer);
          }
        }
        console.log(`${results.length} filmes importados do CSV.`);
        resolve(true);
      })
      .on('error', reject);
  });
}

async function getProducersWithMultipleWins() {
  return new Promise((resolve, reject) => {
    // Primeiro normalizamos os dados dos produtores
    db.all(`
      SELECT 
        YEAR,
        PRODUCER
      FROM 
        PRODUCER_MOVIES
      WHERE PRODUCER IN (
        SELECT 
          PRODUCER
        FROM PRODUCER_MOVIES
          WHERE WINNER = 'yes'
          GROUP BY PRODUCER
          HAVING COUNT(*) > 1
      )
    `, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
    loadCSV,
    getProducersWithMultipleWins,
};
