<template>
  <div
      class="d-flex flex-column h-100"
      style="min-width: 280px; width: 270px; border-right: 1px solid #eaeaea;"
  >
    <!--    Select user modal-->
    <b-row class="p-2 border-bottom" id="addUserContainer" no-gutters ref="addUserContainer" style="height: 42px;">
      <b-form-input placeholder="Search" size="sm" style="flex: 1" type="search"></b-form-input>
      <b-button @click="dialog = true" class="ml-3" size="sm" v-b-modal.modal-scrollable
                variant="outline-secondary">Add
      </b-button>

      <b-modal hide-footer id="dlgAddUser" title="Select User" v-model="dialog">
        <b-row
            :key="user.id" @click="addToChat(user)" align-v="center"
            class="p-2 border-bottom" no-gutters
            v-for="user in allUsers"
        >
          <b-img :blank="true" blank-color="#777" height="45" rounded="circle" width="45"></b-img>
          <div class="font-weight-bold ml-2" style="flex: 1">{{ user.email }}</div>
        </b-row>
      </b-modal>
    </b-row>


    <!--    Chat list-->
    <div class="overflow-auto d-flex flex-column" style="flex: 1">
      <b-row
          :class="'p-3 border-bottom ' + (selectedChat && selectedChat.id  === item.id ? 'active' : '')"
          :key="item.id"
          @click="selectChat(item.chat)"
          align-v="center"
          no-gutters
          v-for="(item) in displayChats"
      >
        <b-img :blank="true" blank-color="#777" height="45" rounded="circle" width="45"></b-img>
        <div class="d-flex flex-column ml-3" style="flex: 1">
          <span class="font-weight-bold">{{ item.email }}</span>
          <span
              class="text-secondary"
              style="max-height: 40px; overflow: hidden; text-overflow: ellipsis; word-wrap: break-word"
          ></span>
        </div>
      </b-row>
    </div>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue'
  import {Chat, User} from "@/models";
  import {mapGetters} from "vuex";
  import * as _ from 'lodash'

  interface Data {
    dialog: boolean;
  }

  export default Vue.extend({

    data(this: any): Data {
      return {
        dialog: false,
      }
    },

    mounted: function (): void {
      this.$store.dispatch('chat/fetchAllUsers')
      this.$store.dispatch('chat/fetchChats')
    },

    computed: {
      ...mapGetters('chat', ['allUsers', 'chats', 'selectedChat']),
      ...mapGetters('auth', ['user']),

      displayChats() {
        return this.chats.map((c: Chat) => {
          let idx = _.findIndex(c.members, (m) => m.id !== this.user.id)
          if (idx < 0) {
            idx = 0
          }

          return {
            id: c.id,
            email: c.members[idx].email,
            chat: c
          }
        })
      }

    },

    methods: {
      addToChat(user: User) {
        this.$store.dispatch('chat/addToChat', user)
        this.dialog = false
      },

      selectChat(chat: Chat) {
        this.$store.dispatch('chat/selectChat', chat)
      }
    }
  })
</script>

<style>
  .active {
    background-color: #28A4F466;
  }
</style>