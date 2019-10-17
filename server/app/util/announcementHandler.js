const sendBid = require('../services/p2p/SendBid')
const link = require('./link')

const getDocument = () => {

}
const handler = (message, _ih) => {
  // console.log('Receieved announcement', message)
  // [TODO] add offer in list and respond with ok
  if (message.startsWith('ADD_OFFER:')) {
    console.log('Receieved offer', message)
    link.get(message.replace("ADD_OFFER:", ""), (err, res) => {
      console.log('data requested to the DHT', err, res)
      sendBid(JSON.parse(res.v).server, { number: 10 }, () => { })
    })


  } else if (message.startsWith('REMOVE_OFFER:')) {
    console.log('Receieved offer', message)
  }


  // else if (message.startsWith('ACCEPT_OFFER:')) {
  // console.log('Receieved offer', message)
  // }
}

module.exports = handler
