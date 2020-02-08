var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/drivers?', function(req, res, next){

  var db = firebase.firestore();
  //use id to post
  db.collection('users').doc('users').collection('drivers').doc(req.query.uid)
    .set({
      name: req.query.name,
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

module.exports = router;
