const { Protocol } = require("./Protocol");
class User{
constructor(peers, Myaddress ,BlockChain)
  {
    this.peers=peers;
    this.Myaddress=Myaddress;
    this.BlockChain=BlockChain;

  }
  send(To,Body){
    this.BlockChain.send(this.Myaddress,To,Body);
  }

  GetLongestChain(BlockChains){
    var Longest=BlockChains[0];
    for(let BlockChain in BlockChains){
    if(BlockChain.length>Longest){
      Longest=BlockChain;
    }
    this.BlockChain=Longest;
    return Longest;
  }

  }

    Request(id){
        protocol= new Protocol(this,"request",id);
        protocol.Request(this.peers);

    }
  }
