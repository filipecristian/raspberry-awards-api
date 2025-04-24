require('dotenv').config();

const path = require('path');
const app = require('./app');
const loadCSVService = require('./services/load-csv-service');
const createProducerMovieMigration = require('../migrations/create-producer-movie');

const PORT = process.env.PORT || 3002;

createProducerMovieMigration.run()
    .then(() => {
        loadCSVService.importFile(path.join(__dirname, '..', 'storage', 'movielist.csv'))
            .then(() => {
                app.listen(PORT, () => {
                    console.log(`Server running on port ${PORT}`);
                });
            })
            .catch(err => console.error('Error importing file', err));
    })
    .catch(err => console.error('Error executing migration', err));
