<template>
  <div style="flex: 1;" class="d-flex flex-column overflow-auto">

    <div style="flex: 1;" class="d-flex flex-column overflow-auto m-3" ref="messageList">
      <div style="flex: 1;">

        <div style="min-width: 200px">
          <MessageComponent v-for="(msg) in messages" :key="msg.id" :message="msg"></MessageComponent>
        </div>

      </div>
    </div>
    <div>
    </div>

    <MessageComposeComponent></MessageComposeComponent>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessageComponent from "@/components/MessageComponent.vue";
  import {MessageStore} from "@/store/messageStore";
  import {getModule} from "vuex-module-decorators";
  import {Message, User} from "@/services/interfaces";
  import MessageComposeComponent from "@/components/MessageComposeComponent.vue";

  @Component({
    components: {MessageComposeComponent, MessageComponent}
  })
  export default class HomeComponent extends Vue {
    text = ''

    get messageStore(): MessageStore {

      return getModule(MessageStore, this.$store)
    }

    get messages(): Message[] {
      const objDiv = this.$refs.messageList as HTMLElement
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }

      return this.messageStore.messages
    }

  }
</script>