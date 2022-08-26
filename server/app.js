const app = require('express')()
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt } = require('nuxt')
const config = require('../nuxt.config')



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())





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
