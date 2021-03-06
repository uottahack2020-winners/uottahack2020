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


init();

// Initialize Firebase
function init() {
  firebase.initializeApp(firebaseConfig);
  let db = firebase.database();
};


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
app.listen(3000, function() {
  console.log('server running');
})