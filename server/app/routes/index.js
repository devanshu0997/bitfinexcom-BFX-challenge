const initOfferRoutes = require('./Offer')
const initBidRoutes = require('./Bid')

function initRoutes (app) {
  app.use('/offers', initOfferRoutes())
  app.use('/bids', initBidRoutes())
}

module.exports = initRoutes
