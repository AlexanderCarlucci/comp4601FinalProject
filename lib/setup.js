let pageNames  = require('../config/PageNames.json');
let peopleNames = require('../config/PeopleNames.json');
let pagerank = require('pagerank-js');
let users = [];
let posts = [];
let pages = [];

let generateUsers = function() {
  //do out user generation and return JSON representation
  for (let i = 0; i < 100; i++) {
    let user = {};
    user.id = "u" + i;
    user.displayName = peopleNames.firstnames[Math.floor(Math.random() * peopleNames.firstnames.length)] + " " + peopleNames.lastnames[Math.floor(Math.random() * peopleNames.lastnames.length)];
    user.friends = [];
    user.likedPages = [];
    user.lastCommunication = [];
    user.friendRank = 0;
    users.push(user);
  }
};

let populateUsers = function() {
  for (let i = 0; i < users.length; i++) {
    for(let j = 0; j < Math.floor((Math.random() * 50) + 10); j++){
      users[i].friends.push("u" + Math.floor((Math.random() * 99) + 1));
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
    for(let m = 0; m < users[i].friends.length; m++){
      users[i].lastCommunication.push(gaussianRand());
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

let removeDuplicates = function(value, index, self) {
    return self.indexOf(value) === index;
};

let assignFriendrank = function(){
  let matrixOfNodes = [];
  for(let i = 0; i < users.length; i++){
        matrixOfNodes += users[i].friends;
  }
  for(let i = 0; i < users.length; i++) {
      pagerank(matrixOfNodes, 0.85, 0.000000000001, function (err, res) {
          if (err) throw new Error(err)

          users[i].friendRank = res[i];
      })
  }
};

//this generates numbers with an approximately gaussian distribution due to central limit theorem, subtract
let gaussianRand = function () {
  let rand = 0;
  for (let i = 0; i < 8; i += 1) {
    rand += Math.random();
  }
  return Math.floor(Math.abs((rand / 8) - 0.5) * 100);
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
  assignFriendrank();

  console.log(users);
};
