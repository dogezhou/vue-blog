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
  .get('/blog/:id', function (req, res, next) {
    var id = req.params.id;
    Blog.findOne({
      where: {
        id
      }
    }).then(function (blog) {
      res.send({ status: 0, data: blog })
    })
  })  
  .post('/blog', function (req, res, next) {
    var content = req.body.content || ''
    Blog.create({
      title: req.body.title,
      content: content,
      description: req.body.description || content.substring(0, 20),
    }).then(function (newItem) {
      res.send({ status: 0, data: newItem.dataValues })
    }).catch(err => {
      console.log('error', err)
    });
  })
  .put('/blog/:id', function (req, res, next) {
    var id = req.params.id;
    Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
        description: req.body.description
      },
      {
        where: { id }
      }
    ).then(function (blogId) {
      Blog.findOne({
        where: {
          id: blogId
        }
      }).then(function (blog) {
        res.send({ status: 0, data: blog })
      })      
    })
  })
  .delete('/blog/:id', function (req, res, next) {
    var id = req.params.id;
    Blog.destroy({ where: { id } })
      .then(function (blog) {
        res.send({ status: 0, data: blog })
    })
  })

module.exports = router;