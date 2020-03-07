import {AuthService, MessageService} from "@/services/interfaces";
import FirebaseAuthService from "@/services/firebase/authService";
import FirebaseMessageService from "@/services/firebase/messageService";


class AppContainer {
  private authService: AuthService | null = null
  private messageService: MessageService | null = null

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


}

const container = new AppContainer()
const authService = new FirebaseAuthService()
const messageService = new FirebaseMessageService(authService)
container.registerAuthService(authService)
container.registerMessageService(messageService)

export {container}

