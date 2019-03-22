import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../actions/itemActions";
import * as types from "../actions/types";
import expect from "expect";
import moxios from "moxios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getItems itemActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("Tested", () => {
    const expectedArray = [
      {
        itm: {
          cart: "123abc",
          name: "Piano",
          count: 1
        }
      },
      {
        itm: {
          cart: "1dsbc",
          name: "Violin",
          count: 5
        }
      },
      {
        itm: {
          cart: "2fe4bc",
          name: "Organ",
          count: 3
        }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedArray
      });
    });

    const expectedActions = [
      { type: types.ITEMS_LOADING },
      {
        payload: expectedArray,
        type: types.GET_ITEMS
      }
    ];

    const store = mockStore({
      items: [],
      loading: false
    });

    return store.dispatch(actions.getItems()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("addItem itemActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("Tested", () => {
    const expectedArray = [
      {
        itm: {
          cart: "123abc",
          name: "Piano",
          count: 1
        }
      },
      {
        itm: {
          cart: "1dsbc",
          name: "Violin",
          count: 5
        }
      },
      {
        itm: {
          cart: "2fe4bc",
          name: "Organ",
          count: 3
        }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedArray
      });
    });

    const expectedActions = [
      {
        payload: expectedArray,
        type: types.ADD_ITEM
      }
    ];

    const store = mockStore({
      items: [],
      loading: false
    });
    let item = { name: "Tea", available: 1000, price: 28 };

    return store.dispatch(actions.addItem(item)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("updateItem itemActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("Tested", () => {
    const expectedArray = [
      {
        itm: {
          cart: "123abc",
          name: "Piano",
          count: 1
        }
      },
      {
        itm: {
          cart: "1dsbc",
          name: "Violin",
          count: 5
        }
      },
      {
        itm: {
          cart: "2fe4bc",
          name: "Organ",
          count: 3
        }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedArray
      });
    });

    const expectedActions = [
      {
        payload: expectedArray,
        type: types.ADD_ITEM
      }
    ];

    const store = mockStore({
      items: [],
      loading: false
    });
    let item = { cart: "2fe4bc", name: "Organ", count: 8 };

    return store.dispatch(actions.updateItem(item)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("deleteItem itemActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("Tested", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 204
      });
    });
    let id = "123abc";

    const expectedActions = [
      {
        payload: id,
        type: types.DELETE_ITEM
      }
    ];

    const store = mockStore({
      items: [],
      loading: false
    });

    return store.dispatch(actions.deleteItem(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("setItemsLoading itemActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("Tested", () => {
    moxios.wait(() => {
      const expectedActions = [
        {
          type: types.ITEMS_LOADING
        }
      ];

      const store = mockStore({
        items: [],
        loading: false
      });
      return store.dispatch(actions.setItemsLoading()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
