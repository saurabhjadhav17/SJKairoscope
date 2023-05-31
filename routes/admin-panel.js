var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require(__dirname + '/database');
var transporter = require(__dirname + '/send-mail');
//var upload = require(__dirname + '/insert-pictures');
const multer = require('multer');

//Set Storage engine
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init UPLOAD
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file,cb);
  }
}).single('imageFile');


//Check File TYPE
function checkFileType(file, cb) {
  //Allowed extension
  const filetypes = /jpeg|jpg|png|gif/;

  //Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: Images only');
  }
}

var router = express.Router();

//static files
router.use('/assets', express.static(path.join(__dirname, "./../assets")));

//create application/x-www-form-urlencoded parser
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/homeadmin', function(req, res) {
  var sql = "SELECT * FROM pending_orders;SELECT * FROM confirm_orders;SELECT * FROM completed_orders";
  connection.query(sql, function(error, result) {
    if(error) throw error;
    res.render('homeadmin', {
      pendingOrders : result[0],
      confirmOrders: result[1],
      completeOrders: result[2]
    });
  });
});

router.get('/homeadmin/confirm-order/:id', function(req, res) {
  let sql = `SELECT * FROM pending_orders WHERE order_id = ${req.params.id}`;
  connection.query(sql, function(error, result) {
      if(error) throw error;
      res.render('confirmorder', {
        items : result
      });
  });
});

router.post('/homeadmin/confirmorder/:id', function(req, res) {
console.log(req.body);
  var output = `
    <h4>Your order has been confirmed by Kairoscope Photography</h4>
    <p>Thanks ${req.body.c_name} for placing the order.<br/> We will be glad to capture your precious moments... <br/>We'll meet you guys soon!
    <br /><br />For any queries, please feel free to contact us through our Email Id or on our Phone Number mentioned in our website.</p>
    <br /><br />
    <p>Thank you!</p>
  `;
  // send mail with defined transport object
  let mailOptions ={
    from: '"Kairoscope Photography" <kairoscopephotgraphy@gmail.com>', // sender address
    to: `${req.body.c_emailid}`, // list of receivers
    subject: "Order Confirmation Mail", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  //send mail with defined transporter object
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
    }else {
      console.log('Email sent to client successfully');
    }
  });

  var confirm_details = {
    "order_id" : req.body.o_id,
    "client_name" : req.body.c_name,
    "client_contact" : req.body.c_contact,
    "client_email_id" : req.body.c_emailid,
    "client_address" : req.body.c_address,
    "event_type" : req.body.e_type,
    "order_date" : req.body.o_date,
    "event_date" : req.body.e_date,
    "time_FROM" : req.body.t_from,
    "time_TO" : req.body.t_to,
    "event_address" : req.body.e_address
  };

  var sql = "INSERT INTO confirm_orders SET ?; DELETE FROM orders WHERE order_id = ?";
  connection.query(sql, [confirm_details, `${req.params.id}`], function(error, result) {
    if(error) throw error;
    console.log(result);
    if(result[0].affectedRows) {
      console.log('Order inserted successfully in Confirm orders');
    }
    if(result[1].affectedRows) {
      console.log('Order deleted successfully from Pending orders');
    }
    res.redirect('/admin-panel/homeadmin');
  });
});

router.get('/homeadmin/decline-order/:id', function(req, res) {
  let sql = `SELECT * FROM pending_orders WHERE order_id = ${req.params.id}`;
  connection.query(sql, function(error, result) {
      if(error) throw error;
      res.render('declineorder', {
        items : result
      });
  });
});


router.post('/homeadmin/declineorder/:id', function(req, res) {
console.log(req.body);
  var output = `
    <h4>Your order has been declined by Kairoscope Photography</h4>
    <p>Thanks ${req.body.c_name} for placing the order.<br/> We are sorry to infrom you that we are not able to accept your order, as we already booked for that slot.<br/>Hope to see you for another event in future..!
    <br /><br />For any queries, please feel free to contact us through our Email Id or on our Phone Number mentioned in our website.</p>
    <br /><br />
    <p>Thank you!</p>
  `;
  // send mail with defined transport object
  let mailOptions ={
    from: '"Kairoscope Photography" <kairoscopephotgraphy@gmail.com>', // sender address
    to: `${req.body.c_emailid}`, // list of receivers
    subject: "Order Declined Mail", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  //send mail with defined transporter object
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
    }else {
      console.log('Email sent to client successfully');
    }
  });

  var sql = "DELETE FROM orders WHERE order_id = ?";
  connection.query(sql, [`${req.params.id}`], function(error, result) {
    if(error) throw error;
    console.log(result);
    if(result.affectedRows) {
      console.log('Order deleted successfully from Pending orders');
      res.redirect('/admin-panel/homeadmin');
    }
  });
});

router.get('/homeadmin/complete-order/:id', function(req, res) {
  let sql = `SELECT * FROM confirm_orders WHERE order_id = ${req.params.id}`;
  connection.query(sql, function(error, result) {
      if(error) throw error;
      res.render('completeorder', {
        items : result
      });
  });
});

router.post('/homeadmin/completeorder/:id', function(req, res) {
console.log(req.body);
  var output = `
    <h4>Your order has been completed by Kairoscope Photography</h4>
    <p>Thanks ${req.body.c_name} for giving us the opportunity to capture your percious moments.<br/> We are glad let you know that your order has been completed successfully!!! <br/>We'll meet you guys soon to deliver your framed moments to you...
    <br /><br />For any queries, please feel free to contact us through our Email Id or on our Phone Number mentioned in our website.</p>
    <br /><br />
    <p>Thank you!</p>
  `;
  // send mail with defined transport object
  let mailOptions ={
    from: '"Kairoscope Photography" <kairoscopephotgraphy@gmail.com>', // sender address
    to: `${req.body.c_emailid}`, // list of receivers
    subject: "Order Completion  Mail", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  //send mail with defined transporter object
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
    }else {
      console.log('Email sent to client successfully');
    }
  });

  var complete_details = {
    "order_id" : req.body.o_id,
    "client_name" : req.body.c_name,
    "client_contact" : req.body.c_contact,
    "client_email_id" : req.body.c_emailid,
    "client_address" : req.body.c_address,
    "event_type" : req.body.e_type,
    "order_date" : req.body.o_date,
    "event_date" : req.body.e_date,
    "time_FROM" : req.body.t_from,
    "time_TO" : req.body.t_to,
    "event_address" : req.body.e_address
  };

  var sql = "INSERT INTO completed_orders SET ?; DELETE FROM confirm_orders WHERE order_id = ?";
  connection.query(sql, [complete_details, `${req.params.id}`], function(error, result) {
    if(error) throw error;
    console.log(result);
    if(result[0].affectedRows) {
      console.log('Order inserted successfully in Completed orders');
    }
    if(result[1].affectedRows) {
      console.log('Order deleted successfully from Confirm orders');
    }
    res.redirect('/admin-panel/homeadmin');
  });

});

router.get('/homeadmin/complete-order/:id', function(req, res) {
  let sql = `SELECT * FROM completed_orders WHERE order_id = ${req.params.id}`;
  connection.query(sql, function(error, result) {
      if(error) throw error;
      res.render('completeorder', {
        items : result
      });
  });
});

router.get('/editcost', function(req, res) {
  connection.query('SELECT * FROM event', function(error, result) {
      if(error) throw error;
      res.render('editcost', {
        items : result
      });
  });
});

router.get('/editcost/new-cost/:id', function(req, res) {
  let sql = `SELECT * FROM event WHERE event_id = ${req.params.id}`;
  connection.query(sql, function(error, result) {
      if(error) throw error;
      res.render('newcost', {
        items : result
      });
  });
});

router.post('/editcost/newcost/:id', function(req, res) {
  var newCost = req.body.e_newcost;
  if (newCost.length > 3 ) {
    let sql = `UPDATE event SET event_cost = '${req.body.e_newcost}' WHERE event_id = ${req.params.id}`;
    connection.query(sql, function(error, result) {
      if(error) throw error;
      console.log(result);
      if(result.affectedRows){
        res.redirect('/admin-panel/editcost');
      }
    });
  }else {
    res.send('Enter a valid amount');
  }
});

router.get('/uploadpictures', function(req, res) {
  res.render('uploadpictures');
});

router.post('/upload-pictures', function(req,res) {
  upload(req, res, function(err) {
    if(err){
      res.render('uploadpictures', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('uploadpictures', {
          msg: 'Error: No file Selected!'
        });
      } else {
        console.log(req.file);
        res.render('uploadpictures', {
          msg: 'Image File Uploaded!'
        });
      }
    }
  });
});

module.exports = router;
