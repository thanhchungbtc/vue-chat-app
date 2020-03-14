import {fromPromise} from "rxjs/internal-compatibility";
import firebase from "firebase";
import {User} from "@/models";
import {Observable} from "rxjs";
import {singleton} from "tsyringe";

@singleton()
export class AuthService {

  onAuthChanged(): Observable<User | null> {
    return new Observable<User | null>((observer) => {
      return firebase.auth().onAuthStateChanged((u) => {
        if (!u) {
          observer.next(null)
        } else {
          const user = {
            id: u.uid,
            email: u.email
          } as User
          observer.next(user)
        }
      })
    })
  }

  login(email: string, password: string): Promise<User | null> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((u) => {
          if (!u.user) {
            return null;
          }
          const user = u.user
          return {
            id: user.uid,
            email: user.email,
          } as User
        }
      )
  }

  register(email: string, password: string): Promise<User | null> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
          if (!u.user) {
            return null;
          }
          const user = u.user
          return {
            id: user.uid,
            email: user.email,
          } as User
        }
      )
  }

  logout(): Promise<void> {
    return firebase.auth().signOut()
  }

}
