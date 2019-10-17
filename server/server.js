const _ = require('lodash')
const { PeerRPCServer } = require('grenache-nodejs-http')
const config = require('./config/app')
const link = require('./app/util/link')
const app = require('./lib')
const grape = require('./app/util/grape')
const addOffer = require('./app/util/announcementHandler')
const { putMutable } = require('./app/services/dht/AddUpdateObject')
const ed = require('ed25519-supercop')
const { announce } = require('./app/util/announce')
const Offer = require('./app/models/Offer')
const OffersKeyList = require('./app/services/OffersKeyList')

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
  console.log('Revied req from client', payload) // hello
  switch (payload.type) {
  case 'bid':
    const keys = OffersKeyList.getKey(payload.offer_id)
    console.log(keys.hash)

    link.get(keys.hash, (err, res) => {
      console.log('data requested to the DHT', err, res)

      const offerRaw = JSON.parse(res.v)
      console.log(offerRaw, '*************')

      const offer = new Offer(offerRaw)
      offer.availability = false
      offer.sequence += 1
      const opts = {
        keys: keys.keys
      }

      putMutable({ seq: offer.sequence, v: JSON.stringify(offer) }, opts, (err, hash) => {
        OffersKeyList.removeKey(payload.offer_id)

        console.log('data saved to the DHT', err, hash)
        if (hash) {
          announce(`REMOVE_OFFER:${hash}`, () => { })

          link.get(hash, (err, res) => {
            const offerRaw = JSON.parse(res.v)
            console.log(offerRaw, '****deleted*********')
          })
        }
      })
    })

    break
  }
  handler.reply(null, 'world11') // accept request
})

// Add handlers listening for announcements
grape.on('announce', addOffer)

app.start(config.get('app.expressport'))
  .then(message => {
    console.log(message)
  })
  .catch(error => {
    console.log(error)
  })
