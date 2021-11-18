import { IUser } from '../interfaces';

export type AddUserAction = {
  type: string;
  payload: IUser | null;
}

export default (state: IUser | null, action: AddUserAction) => {
  switch (action.type) {
    case 'addUser':
      return action.payload;
    case 'removeUser':
      return action.payload;
    default:
      return state;
  }
}