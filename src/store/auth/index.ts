import {User} from "@/models";
import {Module} from "vuex";
import {RootState} from "@/store";
import {container} from "tsyringe";
import {AuthService} from "@/service";

export interface AuthState {
  user: User | null;
  error: Error;
}

const initialState = (): AuthState => {
  return {
    user: null,
    error: Error,
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
    },

    setError(state, error: Error) {
      state.error = error
    }
  },

  actions: {

    bootstrap({commit}) {
      authService.onAuthChanged().subscribe((user) => {
        commit('setUser', user)
      })
    },

    async login({commit}, payload: LoginActionPayload) {
      try {
        const user = await authService.login(payload.email, payload.password)
        commit('setUser', user)
      } catch (e) {
        commit('setError', e)
      }
    },

    async register({commit}, payload: LoginActionPayload) {
      try {
        const user = await authService.register(payload.email, payload.password)
        commit('setUser', user)
      } catch (e) {
        commit('setError', e)
      }
    },

    async logout() {
      await authService.logout()
    }
  },

  getters: {
    user: state => state.user,
    error: state => state.error,
  }

} as Module<AuthState, RootState>