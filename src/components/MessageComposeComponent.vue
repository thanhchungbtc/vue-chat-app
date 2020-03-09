<template>

  <div style="background-color: #F5F5F5; " class="px-3 py-2 border-top">
    <b-form-textarea
        ref="composeMessage"
        :rows="rows" max-rows="5"
        v-model="text"
        placeholder="Say something"
        type="search"
        @keypress="handleKeydown"
    >
    </b-form-textarea>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessageComponent from "@/components/MessageComponent.vue";
  import {MessageStore} from "@/store/messageStore";
  import {getModule} from "vuex-module-decorators";
  import {Message, SendMessagePayload, User} from "@/services/interfaces";
  import {AuthStore} from "@/store/authStore";
  import {container} from "@/di";
  import {Observer} from "mobx-vue";
  @Observer
  @Component({
    components: {MessageComponent}
  })
  export default class HomeComponent extends Vue {
    text = ''
    rows = 1

    state = container.getMessageStore()

    async handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault()

        await this.state.sendMessage(this.state.selectedUser!, this.text)
        this.text = '';
        this.rows = 1;
      }
    }


  }
</script>