<template>
  <v-app dark>
    <v-container fluid class="error-container">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <v-btn
        to="/"
        color="primary"
        large
      >Вернуться на главную</v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'clean',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404! Страница не найдена',
      otherError: 'Неизвестная ошибка'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
  .error-container {
    text-align: center;
  }

  h1 {
    margin: 0 0 20px;
    font-size: 50px;
  }
</style>
