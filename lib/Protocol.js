const { User } = require("./User");
class Protocol{
constructor(user,type,data){
this.user=user;
this.type=type;
this.data=data;
}

SendBlockChain(Peers){
    for(let peer in Peers){
          if(peer.id == this.data){
          return user.BlockChain;}
        }
}

Request(peers)
{
    if(this.type==="request")
    {
        SendBlockChain(peers);
    }
}  
};
