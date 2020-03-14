import Vue from 'vue'
import Vuex from 'vuex'
import auth, {AuthState} from './auth'
import chat, {ChatState} from "./chat";

Vue.use(Vuex)

export interface RootState {
  auth: AuthState;
  chat: ChatState;
}

export default new Vuex.Store<RootState>({
  modules: {
    auth,
    chat,
  }
})
