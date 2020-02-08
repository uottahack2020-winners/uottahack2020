var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.post('/drivers', function(req, res, next){

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

module.exports = router;
