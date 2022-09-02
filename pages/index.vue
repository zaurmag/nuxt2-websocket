<template>
  <v-layout column justify-center align-center>
    <v-snackbar
      v-model="snackbar"
      top
      timeout="6000"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-card-title>Nuxt chat</v-card-title>
        <v-card-text>
          <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="16"
            :rules="nameRules"
            label="Имя"
            required
          />

          <v-text-field
            v-model="room"
            :rules="roomRules"
            label="Комната"
            required
          />

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="submit"
            @keydown.enter="submit"
          >
            Войти
          </v-btn>
        </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'clean',
  head: {
    title: 'Chat на VueJS'
  },
  data: () => ({
    snackbar: false,
    message: '',
    sockets: {
      connect () {
        console.log('socket connected')
      }
    },
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Имя обязательно для заполнения!',
      v => (v && v.length <= 10) || 'Имя должно быть не больше 16 симв.'
    ],
    room: '',
    roomRules: [
      v => !!v || 'Поле комнаты обязательно к заполнению'
    ]
  }),
  mounted () {
    const { message } = this.$route.query

    if (message === 'logout') {
      this.message = 'Вы вышли из чат-комнаты!'
    } else if (message === 'noUser') {
      this.message = 'Для общения в чате вам необходимо авторизоваться!'
    }

    this.snackbar = !!message
  },
  methods: {
    ...mapMutations(['setUser']),
    submit () {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        this.$socket.emit('emitUser', user, (data) => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    }
  }
}
</script>
