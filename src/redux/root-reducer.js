import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopDataReducer from './shop-data/shop-data.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] //only reducer we want to persis is cart bc user is stored in firebase
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shopData: shopDataReducer
})

export default persistReducer(persistConfig, rootReducer)