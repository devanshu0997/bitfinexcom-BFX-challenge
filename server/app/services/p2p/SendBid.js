const peer = require('./GetPeerConnection')

const sendBid = (name, payload, callback) => {
  peer.request(name, payload, { timeout: 100000 }, (err, result) => {
    if (err) return console.log(err)
    console.log(
      'Fibonacci number at place',
      payload.number,
      'in the sequence:',
      result
    )
  })
}

module.exports = sendBid
