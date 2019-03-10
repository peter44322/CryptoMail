const { Packet } = require("./Packet");
const { Peer } = require("./Peer");
const crypto = require("crypto");
const { Chain } = require("./Chain");
const PROTOCOLES = require("./protocoles-config.json");
const EllipticCurve = require("elliptic").ec;
class User {
    constructor() {
        const ec = new EllipticCurve("secp256k1");
        this.peers = [];
        this.Myaddress = ec.genKeyPair();
        this.BlockChain = new Chain();
        this.networkBlockChain = [];
        this.id = crypto.randomBytes(32);
    }

    createMyBlockChain() {
        this.BlockChain = new Chain();
    }

    getMyChain() {
        return this.BlockChain;
    }

    send(To, Body) {
        this.BlockChain.send(this.Myaddress.getPublic("hex"), To, Body);
    }

    mine() {
        return this.BlockChain.mine();
    }

    GetLongestChain(networkBlockChain) {
        for (let peer in this.peers) {
            this.Request(peer);
        }
        //get the longest one in the network
        var Longest = networkBlockChain[0];
        for (let BlockChain in networkBlockChain) {
            if (BlockChain.length > Longest) {
                Longest = BlockChain;
            }
            //this.BlockChain = Longest;
        }
        this.BlockChain = Longest;

        return true;
    }

    Request(id = null) {
            let packet = new Packet(
                PROTOCOLES.request_blockchain,
                this.id.toString("hex")
            );
            for (let peer in this.peers) {
                if (id) {
                    if (peer == id) {
                        this.peers[peer].sendPackage(packet);
                        return true;
                    }
                } else {
                    //Request from all
                    this.peers[peer].sendPackage(packet);
                    return true;
                }

                return false;
            }
        }
        /**
         *
         * @param {Peer} peer
         */

    addPeer(peer) {
        this.peers[peer.id] = peer;

        //this.GetLongestChain(networkBlockChain);
    }

    hasPeer(peer) {
        for (let thatPeer in this.peers) {
            if (thatPeer.id === peer.id) {
                return true;
            }
        }
        return false;
    }
}

module.exports.User = User;