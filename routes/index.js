var data = {
  "posts" : [
    {
      "title": "Lorem ipsum",
      "id" : 1,
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "id":2,
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

module.exports.data = data;
/*
 * GET home page.
 */
var api = require('./api');

exports.index = function(req, res){
  res.render('index', { title: 'Express', posts:data.posts });
};

exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.redirect('/');
};

exports.editPost = function (req, res) {

};

exports.renderAddPost = function (req, res) {
  //var name = req.params.name;
  //res.send('hi');
  res.render('partials/addPost', {
    len : data.posts.length
  });
};

exports.renderEditPost = function (req, res) {
  var t = 'asdf';
  res.render('partials/editPost', {
    post : data.posts[req.params.id -1]
  })
};