import {action, observable} from "mobx";
import {Message, User} from "@/services/interfaces";
import firebase, {firestore} from "firebase";
import {AuthStore} from "@/mobxStore/authStore";
import remotedev from 'mobx-remotedev';

@remotedev
export class MessageStore {

  @observable selectedUser: User | null = null
  @observable messages: Message[] = []

  constructor(
    private authStore: AuthStore
  ) {
  }

  @action
  loadMessages(toUser: User) {
    this.selectedUser = toUser
    const fromUser = this.authStore.user!
    let chatGroupId = `${fromUser.id}-${toUser.id}`
    firestore()
      .collection(`messages/${chatGroupId}/items`)
      .onSnapshot((snapshot) => {
          if (snapshot.docs.length === 0) {
            chatGroupId = `${toUser.id}-${fromUser.id}`
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
                m.outgoing = doc.data().sendFromId == fromUser.id
                arr.push(m)
              })
              this.messages = arr
            })
        }
      )
  }

  @action
  sendMessage(toUser: User, text: string) {
    const fromUser = this.authStore.user!
    let chatGroupId = `${fromUser.id}-${toUser.id}`

    return firestore()
      .collection(`messages/${chatGroupId}/items`)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          chatGroupId = `${toUser.id}-${fromUser.id}`
        }
        firestore()
          .collection(`messages/${chatGroupId}/items`)
          .doc()
          .set({
            sendFromId: fromUser.id,
            sendToId: toUser.id,
            text: text,
            sentTime: new Date(),
          })
      })
  }
}