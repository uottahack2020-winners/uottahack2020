var express = require('express');
var router = express.Router();
var firebase = require('firebase');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/drivers/:id', function(req, res, next){
    
})

module.exports = router;
