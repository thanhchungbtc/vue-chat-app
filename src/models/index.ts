export interface User {
  id: string;
  email: string;
  avatar?: string;
}

export interface Message {
  id: string;
  text: string;
  fromUser: User;
  toUser: User;
}

export interface Chat {
  id: string;
  memberIds: string[];
  members: User[];
  messages?: Message[];
}

