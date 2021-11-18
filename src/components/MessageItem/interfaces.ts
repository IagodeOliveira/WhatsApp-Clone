import { IUser, IMessage } from "../../interfaces";

export interface IProps {
  data: IMessage;
  first: boolean;
}

interface IAll {
  position: string;
  userColor: string;
  userDisplay: string;
  ftsMsg: string;
  pos: string;
}

export interface IPosition {
  all: IAll;
  seenTrue?: string;
}