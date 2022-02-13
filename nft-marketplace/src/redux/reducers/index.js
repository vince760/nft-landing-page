import { LOGIN_USER, LOGOUT_USER } from "../constants/action-types";

const initialState = {
  currentUser: {
    user_token: "",
    wallet_address: "",
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        currentUser: null,
      };
    default:
      return state;
  }
}

export default rootReducer;
