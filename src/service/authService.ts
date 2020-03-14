import {fromPromise} from "rxjs/internal-compatibility";
import firebase from "firebase";
import {map} from "rxjs/operators";
import {User} from "@/models";
import {Observable} from "rxjs";
import {singleton} from "tsyringe";

@singleton()
export class AuthService {

  onAuthChanged(): Observable<User | null> {
    return new Observable<User>((observer) => {
      return firebase.auth().onAuthStateChanged((u) => {
        if (!u) {
          return null
        }
        const user = {
          id: u.uid,
          email: u.email
        } as User
        observer.next(user)
      })
    })
  }

  login(email: string, password: string) {
    return fromPromise(firebase.auth().signInWithEmailAndPassword(email, password)).pipe(
      map((u) => {
        if (!u.user) {
          return null;
        }
        const user = u.user
        return {
          id: user.uid,
          email: user.email,
        } as User
      })
    )
  }

  register(email: string, password: string): Observable<User | null> {
    return fromPromise(firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
        if (!u.user) {
          return null;
        }
        return {
          id: u.user.uid,
          email: u.user.email
        } as User
      })
      .then((u) => {
        if (!u) {
          return null
        }
        return firebase.firestore()
          .collection('users')
          .doc(u.id).set(u)
          .then(() => u)
      })
    )
  }

}
