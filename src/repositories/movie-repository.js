const path = require('path');

const db = require(path.join(__dirname, '..', '..', 'config', 'database'));

function create(movie) {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO producer_movies (year, title, studios, producer, winner)
            VALUES (?, ?, ?, ?, ?)
        `, 
        [movie.year, movie.title, movie.studios, movie.producer, movie.winner],
        (err) => {
            if (err) {
                console.error('Error creating movie', err);
                return reject(false);
            }
            resolve(true);
        });
    });
}

async function getProducersWithMoreThanOneWin() {
    return new Promise((resolve, reject) => {
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

module.exports = { create, getProducersWithMoreThanOneWin };