require('dotenv').config();

const app = require('./app');
const loadCSV = require('./loadCSV');

const PORT = process.env.PORT || 3002;

loadCSV.loadCSV().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((err) => console.log('Erro ao carregar CSV', err));
