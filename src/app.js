const express = require('express');
const awardsRoutes = require('./routes/awards');

const app = express();
app.use(express.json());

app.use('/awards', awardsRoutes);

module.exports = app;
