
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , api = require('./routes/api')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Connect to db
//mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://nodejitsu:8b90f399bc2d2556e671c464a7fab425@linus.mongohq.com:10060/nodejitsudb8967581531');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('cool');
});

var articleSchema = mongoose.Schema({
  title: String,
  text: String
});

articleSchema.methods.speak = function () {
  var greeting = this.title ? "My title is " + this.title : "I've no title";
  console.log(greeting);

};

var Article = mongoose.model('Article', articleSchema);

var t = new Article({
  title: 'test',
  text: 'lorem ipsum'
});
t.save(function (err, t) {
  if(err) {
    console.log('error occured');
  } else {
    t.speak();
  }
});
console.log(t.speak());

Article.find(function (err, articles) {
  if(err) {
    console.log('error occured');
  } else {
    console.log(articles);

  }
});


//Routes

app.get('/', routes.index);
app.get('/addPost', routes.renderAddPost);
app.get('/editPost/:id', routes.renderEditPost);
app.post('/post', routes.addPost);

//app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/post', api.posts);
app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index
app.get('*', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
