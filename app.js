const cors = require('cors');
const express = require('express');
const app = express();

app.set('PORT', process.env.PORT | 5555);

app.use(cors);

module.exports = app;