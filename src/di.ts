import {AuthService, MessageService} from "@/services/interfaces";
import FirebaseAuthService from "@/services/firebase/authService";
import FirebaseMessageService from "@/services/firebase/messageService";
import {AuthStore} from "@/mobxStore/authStore";
import {UserStore} from "@/mobxStore/userStore";
import {MessageStore} from "@/mobxStore/messageStore";


class AppContainer {
  private authService: AuthService | null = null
  private messageService: MessageService | null = null
  private authStore: AuthStore | null = null
  private userStore: UserStore | null = null
  private messageStore: MessageStore | null = null


  registerAuthService(authService: AuthService) {
    this.authService = authService
  }

  registerMessageService(messageService: MessageService) {
    this.messageService = messageService
  }

  getAuthService(): AuthService {
    if (this.authService !== null) {
      return this.authService!
    }
    throw new Error("Did you forget register?")
  }

  getMessageService(): MessageService {
    if (this.messageService !== null) {
      return this.messageService!
    }
    throw new Error("Did you forget register?")
  }


  registerAuthStore(authStore: AuthStore) {
    this.authStore = authStore
  }

  registerUserStore(userStore: UserStore) {
    this.userStore = userStore
  }

  registerMessageStore(messageStore: MessageStore) {
    this.messageStore = messageStore
  }

  getAuthStore() {
    return this.authStore!
  }

  getUserStore() {
    return this.userStore!
  }

  getMessageStore() {
    return this.messageStore!
  }

}

const container = new AppContainer()
const authService = new FirebaseAuthService()
const messageService = new FirebaseMessageService(authService)

const authStore = new AuthStore(authService)
const userStore = new UserStore()
const messageStore = new MessageStore(authStore)
container.registerAuthService(authService)
container.registerMessageService(messageService)
container.registerAuthStore(authStore)
container.registerUserStore(userStore)
container.registerMessageStore(messageStore)


export {container}

