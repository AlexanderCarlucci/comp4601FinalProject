/**
 * Created by Alex on 4/15/18.
 */
let setup = require('./setup');
let posts = setup.getPosts();


module.exports = function(users){
  let result = [];
  for(let i = 0; i < users.length; i++){
    let userResults = [];
    let userPosts = [];

    for(let j = 0; j<posts.length; j++){
      if(posts[j].uid === users[i].id){
        userPosts.push(posts[j])
      }
    }

    for(let j = 0; j < users[i].friends.length; j++){
      let friendsPosts = [];
      for(let k = 0; k < posts.length; k++){
        if(posts[k].uid === users[i].friends[j]){
          friendsPosts.push(posts[k]);
        }
      }

      let friendsLikes = 0;
      let yourLikes = 0;
      let doTheyLikeYou = false;

      for(let k = 0; k<friendsPosts.length; k++){
        if(friendsPosts[k].likes.includes(users[i].id)){
          yourLikes+=1;
        }
      }

      for(let k = 0; k<userPosts.length; k++){
        if(userPosts[k].likes.includes(users[i].friends[j])){
          friendsLikes+=1;
        }
      }

      for(let k = 0; k<users.length; k++){
        if(users[k].id === users[i].friends[j]){
          if(users[k].friends.includes(users[i].id)){
            doTheyLikeYou = true;
          }
        }
      }

      var association = {
        'friendID': friendID,
        'yourLikes': yourLikes,
        'theirLikes': friendsLikes,
        'percentOfPostsYouLike': yourLikes/friendsPosts.length,
        'percentOfPostsTheyLike': friendsLikes/userPosts.length,
        'areYouTheirFriend': doTheyLikeYou
      };
      userResults.push(association);
    }
    result.push(userResults);
  }
  return result;
};