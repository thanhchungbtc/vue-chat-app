import {Observable} from "rxjs";
import Login from "@/views/Login.vue";

export class Message {
  id = ''
  outgoing = false
  text = ''
}

export class User {
  id = ''
  email = ''
  lastMessage = ''
}


export class SendMessagePayload {
  sendFrom!: User
  sendTo!: User
  text: string = '';
}

export class FetchMessagePayload {
  sendFrom!: User
  sendTo!: User
}


export class LoginPayload {
  email: string = '';
  password: string = '';
}

export class AddPartnerPayload {
  sendFrom!: User
  sendTo!: User
}

export interface MessageService {
  getOnlineUsersStream(): Observable<User[]>;

  getPartnersStream(user: User): Observable<User[]>;

  getMessagesStream(payload: FetchMessagePayload): Observable<Message[]>;

  sendMessage(payload: SendMessagePayload): void;

  addPartner(payload: AddPartnerPayload): void;
}

export interface AuthService {
  login(credentials: LoginPayload): Observable<User | null>;

  register(credentials: LoginPayload): Observable<User | null>;

  logout(): Observable<void>;

  listen(): Observable<User | null>;
}