const Block = require("./Block");

function Chain() {
  this.blocks = [new Block(null, null)];
  this.pendingMails = [];
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
