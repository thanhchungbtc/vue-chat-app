import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import {MessageState, MessageStore} from "@/store/messageStore";
import {AuthState, AuthStore} from "@/store/authStore";

Vue.use(Vuex)

interface RootState {
  message: MessageState;
  auth: AuthState;

}

export default new Vuex.Store({
  modules: {
    message: MessageStore,
    auth: AuthStore,
  },
})
