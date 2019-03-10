const { Packet } = require("./Packet");
const EventEmitter = require("events");

class Peer extends EventEmitter {
  constructor(id, conn, index) {
    super();
    this.id = id;
    this.conn = conn;
  }

  /**
   *
   * @param {Packet} packet
   */
  sendPackage(packet) {
    //console.log("sending to " + this.id);
    this.conn.write(JSON.stringify(packet));
  }
}

module.exports.Peer = Peer;
