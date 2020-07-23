import {
  CLOSE_MAIN_MENU,
  CLOSE_NEW_STANDARD_MODAL,
  OPEN_MAIN_MENU,
  OPEN_NEW_STANDARD_MODAL,
  TOGGLE_MAIN_MENU,
  OPEN_VIEW_CODE_MODAL,
  CLOSE_VIEW_CODE_MODAL,
  ADD_NEW_TERMINOLOGY_FORM_DATA,
  REMOVE_NEW_TERMINOLOGY_FORM_DATA,
  USER_LOGIN,
  USER_LOGOUT,
  ADD_NEW_TERMINOLOGY_ADMIN,
  ADD_NEW_TERMINOLOGY_USER,
  OPEN_VIEW_MATCHES_MODAL,
  CLOSE_VIEW_MATCHES_MODAL,
  SEND_CODE_FOR_APPROVAL,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  OPEN_DECLINE_REQUEST_MODAL,
  CLOSE_DECLINE_REQUEST_MODAL
} from "./types";

export function openNewStandardModal({basicPath}) {
  return {
    type: OPEN_NEW_STANDARD_MODAL,
    payload: basicPath
  }
}
export function closeNewStandardModal() {
  return {
    type: CLOSE_NEW_STANDARD_MODAL
  }
}
export function openViewCodeModal(code) {
  return {
    type: OPEN_VIEW_CODE_MODAL,
    payload: code
  }
}
export function closeViewCodeModal() {
  return {
    type: CLOSE_VIEW_CODE_MODAL
  }
}
export function openViewMatchesModal(code) {
  return {
    type: OPEN_VIEW_MATCHES_MODAL,
    payload: code
  }
}
export function closeViewMatchesModal() {
  return {
    type: CLOSE_VIEW_MATCHES_MODAL
  }
}
export function openDeclineRequestModal(code) {
  return {
    type: OPEN_DECLINE_REQUEST_MODAL,
    payload: code
  }
}
export function closeDeclineRequestModal() {
  return {
    type: CLOSE_DECLINE_REQUEST_MODAL
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
export function addNewTerminologyFormData(newTerminologyData) {
  return {
    type: ADD_NEW_TERMINOLOGY_FORM_DATA,
    payload: newTerminologyData
  }
}
export function removeNewTerminologyFormData() {
  return {
    type: REMOVE_NEW_TERMINOLOGY_FORM_DATA
  }
}
export function addNewTerminologyAdmin(newTerminologyData) {
  return {
    type: ADD_NEW_TERMINOLOGY_ADMIN,
    payload: newTerminologyData
  }
}
export function addNewTerminologyUser(newTerminologyData) {
  return {
    type: ADD_NEW_TERMINOLOGY_USER,
    payload: newTerminologyData
  }
}
export function sendTerminologyCodeForApproval(codeData, ) {
  return {
    type: SEND_CODE_FOR_APPROVAL,
    payload: codeData
  }
}
export function userLogin(user) {
  return {
    type: USER_LOGIN,
    payload: user
  }
}
export function userLogout() {
  return {
    type: USER_LOGOUT
  }
}

export function addNotification() {
  return {
    type: ADD_NOTIFICATION
  }
}
export function removeNotification() {
  return {
    type: REMOVE_NOTIFICATION
  }
}