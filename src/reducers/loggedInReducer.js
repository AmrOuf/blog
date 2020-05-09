const loggedInDefaultState = {};

const loggedInReducer = (state = loggedInDefaultState, action) => {
  switch (action.type) {
    case 'SET_LOGGEDIN_USER':
      return { ...action.data.user, token: action.data.token };
    default:
      return state;
  }
};

export default loggedInReducer;
