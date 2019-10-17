const { PeerRPCClient } = require('grenache-nodejs-http')
const link = require('../../util/link')

const peer = new PeerRPCClient(link, {})
peer.init()

module.exports = peer
