import {
  CLOSE_NEW_STANDARD_MODAL,
  OPEN_NEW_STANDARD_MODAL,
  OPEN_VIEW_CODE_MODAL,
  CLOSE_VIEW_CODE_MODAL,
  OPEN_VIEW_MATCHES_MODAL,
  CLOSE_VIEW_MATCHES_MODAL,
  OPEN_DECLINE_REQUEST_MODAL,
  CLOSE_DECLINE_REQUEST_MODAL,
  OPEN_REQUEST_DETAILS_MODAL,
  CLOSE_REQUEST_DETAILS_MODAL,
} from "./types";

const initialState = {
  isNewStandardModalOpen: false,
  basicPath: '',
  isViewCodeModalOpen: false,
  currentCode: null,
  isViewMatchesModalOpen: false,
  viewMatchesModalData: '',
  isDeclineRequestModalOpen: false,
  isRequestDetailsModalOpen: false
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NEW_STANDARD_MODAL:
      return {...state, isNewStandardModalOpen: true, basicPath: state.basicPath ? state.basicPath : action.payload};
    case CLOSE_NEW_STANDARD_MODAL:
      return {...state, isNewStandardModalOpen: false};
      case OPEN_VIEW_CODE_MODAL:
      return {...state, isViewCodeModalOpen: true, currentCode: state.currentCode ? state.currentCode : action.payload};
    case CLOSE_VIEW_CODE_MODAL:
      return {...state, isViewCodeModalOpen: false, currentCode: null};
    case OPEN_VIEW_MATCHES_MODAL:
      return {...state, isViewMatchesModalOpen: true, viewMatchesModalData: action.payload};
    case CLOSE_VIEW_MATCHES_MODAL:
      return {...state, isViewMatchesModalOpen: false, viewMatchesModalData: ''};
    case OPEN_DECLINE_REQUEST_MODAL:
      return {...state, isDeclineRequestModalOpen: true};
    case CLOSE_DECLINE_REQUEST_MODAL:
      return {...state, isDeclineRequestModalOpen: false};
    case OPEN_REQUEST_DETAILS_MODAL:
      return {...state, isRequestDetailsModalOpen: true};
    case CLOSE_REQUEST_DETAILS_MODAL:
      return {...state, isRequestDetailsModalOpen: false};
    default: return state;
  }
};