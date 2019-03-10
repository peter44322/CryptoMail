const express = require("express");
const app = express();
const expressEdge = require('express-edge');

const port = 3000;

const { Connection } = require("./lib/Connection");
const { User } = require("./lib/User");
var user = new User();
let id = user.id.toString("hex")

var connection = new Connection(user);




app.use(express.static('public'));
app.use(expressEdge);
app.get("/", (req, res) => {
    res.render('index', { id, user })
});

app.get("/mine", (req, res) => {
    user.BlockChain.mine();
    res.render('index', { id, user })
});

app.get("/largest", (req, res) => {
    connection.request_largest();
    res.render('index', { id, user })
});

app.listen(port, () => console.log(`listening on port ${port}!`));