<template>
  <div style="flex: 1;" class="d-flex flex-column overflow-auto">
    <b-row no-gutters
           style="height: 42px; background-color: #78787812"
           class="border-bottom px-3"
           align-v="center" align-h="between"
    >
      <div></div>
      <b-row no-gutters align-v="center">
        <div class="mr-2">Hello {{ authState.email }}</div>
        |
        <b-button variant="text" class="text-danger" @click="logout">Logout</b-button>
      </b-row>
    </b-row>

    <div style="flex: 1;" class="d-flex flex-column overflow-auto mt-1 mb-3 mx-3" ref="messageList">
      <div style="flex: 1;">

        <div style="min-width: 200px">
          <MessageComponent v-for="(msg) in state.messages" :key="msg.id" :message="msg"></MessageComponent>
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
  import {Message, User} from "@/services/interfaces";
  import MessageComposeComponent from "@/components/MessageComposeComponent.vue";
  import {container} from "@/di";
  import {Observer} from "mobx-vue";

  @Observer
  @Component({
    components: {MessageComposeComponent, MessageComponent}
  })
  export default class HomeComponent extends Vue {
    text = ''

    state = container.getMessageStore()
    authState = container.getAuthStore()

    // get messages(): Message[] {
    //   const objDiv = this.$refs.messageList as HTMLElement
    //   if (objDiv) {
    //     objDiv.scrollTop = objDiv.scrollHeight;
    //   }
    //
    //   return this.state.messages
    // }

    logout() {
      this.authState.logout()
    }

  }
</script>