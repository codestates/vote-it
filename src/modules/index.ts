import { combineReducers } from 'redux';
import login from './login';
import notificationReducer from './notification';

const rootReducer = combineReducers({
  login,
  notificationReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
