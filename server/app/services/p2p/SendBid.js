const peer = require('./GetPeerConnection')
const app = require('./../../../lib')

const sendBid = (clientId, offerId) => {
  const payload = { type: 'bid', offer_id: offerId }
  const opts = { timeout: 100000 }

  peer.request(clientId, payload, opts, (error, result) => {
    if (error) {
      return app.logger.error(error)
    }
    app.logger.info(result)
  })
}

module.exports = sendBid
