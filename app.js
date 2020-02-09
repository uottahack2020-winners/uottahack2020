var express = require('express');
var firebase = require("firebase");
var app = express();
var geoip = require('geoip-lite');


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

//google api config
var googleConfig = {
  apikey: "AIzaSyCCa30P9-jhu-MNAF8GlZ1hP5nSF1Lz_jo"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

app.get('/', function(req, res, next) {
  res.send('Hello');
});

app.get('/latlong', function(req, res, next) {
  //get ip address, feed into a geolookup
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
  let geo = geoip.lookup(ip);
  res.write(geo.ll);
});

//Rest API CRUD stuff
app.post('/items/', function(req, res, next) {
 //use id to post
 db.collection('items').doc(req.query.trackingNumber)
 .set({
   status: req.query.email,
   trackingNumber: req.query.firstName,
   dateRequested: req.query.lastName,
   datePickedUp: req.query.userType,
   rateForDelivery: req.query.email,
   weight: req.query.firstName,
   volume: req.query.lastName,
   itemType: req.query.userType,
   deliveryPerson: req.query.email,
   weight: req.query.firstName,
   volume: req.query.lastName,
   itemType: req.query.userType
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

app.get('/items/', async function(req, res,next) {
  const snapshot = await db.collection('items').get()
  res.send(snapshot.docs.map(doc => doc.data()));
});

app.get('/items/:id', function(req, res, next) {
  const itemId = req.params.id;
  const item = data.find(_item => _item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.json({ message: `item ${itemId} doesn't exist`})
  }
});

app.post('/users/drivers', function(req, res, next){


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

app.get('/users/drivers', function(req,res, next) {

});

app.get('/users/business', function(req,res, next) {

});

app.post('/users/business', function(req,res, next) {
  var db = firebase.firestore();
  //use id to post
  db.collection('users').doc('users').collection('business').doc(req.query.uid)
    .set({
      email: req.query.email,
      name: req.query.name,
      userType: req.query.userType,
      location: req.query.location
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