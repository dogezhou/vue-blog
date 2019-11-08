var express = require('express');
var router = express.Router();
var Blog = require('../model/database').Blog;

router
  .get('/blog', function (req, res, next) {
    var page = req.query.page || 1
    Blog.findAll({
      limit: 10,
      offset: (page - 1) * 10,
    }).then(function (blog) {
      res.send({ status: 0, data: blog })
    })
  })
  .post('/blog', function (req, res, next) {
    Blog.sync({force: true}).then(function () {
      Blog.create({
        text: 'John',
      }).then(function (newItem) {
        res.send({ status: 0, data: newItem.dataValues })
      }).catch(err => {
        console.log('error', err)
      });
    });
  });

module.exports = router;