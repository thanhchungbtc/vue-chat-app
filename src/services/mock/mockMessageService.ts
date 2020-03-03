import {BehaviorSubject, from, interval, Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Message, MessageService, SendMessagePayload, User} from "@/services/interfaces";


export default class MockMessageService implements MessageService {

  private readonly _messages: BehaviorSubject<Message[]>
  private readonly _partners: BehaviorSubject<User[]>
  private readonly _onlineUsers: BehaviorSubject<User[]>

  constructor() {
    const messages: Message[] = []
    const options = [true, false]
    for (let i = 1; i < 20; i++) {
      messages.push({
        id: `${i}`,
        outgoing: options[Math.floor(Math.random() * options.length)],
        text: 'seLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e'
      })
    }
    this._messages = new BehaviorSubject<Message[]>(messages)

    const partners: User[] = []
    for (let i = 1; i < 3; i++) {
      partners.push({
        id: `${i}`,
        username: `User ${i}`,
        lastMessage: 'seLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e'
      })
    }
    this._partners = new BehaviorSubject<User[]>(partners)

    const onlineUsers: User[] = []
    for (let i = 1; i < 10; i++) {
      onlineUsers.push({
        id: `${i}`,
        username: `User ${i}`,
        lastMessage: 'seLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e'
      })
    }
    this._onlineUsers = new BehaviorSubject<User[]>(onlineUsers)
  }

  getOnlineUsersStream(): Observable<User[]> {
    return this._onlineUsers.asObservable()
  }


  getPartnersStream(): Observable<User[]> {
    return this._partners.asObservable()
  }

  getMessagesStream(): Observable<Message[]> {
    const messages: Message[] = []
    const options = [true, false]
    for (let i = 1; i < (5 + Math.floor(Math.random() * 20)); i++) {
      messages.push({
        id: `${i}`,
        outgoing: options[Math.floor(Math.random() * options.length)],
        text: 'seLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e'
      })
    }
    this._messages.next(messages)
    return this._messages.asObservable()
  }

  sendMessage(payload: SendMessagePayload): Observable<boolean> {
    console.log('hit')
    const messages = this._messages.getValue()
    const message = new Message()
    message.text = payload.text
    message.outgoing = true
    message.id = `${messages.length + 1}`

    messages.push(message)

    this._messages.next(messages)
    return of(true)
  }

}