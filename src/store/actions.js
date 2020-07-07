import {
  CLOSE_MAIN_MENU,
  CLOSE_NEW_STANDART_MODAL,
  OPEN_MAIN_MENU,
  OPEN_NEW_STANDART_MODAL,
  TOGGLE_MAIN_MENU
} from "./types";

export function openNewStandartModal() {
  return {
    type: OPEN_NEW_STANDART_MODAL
  }
}
export function closeNewStandartModal() {
  return {
    type: CLOSE_NEW_STANDART_MODAL
  }
}

export function openMainMenu() {
  return {
    type: OPEN_MAIN_MENU
  }
}
export function closeMainMenu() {
  return {
    type: CLOSE_MAIN_MENU
  }
}
export function toggleMainMenu() {
  return {
    type: TOGGLE_MAIN_MENU
  }
}