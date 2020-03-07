import {
  AddPartnerPayload,
  AuthService,
  FetchMessagePayload,
  Message,
  MessageService,
  SendMessagePayload,
  User
} from "@/services/interfaces";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import firebase, {firestore} from "firebase";
import "firebase/firestore"
import {map, switchMap} from "rxjs/operators";
import Query = firebase.firestore.Query;

export default class FirebaseMessageService implements MessageService {

  protected authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService
  }


  getMessagesStream(payload: FetchMessagePayload): Observable<Message[]> {
    const {sendFrom, sendTo} = payload
    let chatGroupId = `${sendFrom.id}-${sendTo.id}`
    return new Observable<Message[]>((observer) => {
      return firestore()
        .collection(`messages/${chatGroupId}/items`)

        .onSnapshot((snapshot) => {
            if (snapshot.docs.length === 0) {
              chatGroupId = `${sendTo.id}-${sendFrom.id}`
            }
            return firestore()
              .collection(`messages/${chatGroupId}/items`)
              .orderBy("sentTime", "asc")
              .onSnapshot((sn) => {
                const arr: Message[] = []
                sn.forEach((doc) => {
                  const m = new Message()
                  m.id = doc.id
                  m.text = doc.data().text
                  m.outgoing = doc.data().sendFromId == sendFrom.id
                  arr.push(m)
                })
                observer.next(arr)
              })
          }
        )
    })

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
    const {sendFrom, sendTo} = payload
    let chatGroupId = `${sendFrom.id}-${sendTo.id}`
    // add to partner
    firestore()
      .collection(`messages/${chatGroupId}/items`)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          chatGroupId = `${sendTo.id}-${sendFrom.id}`
        }
        firestore()
          .collection(`messages/${chatGroupId}/items`)
          .doc()
          .set({
            sendFromId: sendFrom.id,
            sendToId: sendTo.id,
            text: payload.text,
            sentTime: firebase.firestore.FieldValue.serverTimestamp()
          })
      })
  }

  getPartnersStream(user: User): Observable<User[]> {
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

  addPartner(payload: AddPartnerPayload) {
    const {sendFrom, sendTo} = payload
    firestore()
      .doc(`users/${sendFrom.id}/partners/${sendTo.id}`)
      .set({
        uid: sendTo.id,
        email: sendTo.email,
      })
  }

}