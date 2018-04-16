
let setup = require("./setup.js");

//users
let users = setup.getUsers();

//posts
let posts = setup.getPosts();


let getAUser = function(uid){
  for(let i = 0; i<users.length; i++){
    if(users[i].id===uid){
      return users[i]
    }
  }
};

exports.getUser = function(req, res){
  let model = {
    posts: [],
    user: {},
    friends: []
  };
  if(req.params.userid){
    for(let i = 0; i < users.length; i++){
      if(users[i].id == req.params.userid){
        model.user=users[i];
        for(let j = 0; j<posts.length; j++){
          if(posts[j].uid == users[i].id){
            model.posts.push(posts[j]);
          }
        }
        for(let j = 0; j<users[i].friends.length; j++){
          model.friends.push(getAUser(users[i].friends[j]));
        }
        res.render("user", model);
        return;
      }
    }
  }
  res.render('error',{code:404, message: "User Not Found"});
};

exports.renderAllUsers = function(req, res) {
  model = {
    users: users
  };
  res.render('home', model);
};