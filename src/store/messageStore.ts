import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import MessageService from "@/services/mock/mockMessageService";
import {map, tap} from "rxjs/operators";
import MockMessageService from "@/services/mock/mockMessageService";
import {Message, SendMessagePayload, User} from "@/services/interfaces";
import {container} from "@/di";


export interface MessageState {
  messages: Message[];
  partners: User[];
  onlineUsers: User[];
}


@Module({
  name: 'message',
  namespaced: true,
})
export class MessageStore extends VuexModule implements MessageState {
  private mesageService = container.getMessageService()

  messages: Message[] = [];
  partners: User[] = []
  onlineUsers: User[] = []
  selectedUser: User | null = null

  @Mutation
  setMessages(messages: Message[]) {
    this.messages = messages;
  }

  @Mutation
  setPartners(users: User[]) {
    this.partners = users;
  }

  @Mutation
  setOnlineUsers(users: User[]) {
    this.onlineUsers = users;
  }

  @Mutation
  setSelectedUser(user: User) {
    this.selectedUser = user
  }

  @Action
  fetchMessages(): Observable<void> {
    return this.mesageService.getMessagesStream().pipe(
      tap(messages => {
        this.setMessages(messages)
      }),
      map(() => {
        return;
      })
    )
  }

  @Action
  fetchPartners(): Observable<void> {
    return this.mesageService.getPartnersStream().pipe(
      tap(users => {
        this.setPartners(users)
      }),
      map(() => {
        return;
      })
    )
  }

  @Action
  fetchOnlineUsers(): Observable<void> {
    return this.mesageService.getOnlineUsersStream().pipe(
      tap(users => {
        this.setOnlineUsers(users)
      }),
      map(() => {
        return;
      })
    )
  }

  @Action
  selectUser(user: User) {
    this.setSelectedUser(user)
  }

  @Action
  sendMessage(text: string) {
    const payload = new SendMessagePayload()
    payload.text = text
    this.mesageService.sendMessage(payload)
  }

}




