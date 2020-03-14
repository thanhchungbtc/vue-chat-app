<template>
  <div class="px-3 py-2 border-top" style="background-color: #F5F5F5; ">
    <b-form-textarea
        :rows="rows"
        @keypress="handleKeydown" max-rows="5"
        placeholder="Say something"
        ref="composeMessage"
        type="search"
        v-model="text"
    >
    </b-form-textarea>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapGetters} from "vuex";
  import {SendMessagePayload} from "@/store/chat";
  import {User} from "@/models";

  export default Vue.extend({

    data() {
      return {
        text: '',
        rows: 1,
      }
    },

    computed: {
      ...mapGetters('chat', ['selectedChat']),
      ...mapGetters('auth', ['user']),
    },

    methods: {
      handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter' && e.shiftKey) {
          e.preventDefault()

          const fromUser = this.user
          const toUser = this.selectedChat.members.filter((m: User) => m.id !== fromUser.id)[0]

          const payload = {
            text: this.text,
            toUser: toUser,
            fromUser: fromUser,
          } as SendMessagePayload

          this.$store.dispatch('chat/sendMessage', payload)

          this.text = '';
          this.rows = 1;
        }
      }
    }

  })
</script>