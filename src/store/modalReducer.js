import {CLOSE_NEW_STANDART_MODAL, OPEN_NEW_STANDART_MODAL} from "./types";

const initialState = {
  isNewStandartModalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NEW_STANDART_MODAL:
      return {...state, isNewStandartModalOpen: true};
    case CLOSE_NEW_STANDART_MODAL:
      return {...state, isNewStandartModalOpen: false};
    default: return state;
  }
};