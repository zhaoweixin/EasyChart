var express = require('express');
var router = express.Router();
var fs = require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/saveOption', function(req, res, next){
  let data = req.body.data,
    fileName = req.body.fileName
  let buf = Buffer(data, 'base64')
  console.log('1')
  fs.writeFile('./public/images/' + fileName, buf, 'base64', function(err){
    console.log("save pictrue image: ", err)
  });
  res.setHeader('Content-Type', 'application/json');
  res.json({"status":"success"})
})

module.exports = router;
