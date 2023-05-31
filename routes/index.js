var express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require(__dirname + '/database');
const dateFormat = require('date-and-time');

//console.log(dateFormat.format(now, "YYYY-MM-DD"));

var router = express.Router();

//create application/x-www-form-urlencoded parser
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


router.get('/', function(req,res) {
  res.render('index', { title: 'Kairoscope' });
});

router.get('/aboutus', function(req, res) {
  res.render('aboutus');
});

router.get('/babyshoot', function(req,res) {
  res.render('babyshoot');
});

router.get('/maternity', function(req,res) {
  res.render('maternity');
});

router.get('/prewedding', function(req,res) {
  res.render('prewedding');
});

router.get('/wedding', function(req,res) {
  res.render('wedding');
});

router.get('/engagement', function(req,res) {
  res.render('engagement');
});

router.get('/enterdetails', function(req, res) {
  connection.query('SELECT event_id,event_type FROM event', function(error, result) {
    if(error) throw error;
    console.log(result);
    res.render('enterdetails', {
      items: result
    });
  });
});

router.post('/enterdetails/placedordermsg', function(req, res) {
  console.log(req.body);
  var contact = req.body.contact;
  if(contact.length == 10) {

  orderDate = new Date(req.body.orderDate);
  eventDate = new Date(req.body.eventDate);

    var details = {
      "client_name" : req.body.fullname,
      "client_contact" : req.body.contact,
      "client_email_id" : req.body.emailid,
      "client_address" : req.body.clientAddress,
      "event_id_fk" : req.body.eventType,
      "order_date" : dateFormat.format(orderDate,  "YYYY-MM-DD"),
      "event_date" : dateFormat.format(eventDate,  "YYYY-MM-DD"),
      "time_FROM" : req.body.timeFrom,
      "time_TO" : req.body.timeTo,
      "event_address" : req.body.eventAddress
    };

    connection.query('INSERT INTO orders SET ?', details, function(error, result) {
      if(error) throw error;
      console.log(result);
      if(result.affectedRows) {
        res.render('placedordermsg');
        console.log('Order Details registered successfully!!!');
      }
    });
  }else {
    res.send('Please! Enter a valid Contact No.');
  }
});

router.get('/adminlogin', function(req, res){
  res.render('adminlogin');
});

router.post('/admin-login', function(req, res) {
  console.log(req.body);
  var uname = req.body.username;
  var pass = req.body.password;
  connection.query('SELECT * FROM admin WHERE username = ?', [uname], function(error, result) {
      if(error) throw error;
      if(result[0].password == pass){
        res.redirect('/admin-panel/homeadmin');
      }else {
        res.send('Incorrect username and/or password');
      }
    });
});

module.exports = router;
