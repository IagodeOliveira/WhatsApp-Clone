import { IChatUser } from "../../interfaces";

export interface IProps {
  click: () => void;
  active: boolean;
  data: IChatUser;
}

interface IAll {
  backColor: string;
  isNew: string;
  iconSeen: string;
  isActive: string;
  seen: string;
}

export interface IColor {
  all: IAll;
}