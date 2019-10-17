const initOfferRoutes = require('./Offer')

function initRoutes (app) {
  app.use('/offers', initOfferRoutes())
}

module.exports = initRoutes
