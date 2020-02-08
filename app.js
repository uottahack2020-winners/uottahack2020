var express = require('express');
var firebase = require("firebase");
var app = express();

//firebase config
var firebaseConfig = {
  apiKey: "AIzaSyCyN99QGRjjCkT7ljW6_fzhGCuNohxfE8Q",
  authDomain: "uottahack2020-18263.firebaseapp.com",
  databaseURL: "https://uottahack2020-18263.firebaseio.com",
  projectId: "uottahack2020-18263",
  storageBucket: "uottahack2020-18263.appspot.com",
  messagingSenderId: "1098902235369",
  appId: "1:1098902235369:web:392eddfa9eac4d53996878"
};



init();

// Initialize Firebase
function init() {
  firebase.initializeApp(firebaseConfig);
  let db = firebase.database();
};


app.get('/', function(req, res, next) {
  res.send('Hello');
})

app.get('/latlong', function(req, res, next) {
  // var ip = req.headers['x-forwarded-for'] || 
  //    req.connection.remoteAddress || 
  //    req.socket.remoteAddress ||
  //    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  res.send(req.connection.remoteAddress);
});


app.post('/users/drivers', function(req, res, next){

  var db = firebase.firestore();
  //use id to post
  db.collection('users').doc('users').collection('drivers').doc(req.query.uid)
    .set({
      email: req.query.email,
      firstname: req.query.firstName,
      lastname: req.query.lastName,
      userType: req.query.userType
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

module.exports = app;