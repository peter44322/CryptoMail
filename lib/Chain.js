const { Block } = require("./Block");
const { Mail } = require("./Mail");

function Chain(difficulty = 4) {
    this.blocks = [new Block(null, null)];
    this.pendingMails = [new Mail('test', 'p', 'ddd'), new Mail('test2', 'p', 'ddd')];
    this.difficulty = difficulty;
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
    let targetMail = this.getMailToSend();
    let block = new Block(targetMail, this.lastBlock().hash);

    //attemp to add the block
    if (targetMail && block.mine(this.difficulty)) {
        this.blocks.push(block);
        this.pendingMails.pop();
        return true;
    }
};
Chain.prototype.length = function() {
    return this.blocks.length;
};

module.exports.Chain = Chain;