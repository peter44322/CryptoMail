const { User } = require("./User");
const { Peer } = require("./Peer");
const getPort = require("get-port");
const Swarm = require("discovery-swarm");
const defaults = require("dat-swarm-defaults");
const PROTOCOLES = require("./protocoles-config.json");
const { Packet } = require("./Packet");
const { Chain } = require("./Chain");

const CHANNEL_NAME = "Crypto-Mail";
/**
 * @param {User} user
 */
function Connection(user) {
    const config = defaults({
        id: user.id
    });

    this.user = user;
    this.swarm = Swarm(config);
    this.port = getPort();
    this.networkBlockChain = [];

    this.start();
}

Connection.prototype.start = async function() {
    let port = await this.port;
    this.swarm.listen(port);
    console.log(`Listening on port ${port}`);
    this.swarm.join(CHANNEL_NAME);
    await this.swarm.on("connection", (conn, info) => {
        // Connection id
        const peerId = info.id.toString("hex");

        //handling reciving block event

        conn.on("data", async packet => {
            packet = JSON.parse(packet.toString());
            // content = packet.content.toString();
            if (packet.type === PROTOCOLES.receive_blockchain) {
                this.networkBlockChain.push(JSON.parse(packet.content));
                //console.log(networkBlockChain);
                this.user.GetLongestChain(this.networkBlockChain);
            } else if (
                packet.type === PROTOCOLES.request_blockchain &&
                this.user.BlockChain != undefined
            ) {
                //sending my blockchain
                let myChainPacket = new Packet(
                    PROTOCOLES.receive_blockchain,
                    JSON.stringify(this.user.BlockChain)
                );

                peer.sendPackage(myChainPacket);
            }
        });

        let peer = new Peer(peerId, conn);
        if (!this.user.peers[peerId]) {
            this.user.addPeer(peer);
            //this.user.Request(peerId);
            console.log(`Connected to peer: ${peerId}`);

            // this.user.createMyBlockChain(networkBlockChain);
            // this.user.send("ddd", "ddd");

            console.log(this.user.BlockChain);
        }
    });
};
Connection.prototype.request_largest = function() {
    this.user.Request(null);
    this.user.GetLongestChain(this.networkBlockChain);
}


module.exports.Connection = Connection;