<template>
  <b-row no-gutters class="p-2 border-bottom" id="addUserContainer" ref="addUserContainer" style="height: 42px;">
    <b-form-input type="search" placeholder="Search" size="sm" style="flex: 1"></b-form-input>
    <b-button id="addUser" ref="addUser" class="ml-3" variant="outline-secondary" size="sm">Add</b-button>

    <b-popover
        target="addUser"
        triggers="click focus"
        :show.sync="popoverShow" placement="auto" container="addUserContainer"
        ref="popover" custom-class="popover">

      <div ref="addUserContent">
        <b-row
            @click="handleAddUser(item)"
            no-gutters align-v="center" class="p-2 border-bottom"
            v-for="item in onlineUsers" :key="item.id"
        >
          <b-img rounded="circle" width="45" height="45" blank-color="#777" :blank="true"></b-img>
          <div class="font-weight-bold ml-2" style="flex: 1">{{ item.email }}</div>
        </b-row>
      </div>
    </b-popover>
  </b-row>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {fromEvent} from "rxjs";
  import {filter, map} from "rxjs/operators";
  import {User} from "@/services/interfaces";
  import {MessageStore} from "@/store/messageStore";
  import {getModule} from "vuex-module-decorators";

  const clickOutside$ = fromEvent(document, 'click')
  @Component
  export default class AddUserComponent extends Vue {
    popoverShow = false

    async created() {
      // subscribe onine user stream
      this.$subscribeTo(await this.messageStore.fetchOnlineUsers(), () => ({}))

      // click outside of the popover should close it
      this.$subscribeTo(
        clickOutside$.pipe(
          filter(e => e.target != this.$refs.addUser && e.target !== this.$refs.addUserContent)
        ),
        () => {
          if (this.popoverShow)
            this.popoverShow = false
        }
      )
    }


    get messageStore(): MessageStore {
      return getModule(MessageStore, this.$store)
    }

    get onlineUsers(): User[] {
      return this.messageStore.onlineUsers
    }

    handleAddUser(user: User) {
      this.messageStore.addPartner(user)

    }

    onClose() {
      this.popoverShow = false
    }
  }
</script>

<style>
  .popover {
    width: 300px;
    max-height: 400px;
    overflow: auto;
  }
</style>
