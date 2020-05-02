import { combineReducers } from 'redux';

import userReducer from './userReducer';
import blogReducer from './blogReducer';

const rootReducer = combineReducers({
  users: userReducer,
  blogs: blogReducer,
});

export default rootReducer;
