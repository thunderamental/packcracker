var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('Test res.send function call');
  res.render('index', { title: 'Express' });
  // This fails when we send a previous header. 
});


module.exports = router;
