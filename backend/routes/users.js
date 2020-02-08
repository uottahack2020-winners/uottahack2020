var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var db = firebase.firestore();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/drivers/:id', function(req, res, next){
    //use id to post
    db.collection('users/drivers/'+ req.params.id);

});

module.exports = router;
