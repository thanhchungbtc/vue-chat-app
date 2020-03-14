import * as _ from 'lodash'
import {Chat, Message, User} from "@/models";
import {Module} from "vuex";
import {RootState} from "@/store";
import {container} from "tsyringe";
import {ChatService} from "@/service";

export interface ChatState {
  chats: Chat[];
  allUsers: User[];
  selectedChat: Chat | null;
  messages: Message[];
}

const initialState = (): ChatState => {
  return {
    chats: [],
    allUsers: [],
    selectedChat: null,
    messages: [],
  }
}


export interface SendMessagePayload {
  toUser: User;
  fromUser: User;
  text: string;
}

const chatService = container.resolve(ChatService)

export default {
  namespaced: true,

  state: initialState,

  mutations: {
    setChats(state, chats: Chat[]) {
      state.chats = chats
    },

    addChat(state, chat: Chat) {
      state.chats.push(chat)
    },

    setAllUsers(state, allUsers: User[]) {
      state.allUsers = allUsers
    },

    setSelectedChat(state, chat: Chat) {
      state.selectedChat = chat
    },

    setMessages(state, messages: Message[]) {
      state.messages = messages
    }

  },

  actions: {
    fetchAllUsers({commit}) {
      chatService.fetchAllUsers().subscribe((users) => {
        commit('setAllUsers', users)
      })
    },

    fetchChats({commit, rootState}) {
      const me = rootState.auth.user
      if (!me) {
        return
      }
      chatService.fetchChats(me).subscribe((chats) => {
        commit('setChats', chats)
      })
    },

    addToChat({commit, state, rootState}, user: User) {
      const me = rootState.auth.user
      if (!me) {
        return
      }
      const chatId = chatService.getChatId(user, me)

      const idx = _.findIndex(state.chats, (c) => c.id === chatId)
      if (idx >= 0) {
        commit('setSelectedChat', state.chats[idx])
      } else {
        const chat: Chat = {
          id: chatId,
          memberIds: [me.id, user.id],
          members: [me, user],
          messages: []
        }
        commit('setSelectedChat', chat)
        commit('addChat', chat)
      }
    },

    async sendMessage({commit}, payload: SendMessagePayload) {
      await chatService.sendMessage(payload.fromUser, payload.toUser, payload.text)
    },

    selectChat({commit}, chat: Chat) {
      commit('setSelectedChat', chat)
      chatService.fetchMessages(chat).subscribe((messages) => {
        commit('setMessages', messages)
      })
    }
  },

  getters: {
    chats: state => state.chats,
    allUsers: state => state.allUsers,
    selectedChat: state => state.selectedChat,
    messages: state => state.messages,
  }

} as Module<ChatState, RootState>