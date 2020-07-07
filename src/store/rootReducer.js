import {combineReducers} from "redux";
import {modalReducer} from "./modalReducer";
import {mainMenuReducer} from "./mainMenuReducer";

export const rootReducer = combineReducers({
  modal: modalReducer,
  menu: mainMenuReducer
});