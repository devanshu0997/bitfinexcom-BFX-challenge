const Link = require('grenache-nodejs-link')
const _ = require('lodash')
const { PeerRPCClient } = require('grenache-nodejs-http')
const config = require('./config/app')

const link = new Link({
  grape: config.get('link.grape.address')
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

peer.request(config.get('service.name'), 'hello', { timeout: config.get('peer.timeout') }, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log(data) // world
})
