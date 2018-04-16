
const express = require('express');
const associate = require('./lib/associate.js');
const setup = require('./lib/setup.js');
const users = require('./lib/users.js');
const algorithm = require('./lib/algorithm');
const cluster = require('./lib/kmeans.js');
const dust = require('express-dustjs');
const pagerank = require('pagerank-js');
const path = require('path');



const app = express();
setup.configureUsers();
const userList = cluster.cluster();
const associations = associate(userList);
//console.log(associations);

app.engine('dust', dust.engine({
  useHelpers: true
}));

app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));

app.get("/start", setup.configureUsers);

app.get('/user/suggest/:userid', function(req,res){
  algorithm(req,res,userList,associations);
});


app.get("/", users.renderAllUsers);

app.get("/user/:userid", users.getUser);





app.listen(3000, () => console.log('Web Service listening on port 3000!'));