<template>
  <div class="d-flex" style="height: 100%;">
    <UserListView></UserListView>
    <MessageListView></MessageListView>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import UserListView from "@/components/UserListView.vue";
  import MessageListView from "@/components/MessageListView.vue";

  export default Vue.extend({
    components: {MessageListView, UserListView}
  })
</script>

