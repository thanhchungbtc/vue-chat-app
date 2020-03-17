# vue-chat-app
Just a simple chat app that uses
- firebase backend
- rxjs
- vuex for state management

## Features
- Log in, register by email, password
- One2one chat


### Firebase data structure
I have two nodes: `users` and `chats` that store user information and chat messages respectively

#### Users
When register new user, we will add the created user to the node, so we can manage to add more profile information

#### Some note on how to store messages

##### Attempt 1
all `chats` go into `users` node.
```js
// Example of an user
{
  id: "some long id",
  email: "johndoe@test.com",
  chats: [ // <- chats is a collection
    {
      receiverId: 'another long user id',
      messages: [ // <- messages is a collection, too
        {
          id: 'message id',
          sender: {id: 'sender', email: 'sender@email.com'},
          text: ''
        }       
      
      ] 
    }   
  
  ]
}
```

**Pros**
- Easy to retrieve chat list when we already have the `user`

**Cons**
- Send a message would be troublesome since we must add the same message on both the sender and the receiver.


##### Attempt 2
Separate `users` and `chats` nodes
```js
// Example of a chat
{
  id: "chat id",
  memberIds: ["senderId", "receiverId"],
  messages: [
    {
      sender: {id: '', email: ''},
      receiver: {id: '', email: ''},
      sentAt: '',
      text: ''
    }    
  ]
}
```

**Pros**
- Cleaner `users` node, the only needed to is the user's profile information
- Send message is much more easier, since we only need `chatId` 
- Easier to extend in case if we want to do group chat

**Cons**
- More overhead when retrieving user's chat list

To make it easier retrieving the chat list, in this special one to one chat case , we can apply the following rule when creating a new chat

```typescript
getChatId(user: User, other: User): string {
return user.id < other.id ?
  `${user.id}-${other.id}` :
  `${other.id}-${user.id}`
}
```
Chat id will be the combination of 2 users' id, with the lower will come first








## How to run
### Environment
- Change `.env.example` to `.env`
- Update `.env` with your firebase config

### Development
```
yarn serve
```

### Production
```shell script
yarn build
```

### Unit test
```shell script
yarn test:unit
```