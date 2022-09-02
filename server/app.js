const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()
// const { Server } = require("socket.io")
// const io = new Server(server)

const m = (name, text, id) => ({name, text, id})

io.on('connection', (socket) => {
  socket.on('emitUser', (data, cb) => {
    if (!data.name || !data.room) {
      cb('Данные не валидны!')

      return
    }

    socket.join(data.room)
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
    cb({ userId: socket.id })
    io.to(data.room).emit('updateUsers', users.getUsesByRoom(data.room))
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}.`))
    socket.broadcast.to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} вошел.`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      cb('Что-то пошло не так!')

      return
    }
    const user = users.get(data.id)
    io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    cb()
  })

  socket.on('leftUser', (id, cb) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getUsesByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} покинул чат-комнату.`))
    }

    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getUsesByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} покинул чат-комнату.`))
    }
  })
})

const consola = require('consola')
const { Nuxt } = require('nuxt')
const config = require('../nuxt.config')

const nuxt = new Nuxt(config)
app.use(nuxt.render)

const {
  host = process.env.HOST || '127.0.0.1',
  port = process.env.PORT || 3000
} = nuxt.options.server

server.listen(5000, () => {
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
})

module.exports = app
// module.exports = { app, server }
