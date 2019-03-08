const crypto = require('crypto')
const Swarm = require('discovery-swarm')
const defaults = require('dat-swarm-defaults')
const getPort = require('get-port')
const readline = require('readline')

class Peer
{
    constructor(peers, id, conn) 
    {
        this.peers = peers;
        this.connseq = 0;
        this.id = id;
        this.conn = conn
        //    console.log('Your identity: ' + myId.toString('hex'))

        this.conn.on('data', function (data) 
        {
            log('Received Message from peer ' + peerId, '----> ' + data.toString())  //open the connection to recieve data
        }) 

        this.conn.on('close', function () 
        {
            log('Connection ' + seq + 'closed, peer id: ' + peerId)    //handle deletion of a peer
            if (peers[peerId].seq === seq)    //check if a peer already connected
            {
                delete peers[peerId]
            }
        })
    }
}
