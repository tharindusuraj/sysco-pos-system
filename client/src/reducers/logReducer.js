const initialState = {
  logged: false,
  cart_id: "",
  username: ""
};

const logReducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === "LOG_IN") {
    newState.logged = true;
    newState.cart_id = action.cart;
    newState.username = action.username;
  }
  if (action.type === "LOG_OUT") {
    newState.logged = false;
    newState.cart_id = "";
    newState.username = "";
  }

  return newState;
};

export default logReducer;
