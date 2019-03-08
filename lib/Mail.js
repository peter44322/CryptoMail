const SHA256 = require("crypto-js/sha256");

function Mail(from, to, content) 
{
    this.content = content;
    this.from = from;
    this.to = to;
    this.signature = null;
}

Mail.prototype.GenerateHash = function () 
{
    return SHA256(this.content + " : " + this.from + " : " + this.to).toString();
};
Mail.prototype.SignMail = function (key) 
{
    if (key.getPublic('hex') !== this.from)
      return false;
    
    const HashMail = this.GenerateHash();
    const sign = key.sign(HashMail, 'base64');
    this.signature = sign.toDER('hex');
};
module.exports.Mail = Mail;
