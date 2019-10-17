const grape = require('./grape')

const announce = (data, callback) => {
  const val = grape.str2hex(data)

  grape.node.announce(
    val,
    grape.conf.dht_port,
    callback
  )
}

module.exports = { announce }
