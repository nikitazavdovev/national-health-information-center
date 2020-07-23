import {combineReducers} from "redux";
import {modalReducer} from "./modalReducer";
import {mainMenuReducer} from "./mainMenuReducer";
import {terminologyReducer} from "./terminologyReducer";
import {userReducer} from "./userReducer";
import {notificationsReducer} from "./notificationsReducer";

export const rootReducer = combineReducers({
  modal: modalReducer,
  menu: mainMenuReducer,
  terminology: terminologyReducer,
  user: userReducer,
  notifications: notificationsReducer,
});