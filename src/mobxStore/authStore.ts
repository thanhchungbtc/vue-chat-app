import {action, computed, observable} from "mobx";
import {AuthService, LoginPayload, User} from "@/services/interfaces";
import {container} from "@/di";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import remotedev from 'mobx-remotedev';

@remotedev
export class AuthStore {
  @observable user: User | null = null

  constructor(
    private authService: AuthService
  ) {
    this.authService = authService
  }

  @computed
  get email() {
    return this.user?.email || ""
  }

  @action
  login(credentials: LoginPayload) {
    this.authService.login(credentials).pipe(
      map((user) =>
        this.user = user
      )
    )
      .subscribe(() => ({}))
  }

  @action
  register(credentials: LoginPayload) {
    this.authService.register(credentials).pipe(
      map((user) =>
        this.user = user
      )
    )
      .subscribe(() => ({}))
  }

  @action
  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.user = null
      })
  }

  @action
  listen(): Observable<User | null> {
    return this.authService.listen().pipe(
      tap((user) => {
        this.user = user
      })
    )
  }

}