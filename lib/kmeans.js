

const numCompare = 5;
const numClusters = 5;
let pageNames = require('../config/PageNames.json');
let setup = require('./setup');
let users = setup.getUsers();
let centroids = [];


let generateCentriods = function(){
  for(let i = 0; i<numClusters; i++){
    let c = [];
    for(let j = 0; j < numCompare; j++){
      let p = pageNames.names[Math.floor((Math.random() * pageNames.names.length))];
      if(c.includes(p)){
        j--;

      }else{
        c.push(p);
      }
    }
    centroids[i]=c;
  }
};

let addToUsers = function(){
  for(let i = 0; i < users.length; i++){
    users[i].node = -1;
    users[i].lastNode = -2;
    users[i].scores = [];
  }
};

let score = function(){
  for(let i = 0; i< users.length; i++){
    for(let j = 0; j < numClusters; j++){
      users[i].scores[j] = 0;
      for(let k = 0; k < numCompare; k ++){
        if(users[i].likedPages.includes(centroids[j][k])){
          users[i].scores[j] += 1;
        }
      }
    }
  }
};

let maxElem = function(array){
  if(array.length == 0)
    return null;
  let modeMap = {};
  let maxEl = array[0], maxCount = 1;
  for(let i = 0; i < array.length; i++)
  {
    let el = array[i];
    if(modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if(modeMap[el] > maxCount)
    {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};

let removeElem = function(arr, elem){
  return arr.filter(function(element){
    return element !== elem;
  });
};


let getBestX = function(arr) {
  let bestX = [];
  for (let i = 0; i < numCompare; i++) {
    bestX[i] = maxElem(arr);
    arr = removeElem(arr, bestX[i]);
  }
  return bestX;
};

let recalculateCentroids = function() {
  for(let i = 0; i<numClusters; i++){
    let allPages = [];
    for(let j = 0; j<users.length; j++){
      if(users[j].node === i){
        allPages = allPages.concat(users[j].likedPages);
      }
    }
    let newCluster = [];
    newCluster = getBestX(allPages);
    centroids[i] = newCluster;
  }
};

let vote = function() {
  for(let i = 0; i<users.length; i++){
    let newNode = 0;
    for(let j = 0; j<numClusters;j++){
      if(users[i].scores[j] > users[i].scores[newNode]){
        newNode = j;
      }
    }
    users[i].lastNode = users[i].node;
    users[i].node = newNode;
  }
};

let changed = function (user){
  return(user.lastNode != user.node)
};

let checkChanged = function(){
  for(let i = 0; i < users.length; i++){
    if(changed(users[i])) {
      return true;
    }
  }
  return false;
};

let Kmeans = function(){
  addToUsers();
  generateCentriods();
  let changed = true;
  let c = 0;
  while (changed){
    console.log("Iteration " + ++c);
    console.log("Scoring clusters");
    score();
    console.log("Voting for clusters");
    vote();
    for(let i = 0; i < users.length; i++)
    {
      console.log("User:" + users[i].displayName + "Scores: " + users[i].scores + "Node: " + users[i].node + "LastNode: " + users[i].lastNode);
    }
    console.log("Recalculating centroids");
    recalculateCentroids();
    console.log("Evaluating changed status");
    changed = checkChanged();
    console.log("Current centroids are");
  }
  console.log("Clustering Complete Current Centroids are:");
  console.log(centroids);
  let scores = [];
  for(let j = 0; j<numClusters; j++){
    scores[j] = 0;
  }
  for(let j = 0; j<users.length; j++){
    scores[users[j].node] += 1;
  }
  console.log(scores);

};

exports.cluster = function(){
  Kmeans();
};
