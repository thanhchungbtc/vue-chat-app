import {Message, MessageService, SendMessagePayload, User} from "@/services/interfaces";
import {Observable, of} from "rxjs";

export default class FirebaseMessageService implements MessageService {
  getMessagesStream(): Observable<Message[]> {
    return of([]);
  }

  getOnlineUsersStream(): Observable<User[]> {
    return of([]);
  }

  sendMessage(payload: SendMessagePayload): Observable<boolean> {
    return of(true);
  }

  getPartnersStream(): Observable<User[]> {
    return of([]);
  }

}