import React, { createContext, useContext, useReducer, Dispatch } from "react";

import SearchReducer, { searchAction } from '../reducers/SearchReducer';
import IncrementReducer, { AddUserAction } from '../reducers/AddUserReducer';
import { IUser } from '../interfaces';

type InitialStateType = {
  sIcon: boolean;
  user: IUser | null;
}

const initialState = {
  sIcon: false,
  user: null
}

const mainReducer = ({ sIcon, user }: InitialStateType, action: searchAction | AddUserAction) => ({
  sIcon: SearchReducer(sIcon, action as searchAction),
  user: IncrementReducer(user, action as AddUserAction),
});

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<searchAction | AddUserAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      { children }
    </AppContext.Provider>
  )
}

export const useStateValue = () => useContext(AppContext);
