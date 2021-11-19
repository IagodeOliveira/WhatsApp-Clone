import { IUser } from '../interfaces';
import { AddUserAction } from './interfaces';

const AddUseReducer =  (state: IUser | null, action: AddUserAction) => {
  switch (action.type) {
    case 'addUser':
      return action.payload;
    case 'removeUser':
      return action.payload;
    default:
      return state;
  }
}

export default AddUseReducer;