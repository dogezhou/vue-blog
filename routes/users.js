var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/database').User;

// 引入passport，专门负责auth2的认证，所有的第三方登录，都可以使用passport
var passport = require('passport');
// 在passport基础上，对整个协议进行的封装。
var GitHubStrategy = require('passport-github').Strategy;

//把用户登陆过来的信息，传递到passport之后，让它生成一个session，存储到内存里面
passport.serializeUser(function (user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

// 用户刷新页面的时候，会再从内存里面，把对应的session拿出来，解析，知道这个用户
passport.deserializeUser(function (obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: 'a83e797e0ca504ab017f',
  clientSecret: 'a295701380eaa01a8d4808d515ed2ea4f694cb03',
  callbackURL: "http://localhost:3000/users/github/callback"
},
  function (accessToken, refreshToken, profile, done) {
    // // 记录 github 登录的用户
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));

router.get('/github', passport.authenticate('github', { failureRedirect: '/login' }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res, next) {
    // console.log('req.user.id', req.user.id)
    User.findOrCreate({
      defaults: {
        githubId: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
      },
      where: { githubId: req.user.id }
    }).then(function (user) {
      var newUser = user[0].dataValues
      // console.log('成功之后', newUser)
      req.session.user = {
        id: newUser.id,
        githubId: newUser.githubId,
        username: newUser.username,
        avatar: newUser.avatar,
        provider: newUser.provider
      };
      res.redirect('/');
    });
  });

//注销
router.get('/logout', function (req, res, next) {
  req.session.destroy()  //销毁session
  res.redirect('/')  //跳转到首页
})

// 获取用户信息
router.get('/userInfo', function (req, res, next) {
  var data;
  console.log('req.sessiong', req.session.user)
  if (req.session.user) {
    data = {
      isLogin: true,
      user: req.session.user
    }
  } else {
    data = {
      isLogin: false
    }
  }
  // User.findOne({
  //   where: {
  //     id: 1
  //   }
  // }).then(function (user) {
  //   console.log('user', user)
  // })
  res.send({ status: 0, data })
})

module.exports = router;
