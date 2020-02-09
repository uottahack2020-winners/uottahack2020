var express = require('express');
var firebase = require("firebase");
var app = express();
var geoip = require('geoip-lite');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var constants = require('./utils/constants');

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


init();
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

app.get('/', function(req, res, next) {
  res.send('Hello');
});

app.get('/latlong', async function(req, res, next) {
  //get ip address, feed into a geolookup

  // var ip = req.headers['x-forwarded-for'] || 
  //    req.connection.remoteAddress || 
  //    req.socket.remoteAddress ||
  //    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  // let geo = geoip.lookup(ip);

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${constants.uOttawaAddress}&key=${constants.apiKey}`;
  var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url );
    xmlHttp.send( null );
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4) {
        let resJson = JSON.parse(xmlHttp.responseText);

        let latLong = resJson.results[0].geometry.location;
        // let lat = resJson.results[0].geometry.location.lat;
        // let long = resJson.responseText.results[0].geometry.location.long;

        res.send(latLong);
      } 
    }

  // let lat = latLong.results.geometry.location.lat;
  // let long = latLong.results.geometry.location.lng;
  // res.json({lat: lat, long: long});

  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
  let geo = geoip.lookup(ip);
  res.write(geo.ll);
});

//Rest API CRUD stuff

app.get('/items', function(req, res,next) {
  var itemsRef = db.ref('items');
  itemsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      res.write(childData);
    });
  })
});

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
  const snapshot = await db.collection('items').get();
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

app.get('/users/drivers', async function(req,res, next) {
    const snap =  await db.collection('users').doc('users').collection('drivers').get();
    res.send(snap.docs.map(doc => doc.data()));
});

app.get('/users/business/:id', async function(req,res, next) {
  const snap =  await db.collection('users').doc('users').collection('drivers').get()
    .then(function(doc) {
      if (doc.exists) {
          //console.log("Document data:", doc.data());
          res.send(doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          res.send(404);
      }
     }).catch(function(error) {
      console.log("Error getting document:", error);
     });
  
});

app.get('/users/business', async function(req,res, next) {
  const snap =  await db.collection('users').get();
  res.send(snap.docs.map(doc => doc.data()));
});

app.post('/users/business/:id', function(req,res, next) {
  //var db = firebase.firestore();
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
app.listen(3000, function() {
  console.log('server running');
});