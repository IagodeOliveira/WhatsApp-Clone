
import { searchAction } from './interfaces';

const SearchReducer = (state: boolean, action: searchAction) => {
  switch(action.type) {
    case 'show':
      return true;
    case 'hide':
      return false;
    default:
      return false;
  }
}

export default SearchReducer;