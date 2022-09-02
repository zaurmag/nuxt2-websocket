<template>
  <div class="chat-area">
    <div class="chat-area__mess-list" ref="chatList">
      <ChatMessage
        v-for="mess in messages"
        :key="mess.id"
        :name="mess.name"
        :text="mess.text"
        :owner="mess.id === user.id"
      />
    </div>
    <v-footer>
      <ChatForm />
    </v-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChatMessage from '~/components/ChatMessage'
import ChatForm from '~/components/ChatForm'

export default {
  name: 'chat',
  middleware: ['chat'],
  computed: mapState(['user', 'messages']),
  watch: {
    messages () {
      setTimeout(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
    }
  },
  head () {
    return {
      title: `Комната ${this.user.room}`
    }
  },
  components: {
    ChatMessage,
    ChatForm
  }
}
</script>

<style lang="scss" scoped>
  .chat-area {
    padding: 15px;
    display: flex;
    flex-direction: column;
    height: 100%;

    &__mess-list {
      overflow: auto;
      padding-bottom: 30px;
      flex: 1;
      height: 100%;
    }
  }
</style>
