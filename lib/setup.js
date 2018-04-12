
let users = [];
let posts = [];

let generateUsers = function() {
  //do out user generation and return JSON representation
  for (let i = 0; i < 100; i++) {
    let user = {};
    user.id = "u" + i;
    user.displayName = "AverageJoe" + i;
    user.friends = [];
    users.push(user);
  }
};

let populateUsers = function() {
  for (let i = 0; i < users.length; i++) {
    for(let j = 0; j < Math.floor((Math.random() * 50) + 10); j++){
      users[i].friends.push("u" + Math.floor((Math.random() * 99) + 1));
    }
  }
};

let generatePosts = function() {
  for (let i = 0; i < 1000; i++) {
    let post = {};
    post.id = "p" + i;
    post.uid = "u" + Math.floor((Math.random() * 99) + 1);
    post.content = "sample content";
    post.likes = [];
    posts.push(post);
  }
};

let populatePosts = function() {
  for (let i = 0; i < posts.length; i++) {
    for(let j = 0; j < users.length; j++){
      if(users[j].id === posts[i].uid){
        for (let k = 0; k < users[j].friends.length; k++){
          if (Math.random() <= 0.5){
            posts[i].likes.push(users[j].friends[k])
          }
        }
        break;
      }
    }
  }
};

loadUsers = function() {
  //loadUsers from the file
};

saveUsers = function(users) {
  // save generated users to a file
};

exports.getUsers = function() {
  return users;
};

exports.getPosts = function() {
  return posts;
};

exports.configureUsers = function(){
  generateUsers();
  populateUsers();
  generatePosts();
  populatePosts();
};