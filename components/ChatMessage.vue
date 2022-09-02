<template>
  <div v-if="name === 'admin'">
    <v-alert
      border="left"
      color="blue-grey"
      dark
    >{{ text }}</v-alert>
  </div>
  <div v-else class="c-message" :class="{ 'c-message--owner': owner }">
    <div class="c-message__title">
      {{ name }}
    </div>
    <div class="c-message__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    owner: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .c-message {
    padding: 10px;
    background-color: #0368b2;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px rgba(50, 50, 50, 0.3);
    width: 60%;

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    &__title {
      text-transform: uppercase;
      margin-bottom: 3px;
      font-size: 14px;
      font-weight: 500;
    }

    &__text {
      font-size: 14px;
      line-height: 1.5;
    }

    &--owner {
      margin-left: auto;
      background-color: #fff;
      color: #000;
    }

    &--sys {

    }
  }
</style>
