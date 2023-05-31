var express = require('express');
//var session = require('express-session');
var path = require('path');
//var connection = require(__dirname + '/controllers/database');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var adminPanelRouter = require('./routes/admin-panel');

var app = express();

//setting this app to use ejs
//template engine
app.set('view engine','ejs');

//using use() for calling static/middleware files by express.static()
//static files
app.use(express.static('./public'));

//create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/admin-panel', adminPanelRouter);



//setting up the server
app.listen(3000, function() {
  console.log('Server started at 3000');
});
