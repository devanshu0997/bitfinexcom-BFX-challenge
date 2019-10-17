const { Grape } = require('grenache-grape')
const config = require('../../config/app')

const grape = new Grape({
  host: config.get('link.grape.dht.host'),
  dht_port: config.get('link.grape.dht.port'),
  dht_bootstrap: [
    config.get('link.grape.dht.bootstrap')
  ],
  api_port: config.get('link.grape.dht.api_port')
})

grape.start()

module.exports = grape
