import {AuthService, MessageService} from "@/services/interfaces";
import FirebaseAuthService from "@/services/firebase/firebaseAuthService";
import MockMessageService from "@/services/mock/mockMessageService";


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
container.registerAuthService(new FirebaseAuthService())
container.registerMessageService(new MockMessageService())

export {container}

