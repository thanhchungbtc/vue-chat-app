<template>
  <div style="min-width: 280px; width: 270px; border-right: 1px solid #eaeaea;" class="d-flex flex-column h-100">
   <AddUserComponent></AddUserComponent>
    <div class="overflow-auto d-flex flex-column" style="flex: 1">
      <b-row no-gutters
             class="item"
             :class="'item ' + (item.id === selectedUser.id ? ' active ' : '')"
             v-for="(item) in partners"
             :key="item.id" align-v="center" @click="handleSelectUser(item)">
        <b-img rounded="circle" width="45" height="45" blank-color="#777" :blank="true"></b-img>
        <div class="d-flex flex-column ml-3" style="flex: 1">
          <span class="font-weight-bold ">{{ item.email }}</span>
          <span class=" text-secondary"
                style="max-height: 40px; overflow: hidden; text-overflow: ellipsis; word-wrap: break-word">{{ item.lastMessage }}</span>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessageComponent from "@/components/MessageComponent.vue";
  import {MessageStore} from "@/store/messageStore";
  import {getModule} from "vuex-module-decorators";
  import {Message, User} from "@/services/interfaces";
  import AddUserComponent from "@/components/AddUserComponent.vue";

  @Component({
    components: {AddUserComponent, MessageComponent}
  })
  export default class HomeComponent extends Vue {

    async created() {
      this.$subscribeTo(await this.messageStore.fetchPartners(), () => ({}))
    }

    get messageStore(): MessageStore {
      return getModule(MessageStore, this.$store)
    }

    get partners(): User[] {
      return this.messageStore.partners
    }

    get selectedUser(): User {
      return this.messageStore.selectedUser || new User()
    }

    async handleSelectUser(user: User) {
      this.messageStore.selectUser(user)
      this.$subscribeTo(await this.messageStore.fetchMessages(), () => ({}))


    }
  }
</script>

<style scoped>
  .active {
    background-color: aliceblue;
  }

  .item {
    border-bottom: 1px solid #eaeaea;
    padding: 15px;
  }

  .item:not(.active):hover {
    cursor: pointer;
    background-color: #eaeaea63;
  }


</style>