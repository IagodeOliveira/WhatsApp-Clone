
import { IChatUser, IUser } from "../../interfaces";

interface IIcon {
  searchIcon: string;
  moreIcon: string;
  attachIcon: string;
  menuIcons: string;
  drop: string;
}

export interface IIcons {
  all: IIcon;
}

export interface IEmoji {
  emojiColor?: string;
  emoji?: number;
}

export interface IProps {
  guest: IChatUser;
}