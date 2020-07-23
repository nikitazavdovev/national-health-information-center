import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./types";

const initialState = {
  notifications: 0
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {...state, notifications: state.notifications + 1};
    case REMOVE_NOTIFICATION:
      return {...state, notifications: 0};
    default: return state;
  }
};