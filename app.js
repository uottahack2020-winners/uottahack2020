var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase");
var app = express();

//config
var firebaseConfig = {
  apiKey: "AIzaSyCyN99QGRjjCkT7ljW6_fzhGCuNohxfE8Q",
  authDomain: "uottahack2020-18263.firebaseapp.com",
  databaseURL: "https://uottahack2020-18263.firebaseio.com",
  projectId: "uottahack2020-18263",
  storageBucket: "uottahack2020-18263.appspot.com",
  messagingSenderId: "1098902235369",
  appId: "1:1098902235369:web:392eddfa9eac4d53996878"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/', function(req, res, next) {
  
});

app.post('/users/drivers', function(req, res, next){

  var db = firebase.firestore();
  //use id to post
  db.collection('users').doc('users').collection('drivers').doc(req.body.uid)
    .set({
      email: req.body.email,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      userType: req.body.userType
    })
    .then(function(){
       res.send(200);
       console.log('success');
    })
    .catch(function(error) {
      res.send(404);
      console.error("Error writing");
    })

});

// just used this to test, should move somewhere else

// var db = firebase.firestore();
// db.collection('users').get()
//      .then((snapshot) => {
//        snapshot.forEach((doc) => {
//                console.log(doc.id, '=>', doc.data());
//        });
//       }).catch((err) => {
//          console.log('Error getting documents', err);
//       });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', 3000);

module.exports = app;
