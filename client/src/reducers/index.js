import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import "bootstrap/dist/css/bootstrap.css";

export default combineReducers({
  item: itemReducer
});
