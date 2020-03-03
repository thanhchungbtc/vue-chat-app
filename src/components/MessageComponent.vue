<template>
  <div :class="'d-flex' +  (message.outgoing ? ' justify-content-end' : '')">
    <div :class="'message mb-3' + (message.outgoing ? ' bg-sender' : '')">
      {{ message.text }}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  interface Message {
    outgoing: boolean;
    text: string;
  }

  @Component
  export default class MessageComponent extends Vue {
    @Prop() message!: Message;

  }
</script>

<style scoped>
  .message {
    max-width: 60%;
    padding: 6px 10px;
    border-radius: 5px;
    word-break: break-all;
    white-space: pre-wrap;
    background-color: #E1E1E6;
  }

  .bg-sender {
    background-color: #28A4F4 !important;
    color: #DCEDFD;
  }

</style>