import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { user, address, addressExtras, basket, basketExtra } from "./reducer";
const reducers = combineReducers({
  user,
  address,
  addressExtras,
  basket,
  basketExtra,
});
const middleWare = [thunk];
const userInfo = JSON.parse(localStorage.getItem("User")) || {};
const localBasket = JSON.parse(localStorage.getItem("basket")) || [];
const localBasketExtra = JSON.parse(localStorage.getItem("basketExtra")) || [];
const localeAddress = JSON.parse(localStorage.getItem("address")) || {};
const localeAddressExtras =
  JSON.parse(localStorage.getItem("addressExtras")) || {};
const initialState = {
  user: userInfo,
  basket: localBasket,
  basketExtra: localBasketExtra,
  address: localeAddress,
  addressExtras: localeAddressExtras,
};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleWare)
);
export default store;
