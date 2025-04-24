const movieRepository = require('../repositories/movie-repository');
const fs = require('fs');
const csv = require('csv-parser');

async function importFile(filename) {
    return new Promise((resolve, reject) => {
        let results = [];
        let producers = [];
        let counterToBeInserted = 0;
        let counterCreated = 0;
        let countError = 0;
        let obj = {};
        
        console.log(`Reading file ${filename}`);

        fs.createReadStream(filename)
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                let isCreated = null;

                for (const movie of results) {
                    producers = extractProducers(movie.producers);
                    
                    if (producers.length === 0) return reject(false);

                    for (const producer of producers) {
                        counterToBeInserted++;

                        obj = {
                            year: movie.year, 
                            title: movie.title,
                            studios: movie.studios,
                            producer: producer, 
                            winner: movie.winner
                        };

                        if (!validate(obj)) return reject(false);

                        isCreated = await movieRepository.create(obj);

                        if (isCreated) {
                            counterCreated++;
                            continue;
                        }
                        countError++;
                    }
                }
                console.log(`Total records in the file ${results.length}`);
                console.log(`Total records to be inserted ${counterToBeInserted}`);
                console.log(`Records inserted successfully ${counterCreated}`);
                console.log(`Records that failed ${countError}`);

                resolve(true);
            })
            .on('error', reject);
    });
}

function extractProducers(producers) {
    return producers
      .replace(/\s+and\s+/gi, ', ')
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
}

function validate(movie) {
    let validate = true;

    if (!isPositiveInteger(movie.year)) {
        validate = false;
    }

    if (movie.winner && movie.winner !== 'yes') {
        validate = false;
    }

    console.log('AAAAAA', typeof movie.producer, movie.producer);

    if (typeof movie.producer !== 'string') {
        validate = false;
    }

    return validate;
}

function isPositiveInteger(value) {
    return /^\d+$/.test(value);
}

module.exports = { importFile };