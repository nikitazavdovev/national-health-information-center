import {
  USER_LOGIN,
  USER_LOGOUT
} from "./types";

const initialState = {
  role: '',
  type: '',
  isLoggedIn: false,
  name: '',
  organizationId: ''
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case USER_LOGOUT:
      return initialState;
    default: return state;
  }
};