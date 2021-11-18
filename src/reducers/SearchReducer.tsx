
export type searchAction = {
  type: string;
}

export default (state: boolean, action: searchAction) => {
  switch(action.type) {
    case 'show':
      return true;
    case 'hide':
      return false;
    default:
      return false;
  }
}