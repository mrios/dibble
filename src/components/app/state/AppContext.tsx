import React, { createContext, useReducer } from 'react';

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const CHANGE_LANG = 'CHANGE_LANG';
export const UPDATE_APP_NAME = 'UPDATE_APP_NAME';

export interface ActionType {
  type: string;
  payload: Object;
}

export type ThemeType = 'dark' | 'light' | undefined;

export type InitialStateAppType = {
  appName: string;
  isCollapsed: boolean;
  hasLogoImage: boolean;
  siderWidth: number;
  appLang: string;
  menu: {
    theme: ThemeType;
  };
};

const initialState = {
  appName: 'Dibble',
  isCollapsed: false,
  hasLogoImage: false,
  siderWidth: 210,
  appLang: 'en',
  menu: {
    theme: 'dark' as const,
  },
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

const changeLang = (payload: Object, state: { isCollapsed: boolean }) => {
  return { ...state, appLang: payload };
};

const updateAppName = (payload: Object, state: { isCollapsed: boolean }) => {
  return { ...state, appName: payload };
};

export const appReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return toggleMenu(action.payload, state);
    case CHANGE_LANG:
      return changeLang(action.payload, state);
    case UPDATE_APP_NAME:
      return updateAppName(action.payload, state);
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
