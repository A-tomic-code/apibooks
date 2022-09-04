const cors = require('cors');
const express = require('express');
const app = express();

const errorHandling = require('./error/errorHandling');

const registerRouter = require('./router/register.router');
const loginRouter = require('./router/login.router');
const librosRouter = require('./router/libros.router');

app.set('PORT', process.env.PORT | 5555);

app.use(cors());
app.use(express.json());

app.use(registerRouter);
app.use(loginRouter);
app.use(librosRouter);

app.use(errorHandling);

module.exports = app;