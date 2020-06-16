import React, { createContext, useReducer } from 'react';

export const TOGGLE_MENU = 'TOGGLE_MENU';

export interface ActionType {
  type: string;
  payload: Object;
}

export type InitialStateAppType = {
  isCollapsed: boolean;
  hasLogoImage: boolean;
  siderWidth: number;
};

const initialState = {
  isCollapsed: false,
  hasLogoImage: false,
  siderWidth: 210,
};

const AppContext = createContext<{
  state: InitialStateAppType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const toggleMenu = (payload: Object, state: { isCollapsed: boolean }) => {
  return { ...state, isCollapsed: payload };
};

export const appReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return toggleMenu(action.payload, state);
    default:
      return state;
  }
};

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
