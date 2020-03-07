import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import MessageService from "@/services/mock/mockMessageService";
import {filter, map, switchMap, tap} from "rxjs/operators";
import MockMessageService from "@/services/mock/mockMessageService";
import {AddPartnerPayload, FetchMessagePayload, Message, SendMessagePayload, User} from "@/services/interfaces";
import {container} from "@/di";
import {AuthStore} from "@/store/authStore";


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
    const payload = new FetchMessagePayload();
    payload.sendFrom = this.context.rootState.auth.user
    payload.sendTo = this.selectedUser!
    return this.mesageService.getMessagesStream(payload).pipe(
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
    const user = this.context.rootState.auth.user
    return this.mesageService.getPartnersStream(user).pipe(
      tap(users => {
        this.setPartners(users)
      }),
      map(() => {
        return;
      })
    )
  }

  @Action
  addPartner(user: User) {
    const payload = new AddPartnerPayload();
    payload.sendFrom = this.context.rootState.auth.user
    payload.sendTo = user
    this.mesageService.addPartner(payload);
    this.setSelectedUser(user)
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
  sendMessage(payload: SendMessagePayload) {
    this.mesageService.sendMessage(payload)
  }

}




