import { combineReducers } from 'redux';

import userReducer from './userReducer';
import blogReducer from './blogReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  users: userReducer,
  blogs: blogReducer,
  search: searchReducer,
});

export default rootReducer;
