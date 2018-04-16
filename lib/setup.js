let pageNames  = require('../config/PageNames.json');
let peopleNames = require('../config/PeopleNames.json');
let pageRank = require('pagerank-js');
let users = [];
let posts = [];
let pages = [];

let generateUsers = function() {
  //do out user generation and return JSON representation
  for (let i = 0; i < 100; i++) {
    let user = {};
    user.id = i;
    user.displayName = peopleNames.firstnames[Math.floor(Math.random() * peopleNames.firstnames.length)] + " " + peopleNames.lastnames[Math.floor(Math.random() * peopleNames.lastnames.length)];
    user.friends = [];
    user.likedPages = [];
    user.friendRank = 0;
    users.push(user);
  }
};

let populateUsers = function() {
  for (let i = 0; i < users.length; i++) {
    for(let j = 0; j < Math.floor((Math.random() * 50) + 40); j++){
      users[i].friends.push(Math.floor((Math.random() * 99) + 1));
    }
    users[i].friends = users[i].friends.filter(removeDuplicates);
    for(let j = 0; j < Math.floor((Math.random() * 30) + 6); j++){
      let p = pageNames.names[Math.floor((Math.random() * pageNames.names.length))];
      if(users[i].likedPages.includes(p)){
        j--;
        continue;
      }else{
        users[i].likedPages.push(p);
      }
    }
  }
};

let generatePosts = function() {
  let c = 0;
  for(let i = 0; i<users.length; i++) {
    let numPosts = Math.floor((Math.random() * 30) + 2);
    for(let j = 0; j < numPosts; j++) {
      let post = {};
      post.id = "p" + c;
      post.uid = i;
      post.content = "sample content";
      post.likes = [];
      posts.push(post);
      c++;
    }
  }
};

generatePages = function() {
  for (let i = 0; i < pageNames.names; i++){
    let page  = {
      name: pageNames.names[i],
      content: "This is some content about " + pageNames.names[i]
    };
    pages.push(page);
  }
};

let populatePosts = function() {
    for(let j = 0; j < users.length; j++){
      for(let k = 0; k < users[j].friends.length; k++){
        for(let i = 0; i<posts.length; i++){
          let doTheyLike = (Math.random() < 0.30);
          if(doTheyLike && posts[i].uid === users[j].friends[k]){
            posts[i].likes.push(users[j].id);
          }
        }
      }
    }
};

let removeDuplicates = function(value, index, self) {
    return self.indexOf(value) === index;
};

let assignFriendRank = function(){
  let matrixOfNodes = [];
  for(let i = 0; i < users.length; i++){
        matrixOfNodes.push(users[i].friends);
  }
  for(let i = 0; i < users.length; i++) {
      pageRank(matrixOfNodes, 0.85, 0.0001, function (err, res) {
        if (err) throw new Error(err);
        users[i].friendRank = res[i];
      });
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

exports.getPages = function() {
  return pages;
};

exports.configureUsers = function(){
  generatePages();
  generateUsers();
  populateUsers();
  generatePosts();
  populatePosts();
  assignFriendRank();

  //console.log(users);
};
