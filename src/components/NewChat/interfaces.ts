import { IUser, IChatUser } from "../../interfaces";

export interface IProps {
  show: boolean;
  setShow: (e: boolean) => void;
  setActiveChat: (e: IChatUser) => void;
}