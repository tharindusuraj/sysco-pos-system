const initialState = {
  logged: false,
  cart_id: "",
  username: ""
};

const logReducer = (state = initialState, action) => {
  const newState = { ...state };

  //After logging in...
  //1)Change logged_status - true
  //2)set cart_id to logged users cart id
  //3)Set username to logged users name
  if (action.type === "LOG_IN") {
    newState.logged = true;
    newState.cart_id = action.cart;
    newState.username = action.username;
  }

  //After logging out...
  //1)Change logged_status - false
  //2)Set cart_id empty
  //3)Set username empty
  if (action.type === "LOG_OUT") {
    newState.logged = false;
    newState.cart_id = "";
    newState.username = "";
  }

  return newState;
};

export default logReducer;
