import { IUser } from '../interfaces';

export type AddUserAction = {
  type: string;
  payload: IUser | null;
}

export type searchAction = {
  type: string;
}