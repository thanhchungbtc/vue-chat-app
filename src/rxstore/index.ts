import { User } from "@/services/interfaces";
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { Observable, observable, Subject } from 'rxjs';
import { firestore } from 'firebase';
import { map, switchMap } from 'rxjs/operators';

class UserService {

  private _loadActiveUsers = new Subject<void>();
  private _loadPartners = new Subject<User>();

  activeUsers$ = this._loadActiveUsers.pipe(
    switchMap(() => this._fetchActiveUsers())
  )

  partners$ = this._loadPartners.pipe(
    switchMap((user) => this._fetchPartners(user))
  )

  loadActiveUsers() {
    this._loadActiveUsers.next()
  }

  loadPartners(user: User) {
    this._loadPartners.next(user)
  }

  private _fetchActiveUsers(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      return firestore()
        .collection('users')
        .onSnapshot(
          (snapshot) => {
            const arr: User[] = []
            snapshot.forEach((doc) => {
              const u = new User()
              u.id = doc.id
              u.email = doc.data().email
              arr.push(u)
            })
            observer.next(arr)
          },
        )
    })
  }

  private _fetchPartners(user: User): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      return firestore()
        .collection('users')
        .doc(user.id)
        .collection('partners')
        .onSnapshot((snapshot) => {
          console.log('hit')
          const users: User[] = []
          snapshot.forEach((doc) => {
            const u = new User()
            u.id = doc.id
            u.email = doc.data().email
            users.push(u)
          })
          observer.next(users)
        })
    })
  }

}
export const userService = new UserService();