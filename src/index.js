const mongoose = require('mongoose');
const https = require('https');
const config = require('config')
const session = require('express-session');
const { sessionOptions, serverOptions } = require('./authorization/serverAuth')
const app = require('./app');
const { log } = require('../locale/messages');

const DB = config.get('dbConfig.hostUri');
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log(log.info.dbSuccessMessage))
    .catch((err) => console.log(log.error.dbErrorMessage, err));

app.use(session(sessionOptions));

const port = process.env.PORT || 4000;
https.createServer(serverOptions, app).listen(port, () => {
    console.log(`${log.info.runningMessages} ${port}...`);
});