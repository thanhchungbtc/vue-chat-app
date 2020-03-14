import {Observable} from "rxjs";
import {Chat, Message, User} from "@/models";
import firebase from "firebase";

const db = firebase.firestore()

export class ChatService {

  /**
   *
   */
  public fetchAllUsers(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      return db
        .collection('users')
        .onSnapshot((snapshot) => {
          const arr = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              email: doc.data().email,
              avatar: doc.data().avatar,
            } as User
          })
          observer.next(arr)
        })
    })
  }


  fetchChats(me: User): Observable<Chat[]> {
    return new Observable<Chat[]>((observer) => {
        return db
          .collection(`chats`)
          .where('memberIds', 'array-contains', me.id)
          .onSnapshot((snapshot) => {
              const chats = snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  memberIds: doc.data().members as string[],
                  members: doc.data().members as User[],
                  messages: doc.data().messages as Message[]
                } as Chat
              })
              observer.next(chats)
            }
          )
      }
    )

  }

  fetchMessages(chat: Chat): Observable<Message[]> {
    return new Observable<Message[]>((observer) => {
      return db.collection(`chats/${chat.id}/messages`)
        .orderBy('sentAt', 'asc')
        .onSnapshot((sn) => {
          const arr = sn.docs.map((doc) => {
            return {
              id: doc.id,
              text: doc.data().text,
              toUser: doc.data().toUser,
              fromUser: doc.data().fromUser,
            } as Message
          })
          observer.next(arr)
        })
    })
  }

  getChatId(user: User, other: User): string {
    return user.id < other.id ?
      `${user.id}-${other.id}` :
      `${other.id}-${user.id}`
  }

  async sendMessage(fromUser: User, toUser: User, text: string) {
    const chatId = this.getChatId(fromUser, toUser)
    const ref = db.doc(`chats/${chatId}`)

    return ref.get()
      .then((sn) => {
          if (sn.exists) {
            return
          }
          return ref.set({
            members: [
              {
                id: fromUser.id,
                email: fromUser.email,
              },
              {
                id: toUser.id,
                email: toUser.email,
              }
            ],
            memberIds: [fromUser.id, toUser.id]
          })
        }
      )
      .then(() => {
        return ref.collection('messages').doc().set({
            fromUser: {
              id: fromUser.id,
              email: fromUser.email,
            },
            toUser: {
              id: toUser.id,
              email: toUser.email,
            },
            text: text,
            sentAt: new Date(),
          },
        )
      })


  }
}

