import {CLOSE_MAIN_MENU, OPEN_MAIN_MENU, TOGGLE_MAIN_MENU} from "./types";

const initialState = {
  isMainMenuOpen: false,
};

export const mainMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MAIN_MENU:
      return {...state, isMainMenuOpen: true};
    case CLOSE_MAIN_MENU:
      return {...state, isMainMenuOpen: false};
    case TOGGLE_MAIN_MENU:
      return {...state, isMainMenuOpen: !state.isMainMenuOpen};
    default: return state;
  }
};