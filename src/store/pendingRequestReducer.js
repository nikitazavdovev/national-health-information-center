import { v4 as uuidv4 } from 'uuid';
import {ADD_REQUEST, REMOVE_REQUEST, UPDATE_REQUEST} from "./types";

const initialState = {
  allRequests: []
};

export const pendingRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      const codeForApproval = action.payload;

      return {
        ...state,
        allRequests: [
          ...state.allRequests,
          {
            requestId: uuidv4(),
            organizationId: codeForApproval.user.organizationId,
            requestType: codeForApproval.requestType,
            requestMessage: null,
            senderName: codeForApproval.user.name,
            approverName: null,
            approverRole: 'reviewer',
            payload: codeForApproval.payload
          }
        ]
      };
    case REMOVE_REQUEST:
      const requestId = action.payload;

      return {
        ...state,
        allRequests: state.allRequests.filter(request => request.requestId !== requestId)
      };
    case UPDATE_REQUEST:
      const codeForUpdate = action.payload;

      return {
        ...state,
        allRequests: state.allRequests.map(request => {
          if(request.requestId === codeForUpdate.requestId) {
            return {
              ...request,
              requestType: codeForUpdate.requestType,
              senderName: codeForUpdate.user.name,
              approverName: codeForUpdate.user.role === 'reviewer' ? request.senderName : null,
              approverRole: codeForUpdate.user.role === 'editor' ? 'reviewer' : 'editor',
              requestMessage: codeForUpdate.message ? codeForUpdate.message : null,
              payload: codeForUpdate.payload
            }
          }
          return request;
        })
      };
    default:
      return state;
  }
};