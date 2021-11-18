

export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}

export interface ILastMessage {
  text: string | null;
  type: string | null;
  lastMessageDate: TimeStamp | null;
}

export interface IChatUser {
  chatId: string;
  name: string | null;
  avatar: string | null;
  to: string;
  from: string;
  lastMessage: ILastMessage;
  seen: boolean;
  unSeen: number;
}

export interface ILastSeen {
  chat: string | null;
  date: TimeStamp | null;
}

export interface IUser {
  id: string;
  name: string | null;
  avatar: string | null;
  chats?: IChatUser[];
  lastSeen: ILastSeen;
}

export interface IFaceGoogleUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface IMedia {
  name: string;
  url: string;
}

export interface IMessage {
  type: string;
  from: string;
  message: string | null;
  media: IMedia | null;
  date: TimeStamp;
  seen: boolean;
}

export interface ITest {
  results: any;
}

export interface ISendData {
  chatId: string;
  userId: string;
  type: string;
  text: string | null;
  media: IMessage | null;
  chatUsers: string[];
  to: string;
}