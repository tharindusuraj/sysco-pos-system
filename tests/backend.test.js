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
        _id: "3",
        name: "lemons",
        productCode: "30",
        price: "9",
        description: "test3",
        availableCount: "110"
      }
    };

    expect(
      reducer(
        {
          items: [
            {
              _id: "1",
              name: "banana",
              productCode: "10",
              price: "10",
              description: "test",
              availableCount: "100"
            },
            {
              _id: "2",
              name: "orange",
              productCode: "20",
              price: "12",
              description: "test2",
              availableCount: "150"
            }
          ]
        },
        addItemAction
      )
    ).toEqual(
      {
        items: [
          {
            _id: "3",
            name: "lemons",
            productCode: "30",
            price: "9",
            description: "test3",
            availableCount: "110"
          },
          {
            _id: "1",
            name: "banana",
            productCode: "10",
            price: "10",
            description: "test",
            availableCount: "100"
          },
          {
            _id: "2",
            name: "orange",
            productCode: "20",
            price: "12",
            description: "test2",
            availableCount: "150"
          }
        ]
      },
      {
        items: [
          {
            _id: "1",
            name: "banana",
            productCode: "10",
            price: "10",
            description: "test",
            availableCount: "100"
          },
          {
            _id: "2",
            name: "orange",
            productCode: "20",
            price: "12",
            description: "test2",
            availableCount: "150"
          }
        ]
      }
    );
  });
});
