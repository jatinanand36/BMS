const config = require('config')
const mongoose = require('mongoose');
const {SESSION_SECRET, CERT_PATH, PASSPHRASE} = require('../../constants/constants');
const fs = require('fs');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const sessionOptions = {
    secret: config.get(SESSION_SECRET), //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false, //required
    saveUninitialized: false //required
}

const serverOptions = {
    pfx: fs.readFileSync(config.get(CERT_PATH)),
    passphrase: config.get(PASSPHRASE)
}

const httpsAgentOptions = {
    rejectUnauthorized: false,
    pfx: fs.readFileSync(config.get(CERT_PATH)),
    passphrase: config.get(PASSPHRASE)
}

module.exports = {
    sessionOptions,
    serverOptions,
    httpsAgentOptions
}