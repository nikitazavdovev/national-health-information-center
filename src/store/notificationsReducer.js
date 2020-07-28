import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./types";

const initialState = {
  notifications: false
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {...state, notifications: true};
    case REMOVE_NOTIFICATION:
      return {...state, notifications: false};
    default: return state;
  }
};