// const { Chain } = require("./lib/Chain");
// const {Mail} = require("./lib/Mail");
// const EllipticCurve = require('elliptic').ec;

// const ec = new EllipticCurve('secp256k1');
// const key = ec.genKeyPair();

// console.log(key.getPrivate('hex'));

// let chain = new Chain();

// let mail = new Mail(key.getPublic('hex'),'ss',"dfdfsdf");
// mail.SignMail(key);

// console.log(mail.GenerateHash());

// chain.add(mail);

// //chain.send("peter", "jo", "fuckyou");
// //chain.print();

// chain.mine();

// chain.print();

const { Connection } = require("./lib/Connection");
const { User } = require("./lib/User");
var user = new User();
var connection = new Connection(user);
console.log("You Are Ready");
