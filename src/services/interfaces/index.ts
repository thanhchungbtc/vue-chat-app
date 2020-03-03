import {Observable} from "rxjs";
import Login from "@/views/Login.vue";

export class Message {
  id = ''
  outgoing = false
  text = ''
}

export class User {
  id = ''
  username = ''
  lastMessage = ''
}


export class SendMessagePayload {
  sendFrom: User = new User();
  sendTo: User = new User();
  text: string = '';

}
export class LoginPayload {
  email: string = '';
  password: string = '';
}

export interface MessageService {
  getOnlineUsersStream(): Observable<User[]>;

  getPartnersStream(): Observable<User[]>;

  getMessagesStream(): Observable<Message[]>;

  sendMessage(payload: SendMessagePayload): Observable<boolean>;
}

export interface AuthService {
  login(credentials: LoginPayload): Observable<User>;
  register(credentials: LoginPayload): Observable<User>;
}