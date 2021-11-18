const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const errorHandler = require('./utils/error');
const { log } = require('../locale/messages');
const { HTTP_CODES } = require('../constants/constants');

const boardRoutes = require('./routes/boardRoutes');

const app = express();

const APP_URL = config.get('APP_URL');

app.disable("x-powered-by");
app.use(cors({
    "origin": APP_URL,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": HTTP_CODES.NOCONTENT
}));
app.use(bodyParser.json());

//ROUTES
app.use('/v1/bms/board', boardRoutes);

app.all('*', (req, res) => {
    res.status(HTTP_CODES.NOTFOUND).send(`${log.error.CantfindMessages} ${req.originalUrl} ${log.error.serverText}`);
});

//Error
app.use(errorHandler);

module.exports = app;