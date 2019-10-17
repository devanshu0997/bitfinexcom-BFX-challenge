const link = require('../../util/link')

// Adds object in DHT
const putMutable = (data, opts, callback) => {
  return link.putMutable(data, opts, callback)
}

module.exports = { putMutable }
