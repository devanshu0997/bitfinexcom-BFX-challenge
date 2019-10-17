const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'grenache-server',
      env: 'APP_NAME'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8081,
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
    },
    announce: {
      interval: {
        doc: 'Announce Internal',
        format: Number,
        default: 1000,
        env: 'LINK_ANNOUNCE_INTERNAL'
      }
    }
  },

  peer: {
    transport: {
      type: {
        doc: 'Peer Transport Type',
        format: String,
        default: 'server',
        env: 'PEER_TRANSPORT_TYPE'
      }
    },
    timeout: {
      doc: 'Server-side socket timeout',
      format: Number,
      default: 300000,
      env: 'PEER_SOCKET_TIMEOUT'
    },
    disableBuffered: {
      doc: 'Disable automatic buffering of the incoming request data stream.',
      format: Boolean,
      default: false,
      env: 'PEER_DISABLE_BUFFERED'
    }
  }
})

console.log('Starting service with', config.toString())

config.validate({ allowed: 'strict' })

module.exports = config
