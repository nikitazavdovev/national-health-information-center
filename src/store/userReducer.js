import {
  USER_LOGIN,
  USER_LOGOUT} from "./types";

const initialState = {
  role: '',
  isLoggedIn: false,
  name: ''
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        role: action.payload.role,
        name: action.payload.name
      };
    case USER_LOGOUT:
      return initialState;
    default: return state;
  }
};