const express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var agenda = require('./routes/agenda');
var index = require('./routes/index');
app.use('/', index)
app.use('/agenda', agenda)


app.listen(3000,() => console.log("Sevidor está rodando no porta 3000 !"));