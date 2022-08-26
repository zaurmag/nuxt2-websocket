<template>
  <h1>Websocket messenger</h1>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'clean',
  sockets: {
    connect () {
      console.log('socket connected')
    }
  }
}
</script>
