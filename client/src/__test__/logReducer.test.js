import logReducer from "../reducers/logReducer";

describe("login reducer", () => {
  it("should handle LOG_IN", () => {
    const loginAction = {
      type: "LOG_IN",
      cart: "123abc",
      username: "suraj"
    };

    expect(logReducer({}, loginAction)).toEqual({
      logged: true,
      cart_id: "123abc",
      username: "suraj"
    });
  });
});

it("should handle LOG_OUT", () => {
  const logoutAction = {
    type: "LOG_OUT",
    cart: "123abc456",
    username: "ThaSu"
  };

  expect(logReducer({}, logoutAction)).toEqual({
    logged: false,
    cart_id: "",
    username: ""
  });
});
