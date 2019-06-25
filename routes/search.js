var express = require('express');

var router = express.Router();


// search database for particular offences
// filter search query with area, age and/or gender
router.get('/', function(req, res, next) {
    let area = "%";
    let age = "%";
    let gender = "%";
    let year = "%";
    let month = "%";
    let offence = req.query.offence;
    let offenceCondensed = offence.replace(/[^A-Z]/gi, '');
 
    if (req.query.area) {
      area = req.query.area;
    }
    if (req.query.age) {
      age = req.query.age;
    }
    if (req.query.gender) {
      gender = req.query.gender;
    }
    if (req.query.year) {
      year = req.query.year;
    }
    if (req.query.month) {
      month = req.query.month;
    }
 
   
   req.db.from("areas").where("area", "LIKE", area).select("area as LGA", function() {
     this.sum(offenceCondensed).from("offences").whereRaw("offences.area LIKE areas.area AND age LIKE ? AND gender LIKE ? AND year LIKE ? AND month LIKE ?", [age, gender, year, month] ).as("total")}, "lat", "lng")
  .then((rows) => {
  res.json({"query":{"offence": req.query.offence, "area": req.query.area, "age": req.query.age, "gender": req.query.gender, "year": req.query.year, "month": req.query.month}, "result" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"message" : "oops! it looks like you're missing the offence query parm"})
  })
 
 });
 

module.exports = router;