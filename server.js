var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var _ = require("underscore");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use("/styles",express.static(__dirname + '/styles'));

app.use("/scripts",express.static(__dirname + "/scripts"));


var posts = [
  {id: 1, name: 'Loud fart', desc: 'in class today -_-'},
  
];
//fart even louder



// API ROUTES

// ROUTES
// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/warning.html');

});

//  index
app.get('/api/posts', function (req, res) {
  // send all phrases as JSON response
  res.json(posts);
});

// create new post
app.post('/api/posts', function (req, res) {
  // grab params (word and definition) from form data
  var newPost = req.body;
  
  // set sequential id (last id in `phrases` array + 1)
  if (posts.length > 0) {
    newPost.id = posts[posts.length - 1].id +  1;
  } else {
    newPost.id = 0;
  }

  // add newPhrase to `phrases` array
  posts.push(newPost);
  
  // send newPhrase as JSON response
  res.json(newPost);
});

// update phrase
app.put('/api/posts/:id', function (req, res) {

  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in `phrases` array matching the id
  var foundPost = _.findWhere(posts, {id: targetId});

  // update the phrase's word
  foundPost.word = req.body.name;

  // update the phrase's definition
  foundPhrase.definition = req.body.desc;

  // send back edited object
  res.json(foundPost);
});

// delete phrase
app.delete('/api/posts/:id', function (req, res) {
  
  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in `phrases` array matching the id
  var foundPost = _.findWhere(posts, {id: targetId});

  // get the index of the found item
  var index = posts.indexOf(foundPost);
  
  // remove the item at that index, only remove 1 item
  posts.splice(index, 1);
  
  // send back deleted object
  res.json(foundPost);
});








// set server to localhost:3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});