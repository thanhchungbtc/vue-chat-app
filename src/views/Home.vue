<template>
  <div class="d-flex" style="height: 100%;">

    <UserListComponent></UserListComponent>
    <MessageListComponent></MessageListComponent>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessageComponent from "@/components/MessageComponent.vue";
  import {MessageStore} from "@/store/messageStore";
  import {getModule} from "vuex-module-decorators";
  import {Observable} from "rxjs";
  import {fromPromise} from "rxjs/internal-compatibility";
  import {Message, User} from "@/services/interfaces";
  import UserListComponent from "@/components/UserListComponent.vue";
  import MessageListComponent from "@/components/MessageListComponent.vue";

  @Component({
    components: {MessageListComponent, UserListComponent, MessageComponent}
  })
  export default class HomeComponent extends Vue {


  }
</script>

<style>

  input:focus, textarea:focus {
    outline: 0 !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }
</style>