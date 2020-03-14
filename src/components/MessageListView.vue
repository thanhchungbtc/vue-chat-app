<template>
  <div class="d-flex flex-column overflow-auto" style="flex: 1;">
    <b-row align-h="between"
           align-v="center"
           class="border-bottom px-3"
           no-gutters style="height: 42px; background-color: #78787812"
    >
      <div></div>
      <b-row align-v="center" no-gutters>
        <div class="mr-2">Hello {{ user.email }}</div>
        |
        <b-button @click="logout" class="text-danger" variant="text">Logout</b-button>
      </b-row>
    </b-row>

    <div class="d-flex flex-column overflow-auto mt-1 mb-3 mx-3" ref="messageList" style="flex: 1;">
      <div style="flex: 1;">

        <div style="min-width: 200px">
          <MessageView :key="msg.id" :message="msg" v-for="(msg) in displayMessages"></MessageView>
        </div>

      </div>
    </div>

    <ComposeMessage></ComposeMessage>
  </div>
</template>

<script lang="ts">

  import Vue from 'vue'
  import {mapGetters} from "vuex";
  import MessageView from "@/components/MessageView.vue";
  import ComposeMessage from "@/components/ComposeMessage.vue";
  import {Message} from "@/models";

  export default Vue.extend({
    components: {MessageView, ComposeMessage},
    computed: {
      ...mapGetters('auth', ['user']),
      ...mapGetters('chat', ['messages']),
      displayMessages() {
        const objDiv = this.$refs.messageList as HTMLElement
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }

        return this.messages.map((m: Message) => {
          return {
            text: m.text,
            outgoing: m.fromUser.id == this.user.id,
          }
        })
      }
    },

    methods: {
      logout: function () {
        this.$store.dispatch('auth/logout')
      }
    }

  })
</script>