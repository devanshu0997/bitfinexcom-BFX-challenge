const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'grenache-client',
      env: 'APP_NAME'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8082,
      env: 'APP_PORT'
    }
  },

  link: {
    grape: {
      address: {
        doc: 'Link Grape Address',
        format: String,
        default: 'http://127.0.0.1:30001',
        env: 'GRAPE_ADDRESS'
      }
    }
  },

  peer: {
    timeout: {
      doc: 'Server-side socket timeout',
      format: Number,
      default: 300000,
      env: 'PEER_SOCKET_TIMEOUT'
    }
  },

  service: {
    name: {
      doc: 'Service to look for',
      format: String,
      default: 'grenache-server',
      env: 'SERVICE_NAME'
    }
  }
})

console.log('Starting service with', config.toString())

config.validate({ allowed: 'strict' })

module.exports = config
