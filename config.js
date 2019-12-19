const mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://sandip:sandip@cluster0-zhwga.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.default = mongoDB;