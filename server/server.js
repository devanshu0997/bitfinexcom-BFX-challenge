const { PeerRPCServer } = require('grenache-nodejs-http')
const config = require('./config/app')
const link = require('./app/util/link')
const app = require('./lib')
const logger = require('./lib/logger')
const grape = require('./app/util/grape')
const announcementHandler = require('./app/util/announcementHandler')
const BidController = require('./app/controllers/Bid.ctrl')

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
  switch (payload.type) {
    case 'bid':
      BidController.process(payload, handler)
      break
  }
})

// Add handlers listening for announcements
grape.on('announce', announcementHandler)

app.start(config.get('app.expressport'))
  .then(message => {
    logger.info(message)
  })
  .catch(error => {
    logger.error(error)
  })

function exitHandler() {
  process.exit(0)
}

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);
