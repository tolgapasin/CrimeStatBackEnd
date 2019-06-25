var express = require('express');

var router = express.Router();

// get offences list
router.get('/', function(req, res, next) {
    req.db.from('offence_columns').select("pretty").pluck("pretty")
   .then((rows) => {
   res.json({"query":{"offences" : rows}})
   })
   .catch((err) => {
   console.log(err);
   res.json({"Error" : true, "Message" : "Error in MySQL query"})
   })
  });
  

module.exports = router;