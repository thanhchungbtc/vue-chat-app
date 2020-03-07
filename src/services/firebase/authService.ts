import {AuthService, LoginPayload, User} from "@/services/interfaces";
import {BehaviorSubject, from, Observable, of, throwError} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {catchError, map, switchMap} from "rxjs/operators";
import firebase, {firestore} from 'firebase';
import "firebase/auth"


function mapCredentialUserToUser(user: firebase.User | null): User | null {
  if (!user) {
    return null
  }

  const u = new User();
  u.id = user.uid
  u.email = user.email || ""
  return u
}

export default class FirebaseAuthService implements AuthService {

  login(credentials: LoginPayload): Observable<User | null> {
    return fromPromise(firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password))
      .pipe(
        map((e) => {
          return mapCredentialUserToUser(e.user)
        })
      )
  }

  logout(): Observable<void> {
    return fromPromise(firebase.auth().signOut())
  }

  register(credentials: LoginPayload): Observable<User | null> {
    return fromPromise(firebase.auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password))
      .pipe(
        switchMap((e) => {
          if (e.user == null) {
            return of(null);
          }
          const user = e.user!
          return fromPromise(
            firestore()
              .collection('users')
              .doc(user.uid)
              .set({
                uid: user.uid,
                email: credentials.email
              }))
            .pipe(
              map(() => {
                return mapCredentialUserToUser(user)
              })
            )
        })
      )
  }

  listen(): Observable<User | null> {
    return new Observable<User | null>((observer) => {
      return firebase.auth().onAuthStateChanged((user) => {
        observer.next(mapCredentialUserToUser(user))
      })
    })
  }


}

