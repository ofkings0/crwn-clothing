import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  errorMsg: undefined
}

const userReduer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return{
        ...state,
        currentUser: action.payload,
        errorMsg: null
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        errorMsg: null
      }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return{
        ...state,
        errorMsg: action.payload
      }
    default:
      return state;
  }
}

export default userReduer;