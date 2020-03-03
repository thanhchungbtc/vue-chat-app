import {AuthService, LoginPayload, User} from "@/services/interfaces";
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

export default class MockAuthService implements AuthService {
  login(credentials: LoginPayload): Observable<User> {
    const user = new User()
    return of(user).pipe(
      delay(1000),
    );
  }

  register(credentials: LoginPayload): Observable<User> {
    const user = new User()
    return of(user).pipe(
      delay(1000),
    );
  }

}