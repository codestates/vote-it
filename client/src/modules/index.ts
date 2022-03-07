import { combineReducers } from 'redux';
import loginReducer from './login';
import notificationReducer from './notification';

const rootReducer = combineReducers({
  login: loginReducer,
  notificationReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
