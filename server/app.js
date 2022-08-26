const app = require('express')()
const server = require('http').createServer(app)
const { Server } = require("socket.io")
const io = new Server(server);

io.on('connection', socket => {
  console.log('IO connected')

  // socket.emit('newMessage', {
  //   text: 'WHAT'
  // })
})

const consola = require('consola')
const { Nuxt } = require('nuxt')
const config = require('../nuxt.config')

const nuxt = new Nuxt(config)

const {
  host = process.env.HOST || '127.0.0.1',
  port = process.env.PORT || 3000
} = nuxt.options.server

consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true
})

module.exports = app
