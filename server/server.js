const _ = require('lodash')
const { PeerRPCServer } = require('grenache-nodejs-http')
const config = require('./config/app')
const link = require('./app/util/link')
const app = require('./lib')

const peer = new PeerRPCServer(link, {
  timeout: config.get('peer.timeout')
})
peer.init()

const service = peer.transport(config.get('peer.transport.type'))
service.listen(config.get('app.port'))

setInterval(function () {
  link.announce(config.get('app.name'), service.port, {})
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  console.log(payload) // hello
  handler.reply(null, 'world11')
})

app.start(config.get('app.expressport'))
  .then(message => {
    console.log(message)
  })
  .catch(error => {
    console.log(error)
  })
