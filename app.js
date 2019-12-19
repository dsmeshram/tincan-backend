const express = require('express');
const bodyParser = require('body-parser');
const apps = require('./routes/app.route'); // Imports routes for the products
const config = require('./config')
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.use('/tincan', apps);


let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});