

export interface IFile {
  filename: string;
  mimetype: string;
  path: string;
  destination: string;
  size: number;
}

export interface IMessage {
  name: string;
  type: string;
  url: string;
}

export interface IFiles {
  from: string;
  to: string;
  fromTo: string | null;
  message: string | null;
  media: IMessage | null;
  date: Date;
  timeH: Date;
}

export interface IChatUser {
  chatId: string;
  name: string;
  avatar: string;
  to: string;
  from: string;
  lastMessage: string | null;
  lastMessageDate: TimeStamp | null;
}

export interface IUsers {
  id: string;
  name: string | null;
  avatar: string | null;
  chats?: IChatUser[];
}

export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}