import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import thunk from 'redux-thunk';
import Reducers from './Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middleware = [thunk];

const config = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: '',
  whitelist: ['user'],
};

const persistedReducer = persistCombineReducers(config, {
  user: Reducers,
});

export const store = compose(applyMiddleware(...middleware))(createStore)(
  persistedReducer,
);

export const persistor = persistStore(store);
