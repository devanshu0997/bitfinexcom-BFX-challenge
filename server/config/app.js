const convict = require('convict')
const uuidv4 = require('uuid/v4')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: `P2P_CLIENT:${uuidv4()}`,
      env: 'APP_NAME'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8081,
      env: 'APP_PORT'
    },
    expressport: {
      doc: 'The express port to bind.',
      format: 'port',
      default: 3000,
      env: 'EXPRESS_PORT'
    }
  },

  link: {
    grape: {
      aph: {
        address: {
          doc: 'Link Grape Address',
          format: String,
          default: 'http://127.0.0.1:30001',
          env: 'GRAPE_ADDRESS'
        }
      },
      dht: {
        host: {
          doc: 'Grape DHT Host',
          format: String,
          default: '127.0.0.1',
          env: 'GRAPE_DHT_HOST'
        },
        port: {
          doc: 'Grape DHT Port',
          format: 'port',
          default: '20003',
          env: 'GRAPE_DHT_PORT'
        },
        bootstrap: {
          doc: 'Grape DHT Bootstrap',
          format: String,
          default: 'http://127.0.0.1:20001',
          env: 'GRAPE_DHT_BOOTSTRAP_NODES'
        },
        api_port: {
          doc: 'Grape API Port',
          format: 'port',
          default: '50001',
          env: 'GRAPE_API_PORT'
        }
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
