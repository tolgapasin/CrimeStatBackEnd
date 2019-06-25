var express = require('express');

var router = express.Router();

// get list of genders
router.get('/', function(req, res, next) {
    req.db.from('offences').distinct("gender").pluck("gender")
   .then((rows) => {
   res.json({"query":{"offences" : rows}})
   })
   .catch((err) => {
   console.log(err);
   res.json({"Error" : true, "Message" : "Error in MySQL query"})
   })
  });
  
  

module.exports = router;