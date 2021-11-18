const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const boardRoutes = require('./routes/boardRoutes');
const CORS = require('./utils/middlewares/cors');
// const ejs = require('ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(CORS);
// app.set('view engine', 'ejs');

//ROUTES 
app.use('/v1/ims/board', boardRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is started...');
});