import {AuthService, LoginPayload, User} from "@/services/interfaces";
import {from, Observable, throwError} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {catchError, map} from "rxjs/operators";
import firebase from 'firebase';
import "firebase/auth"


function mapCredentialUserToUser(credential: firebase.auth.UserCredential) {
  if (!credential.user) {
    throw  new Error("Error")
  }

  const user = new User()
  return user
}

export default class FirebaseAuthService implements AuthService {
  login(credentials: LoginPayload): Observable<User> {
    const obs = from(firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password))
    console.log('START')
    return obs.pipe(
      map((e) => {
        return mapCredentialUserToUser(e)
      })
    )
  }

  register(credentials: LoginPayload): Observable<User> {
    const obs = fromPromise(firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password))
    return obs.pipe(
      map((e) => {
        return mapCredentialUserToUser(e)
      })
    )
  }


}

