const { Chain } = require("./lib/Chain");

let chain = new Chain();

chain.send("peter", "jo", "fuckyou");
//chain.print();

chain.mine();

chain.print();
