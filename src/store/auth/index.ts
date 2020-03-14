import {User} from "@/models";
import {Module} from "vuex";
import {RootState} from "@/store";
import {container} from "tsyringe";
import {AuthService} from "@/service";

export interface AuthState {
  user: User | null;
}

const initialState = (): AuthState => {
  return {
    user: null,
  }
}

export interface LoginActionPayload {
  email: string;
  password: string;
}

const authService = container.resolve(AuthService)

export default {
  namespaced: true,

  state: initialState,

  mutations: {
    setUser(state, user: User) {
      state.user = user
    }
  },

  actions: {

    bootstrap({commit}) {
      authService.onAuthChanged().subscribe((user) => {
        commit('setUser', user)
      })
    },

    async login({commit}, payload: LoginActionPayload) {
      const user = await authService.login(payload.email, payload.password).toPromise()
      commit('setUser', user)
    },

    async register({commit}, payload: LoginActionPayload) {
      const user = await authService.register(payload.email, payload.password).toPromise()
      commit('setUser', user)
    }
  },

  getters: {
    user: state => state.user,
  }

} as Module<AuthState, RootState>