import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {LoginPayload, User} from "@/services/interfaces";
import {Observable, of} from "rxjs";
import {map, mapTo} from "rxjs/operators";
import MockAuthService from "@/services/mock/mockAuthService";
import {container} from "@/di";

export interface AuthState {
  user: User | null;
}


@Module({
  namespaced: true,
  name: 'auth'
})
export class AuthStore extends VuexModule implements AuthState {
  private authService = container.getAuthService()

  user: User | null = null

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @Action
  login(credentials: LoginPayload): Observable<void> {
    return this.authService.login(credentials).pipe(
      map((user) => {
        this.setUser(user)
        return;
      })
    )
  }

  @Action
  register(credentials: LoginPayload): Observable<void> {
    return this.authService.register(credentials).pipe(
      map((user) => {
        this.setUser(user)
        return;
      })
    )
  }
}