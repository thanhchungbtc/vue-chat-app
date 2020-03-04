import {AuthService, Message, MessageService, SendMessagePayload, User} from "@/services/interfaces";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import firebase, {firestore} from "firebase";
import "firebase/firestore"
import {map, switchMap} from "rxjs/operators";

export default class FirebaseMessageService implements MessageService {

  protected authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService

    this._sendMessage$.subscribe((payload) => {
      const {sendFrom, sendTo} = payload
      let chatGroupId = `${sendFrom.id}-${sendTo.id}`
      console.log('hit', chatGroupId)
      // add to partner
      return firestore()
        .collection(`messages/${chatGroupId}/items`)
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length === 0) {
            console.log('notfound')
            chatGroupId = `${sendTo.id}-${sendFrom.id}`
          }
          return firestore()
            .collection(`messages/${chatGroupId}/items`)
            .doc()
            .set({
              sendFromId: sendFrom.id,
              sendToId: sendTo.id,
              text: payload.text,
            })
            .then(() => {
            })
        })
    })
  }


  _sendMessage$ = new Subject<SendMessagePayload>()

  getMessagesStream(): Observable<Message[]> {
    return of([]);
  }

  getOnlineUsersStream(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      return firestore()
        .collection('users')
        .onSnapshot((snapshot) => {
          const arr: User[] = []
          snapshot.forEach((doc) => {
            const u = new User()
            u.id = doc.id
            u.email = doc.data().email
            arr.push(u)
          })
          observer.next(arr)
        })

    })
  }

  sendMessage(payload: SendMessagePayload): void {
    this._sendMessage$.next(payload)
  }

  getPartnersStream(): Observable<User[]> {
    return this.authService.listen().pipe(
      switchMap((user) => {
          if (!user) {
            return of([])
          }
          return new Observable<User[]>((observer) => {
              return firestore()
                .collection('users')
                .doc(user.id)
                .collection('partners')
                .onSnapshot((snapshot) => {
                  const users: User[] = []
                  snapshot.forEach((doc) => {
                    const u = new User()
                    u.id = doc.id
                    u.email = doc.data().email
                    users.push(u)
                  })
                  observer.next(users)
                })
            }
          )
        }
      )
    )
  }

}