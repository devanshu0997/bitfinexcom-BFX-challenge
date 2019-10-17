const link = require('./link')
const logger = require('./../../lib/logger')
const Offer = require('../models/Offer')
const OffersList = require('../services/OffersList')

const handler = (message) => {
  logger.info('Detected an message in Network')
  logger.info(`message: ${message}`)

  if (message.startsWith('ADD_OFFER:')) {
    const hash = message.replace('ADD_OFFER:', '')

    link.get(hash, (error, res) => {
      if (error) {
        return logger.error('Error Occurred While Fetching New Offer.')
      }

      const offerRaw = JSON.parse(res.v)
      const offer = new Offer(offerRaw)

      OffersList.addOffer(offer)

      logger.info('Add Offer Announcement. Local Bulletin Updated!')
    })
  } else if (message.startsWith('REMOVE_OFFER:')) {
    const hash = message.replace('REMOVE_OFFER:', '')

    link.get(hash, (error, res) => {
      if (error) {
        return logger.error('Error Occurred While Fetching Removed Offer.')
      }

      const offerRaw = JSON.parse(res.v)
      OffersList.removeOffer(offerRaw.id)

      logger.info('Remove Offer Announcement. Local Bulletin Updated!')
    })
  }
}

module.exports = handler
