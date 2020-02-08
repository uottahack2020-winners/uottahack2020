var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase");
// required for side effects <= what does that mean google?
require('firebase/firestore');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//config
var config = {
  apiKey: "AIzaSyCyN99QGRjjCkT7ljW6_fzhGCuNohxfE8Q",
  authDomain: "https://uottahack2020-18263.firebaseapp.com",
  databaseURL: "https://uottahack2020-18263.firebaseio.com",
  projectId: "uottahack2020-18263",
  storageBucket:"uottahack2020-18263.appspot.com",
};

//initialize express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

firebase.initializeApp(config);
// just used this to test, should move somewhere else

var db = firebase.firestore();
db.collection('users').get()
     .then((snapshot) => {
       snapshot.forEach((doc) => {
               console.log(doc.id, '=>', doc.data());
       });
      }).catch((err) => {
         console.log('Error getting documents', err);
      });
    


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// == useless stuff, ignore == //
// // The Firebase Admin SDK to access the Firebase Realtime Database.
// var admin = require('firebase-admin');

// var serviceAccount = require("./uottahack2020-18263-firebase-adminsdk-fjx5g-1db522b766.json");
// // Initialize the app with a service account, granting admin privileges
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://uottahack2020-18263.firebaseio.com"
// });

// As an admin, the app has access to read and write all data, regardless of Security Rules
// var db = admin.firestore();
// var ref = db.ref("/userds/");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });