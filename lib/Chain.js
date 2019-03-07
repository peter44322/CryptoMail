import Block from "./Block";
import Mail from "./Mail";

function Chain(difficulty) {
  this.blocks = [new Block(null, null)];
  this.blockspendingMails = [];
  this.difficulty = 2;
}

Chain.prototype.isValid = function() {
  for (let i = 1; i < this.blocks.length; i++) {
    const cur = this.blocks[i];
    const prev = this.blocks[i - 1];
    if (cur.prevHash !== prev.generateHash()) {
      return false;
    }
  }
  return true;
};

Chain.prototype.add = function(mail) {
  this.pendingMails.push(mail);
};

Chain.prototype.print = function() {
  this.blocks.forEach(block => {
    console.log(block);
    console.log();
  });
};

Chain.prototype.send = function(from, to, body) {
  let mail = new Mail(from, to, body);
  this.add(mail);
};

Chain.prototype.getMailToSend = function() {
  let arraySize = this.pendingMails.length;
  return this.pendingMails[arraySize - 1];
};

Chain.prototype.lastBlock = function() {
  let arraySize = this.blocks.length;
  return this.blocks[arraySize - 1];
};

Chain.prototype.mine = function() {
  targetMail = this.getBlockToMine;
  let Block = new Block(targetMail, this.lastBlock().hash);

  //attemp to add the block
  if (Block.mine(this.difficulty)) {
    this.blocks.push(Block);
    this.pendingMails.pop();
    return true;
  }
};
