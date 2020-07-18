import React, { createContext, useReducer } from 'react';
import _ from 'lodash';

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_MENU_THEME = 'TOGGLE_MENU_THEME';
export const CHANGE_LANG = 'CHANGE_LANG';
export const UPDATE_APP_NAME = 'UPDATE_APP_NAME';
export const UPDATE_APP_LOGO = 'UPDATE_APP_LOGO';
export const UPDATE_APP_LOGO_BG = 'UPDATE_APP_LOGO_BG';

export interface ActionType {
  type: string;
  payload: Object;
}

export type ThemeType = 'dark' | 'light' | undefined;

export type StateAppType = {
  app: {
    name: string;
    lang: string;
    ui: {
      brand: {
        backgroundColor: string;
        icon: string;
        imageUrl: string;
      };
      sider: {
        theme: ThemeType;
        width: number;
        isCollapsed: boolean;
      };
    };
  };
};

const initialState = {
  app: {
    name: 'Dibble',
    lang: 'en',
    ui: {
      brand: {
        backgroundColor: '',
        icon: '',
        imageUrl: '',
      },
      sider: {
        theme: 'dark' as const,
        width: 210,
        isCollapsed: false,
      },
    },
  },
};

const AppContext = createContext<{
  state: StateAppType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const updateAppName = (payload: Object, state: StateAppType) => {
  return { ...state, app: _.merge(state, { app: { name: payload } }).app };
};

const changeLang = (payload: Object, state: StateAppType) => {
  return { ...state, app: _.merge(state, { app: { lang: payload } }).app };
};

const updateAppLogo = (payload: Object, state: StateAppType) => {
  return {
    ...state,
    app: _.merge(state, { app: { ui: { brand: { imageUrl: payload } } } }).app,
  };
};

const updateAppLogoBg = (payload: Object, state: StateAppType) => {
  return {
    ...state,
    app: _.merge(state, {
      app: { ui: { brand: { backgroundColor: payload } } },
    }).app,
  };
};

const toggleMenu = (payload: Object, state: StateAppType) => {
  return {
    ...state,
    app: _.merge(state, { app: { ui: { sider: { isCollapsed: payload } } } })
      .app,
  };
};

const toggleMenuTheme = (payload: Object, state: StateAppType) => {
  return {
    ...state,
    app: _.merge(state, { app: { ui: { sider: { theme: payload } } } }).app,
  };
};

export const appReducer = (state: StateAppType, action: ActionType) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return toggleMenu(action.payload, state);
    case TOGGLE_MENU_THEME:
      return toggleMenuTheme(action.payload, state);
    case CHANGE_LANG:
      return changeLang(action.payload, state);
    case UPDATE_APP_NAME:
      return updateAppName(action.payload, state);
    case UPDATE_APP_LOGO:
      return updateAppLogo(action.payload, state);
    case UPDATE_APP_LOGO_BG:
      return updateAppLogoBg(action.payload, state);
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
