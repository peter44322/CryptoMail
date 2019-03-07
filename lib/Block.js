const SHA256 = require("crypto-js/sha256");

function Block(mail, prevHash = "") {
  this.mail = mail;
  this.prevHash = prevHash;
  this.timeStamp = Date.now();
  this.hash = "";
  this.nonce = 0;

  //generating the block hash
  this.generateHash();
}

Block.prototype.generateHash = function() {
  this.hash = SHA256(this.nonce + this.mail + this.prevHash + this.timeStamp);
  return this.hash;
};

Block.prototype.mine = function(difficulty) {
  zeros = this.generateZeros(difficulty);
  myHashRequiredZeros = this.hash.substring(0, difficulty);

  if (zeros == myHashRequiredZeros) {
    return true;
  }

  //didnt get it -> change nonce & regenerate the hash
  this.nonce++;
  this.generateHash();
  return this.mine(difficulty);
};

Block.prototype.generateZeros = function(number) {
  var string = "";
  for (var i = 0; i < number; i++) {
    string += "0";
  }
  return string;
};

module.exports.Block = Block;
