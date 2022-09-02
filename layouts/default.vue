<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Пользователи
          </v-list-item-title>
          <v-list-item-subtitle>
            доступные для общения
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="u in users"
          :key="u.id"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ u.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'">
              mdi-message-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        @click="logout"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Чат комнаты {{ user.room }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: true
    }
  },
  computed: mapState(['user', 'users']),
  methods: {
    ...mapMutations(['clearData']),
    logout () {
      this.$socket.emit('leftUser', this.user.id, () => {
        this.clearData()
        this.$router.push('/?message=logout')
      })
    }
  }
}
</script>
