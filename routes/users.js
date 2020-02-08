var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var db = firebase.firestore();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/drivers?id', function(req, res, next){
  //use id to post
  db.collection('users').doc('users').collection('drivers').doc(req.params.uid)
    .set({
      name: req.params.name,
      email: req.params.email,
      firstname: req.params.firstName,
      lastname: req.params.lastName,
      userType: req.params.userType
    })
    .then(function(){
       res.send(200);
       console.log('success');
    })
    .catch(function(error) {
      res.send(69);
      console.error("Error writing");
    })

});

module.exports = router;
