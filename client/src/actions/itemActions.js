import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  PATCH_ITEM
} from "./types";

export const getItems = cart => dispatch => {
  dispatch(setItemsLoading());

  axios.get(`/api/items/${cart}`).then(res => {
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  });
};

export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const addItem = item => dispatch => {
  axios.post("/api/items", item).then(res => {
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    });
  });
};

export const updateItem = item => dispatch => {
  axios.patch("/api/items", item).then(res => {
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    });
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
