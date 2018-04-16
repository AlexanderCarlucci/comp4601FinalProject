/**
 * Created by Alex on 4/15/18.
 */
module.exports = function(req,res,users,associations) {
  const model = {
    user: {},
    friends:[]
  };
  if(req.params.userid){
    let user = getAUser(users,req.params.userid);
    if(!user){
      res.render('error', {code:404, message: "User not found"});
      return;
    }
    for(let i = 0; i<user.friends.length; i++){
      let friend = getAUser(users, user.friends[i]);
      let tot = 0;
      for(let j = 0; j < user.friends.length; j++){
        tot+=user.lastCommunication[j];
      }

      let avg = tot/user.friends.length;
      let modelObj = {};
      model.thisid = user.id;
      modelObj.id = friend.id;
      modelObj.doTheyTalk = user.lastCommunication[i] > avg;
      modelObj.areTheyCluster = user.node === friend.node;
      modelObj.areYouTheirFriend = associations[user.id][i].areYouTheirFriend;
      modelObj.percentOflikedPosts = associations[user.id][i].percentOfPostsYouLike;
      modelObj.goodPercent = modelObj.percentOflikedPosts >0.1;
      modelObj.goodFriendRank = friend.friendRank > 1/friend.friendRank;
      let sd = false;
      let c = 0;
      if (modelObj.doTheyTalk === false){
        if(modelObj.areTheyCluster){
          c++;
        }
        if(modelObj.areYouTheirFriend){
          c++;
        }
        if(modelObj.goodPercent){
          c++;
        }
        if(modelObj.goodFriendRank){
          c++;
        }
        if(c < 2){
          sd = true;
        }
      }else{
        sd = false;
      }
      modelObj.sd = sd;
      model.friends.push(modelObj);
    }
    res.render('suggest',model)
  }else{
    res.render('error', {code:400, message: "No params"});
  }

};

let getAUser = function(users, userid){
  for(let i = 0; i<users.length; i++){
    if(users[i].id == userid){
      return users[i];
    }
  }
};