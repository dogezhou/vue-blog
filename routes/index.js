var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const html = fs.readFileSync(path.resolve(__dirname, 'frontend/vue-blog/dist/index.html'), 'utf-8')
  res.send(html)
});

module.exports = router;
