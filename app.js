
const express = require('express');
const setup = require('./lib/setup.js');
const users = require('./lib/users.js');
const dust = require('express-dustjs');
const path = require('path');

const app = express();
setup.configureUsers();

app.engine('dust', dust.engine({
  useHelpers: true
}));

app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));

app.get("/start", setup.configureUsers);

app.get("/", users.renderAllUsers);

app.get("/user/:userid", users.getUser);





app.listen(3000, () => console.log('Example app listening on port 3000!'));