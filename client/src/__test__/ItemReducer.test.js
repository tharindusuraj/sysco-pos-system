import reducer from "../reducers/itemReducer";
import * as types from "../actions/types";

describe("item reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      items: [],
      loading: false
    });
  });

  it("should handle ADD_ITEM", () => {
    const addItemAction = {
      type: types.ADD_ITEM,
      payload: {
        cart: "123abc",
        name: "Piano",
        count: 1
      }
    };

    expect(
      reducer(
        {
          items: [
            {
              cart: "123abc",
              name: "Tabla",
              count: 1
            },
            {
              cart: "123abc",
              name: "Violin",
              count: 1
            }
          ]
        },
        addItemAction
      )
    ).toEqual({
      items: [
        {
          cart: "123abc",
          name: "Piano",
          count: 1
        },
        {
          cart: "123abc",
          name: "Tabla",
          count: 1
        },
        {
          cart: "123abc",
          name: "Violin",
          count: 1
        }
      ]
    });
  });
});

it("should handle GET_ITEMS", () => {
  const getItemAction = {
    type: types.GET_ITEMS,
    payload: [
      {
        cart: "123x",
        name: "Violin",
        count: 5
      },
      {
        cart: "12db",
        name: "Tabla",
        count: 2
      }
    ]
  };
  expect(reducer([], getItemAction)).toEqual({
    items: [
      {
        cart: "123x",
        name: "Violin",
        count: 5
      },
      {
        cart: "12db",
        name: "Tabla",
        count: 2
      }
    ],
    loading: false
  });
});

it("should handle DELETE_ITEM", () => {
  const deleteItemAction = {
    type: types.DELETE_ITEM,
    payload: 1
  };

  expect(
    reducer(
      {
        items: [
          {
            cart: "123x",
            _id: 1,
            name: "Violin",
            count: 5
          },
          {
            cart: "12db",
            _id: 2,
            name: "Tabla",
            count: 2
          }
        ]
      },
      deleteItemAction
    )
  ).toEqual({
    items: [
      {
        cart: "12db",
        _id: 2,
        name: "Tabla",
        count: 2
      }
    ]
  });
});

it("should handle ITEMS_LOADING", () => {
  expect(
    reducer(
      {
        items: [
          {
            cart: "123x",
            _id: 1,
            name: "Violin",
            count: 5
          },
          {
            cart: "12db",
            _id: 2,
            name: "Tabla",
            count: 2
          }
        ],
        loading: false
      },
      {
        type: types.ITEMS_LOADING
      }
    )
  ).toEqual({
    items: [
      {
        cart: "123x",
        _id: 1,
        name: "Violin",
        count: 5
      },
      {
        cart: "12db",
        _id: 2,
        name: "Tabla",
        count: 2
      }
    ],
    loading: true
  });
});
