import { combineReducers } from 'redux';

import userReducer from './userReducer';
import blogReducer from './blogReducer';
import searchReducer from './searchReducer';
import loggedInReducer from './loggedInReducer';

const rootReducer = combineReducers({
  users: userReducer,
  blogs: blogReducer,
  search: searchReducer,
  loggedIn: loggedInReducer,
});

export default rootReducer;
