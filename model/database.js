var Sequelize = require('sequelize')
var path = require('path')

var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite')
});

sequelize
  .authenticate()
  .then(() => {
    console.log('✅- Connection has been established successfully.');
  })
  .catch(err => {
    console.error('❌- Unable to connect to the database:', err);
  });

var Blog = sequelize.define('blog', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
});

var User = sequelize.define('user', {
  githubId: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
  provider: {
    type: Sequelize.STRING
  },
});

Blog.belongsTo(User)

// 根据 model自动创建表
sequelize
  .sync()
  .then(() => {
    console.log('init db ok')
  })
  .catch(err => {
    console.log('init db error', err)
  })




// Blog.sync().then(function () {
//   Blog.create({
//     text: 'hello world',
//   }).then(function () {
//     Blog.findAll({ raw: true }).then(function (notes) {
//       console.log(notes)
//     })
//   })
// });

module.exports = {
  Blog,
  User,
};