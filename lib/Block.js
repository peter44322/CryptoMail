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
  this.hash = SHA256(
    this.nonce +
      " : " +
      this.mail +
      " : " +
      this.prevHash +
      " : " +
      this.timeStamp
  ).toString();
  return this.hash;
};

Block.prototype.mine = function(difficulty) {
  let zeros = this.generateZeros(difficulty);
  var myHashRequiredZeros = this.hash.substring(0, difficulty);

  while (zeros != myHashRequiredZeros) {
    //didnt get it -> change nonce & regenerate the hash
    this.nonce = this.nonce + 1;
    this.generateHash();
    myHashRequiredZeros = this.hash.substring(0, difficulty);
  }

  return true;
};

Block.prototype.generateZeros = function(number) {
  var string = "";
  for (var i = 0; i < number; i++) {
    string += "0";
  }
  return string;
};

module.exports.Block = Block;
