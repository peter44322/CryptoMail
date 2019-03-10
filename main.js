const express = require("express");
const app = express();
const expressEdge = require('express-edge');

const port = 3000;

const { Connection } = require("./lib/Connection");
const { User } = require("./lib/User");
var user = new User();
var connection = new Connection(user);
app.use(express.static('public'));
app.use(expressEdge);
//user.id.toString("hex")
app.get("/", (req, res) => res.render('index'));

app.listen(port, () => console.log(`listening on port ${port}!`));
