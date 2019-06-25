var express = require('express');

var router = express.Router();

// get list of areas
router.get('/', function(req, res, next) {
    req.db.from('offences').distinct("area").pluck("area")
   .then((rows) => {
   res.json({"query":{"offences" : rows}})
   })
   .catch((err) => {
   console.log(err);
   res.json({"Error" : true, "Message" : "Error in MySQL query"})
   })
  });

module.exports = router;