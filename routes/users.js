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
      res.send(404);
      console.error("Error writing");
    })

});

module.exports = router;
