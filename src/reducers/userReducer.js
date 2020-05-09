const userDefaultState = {};

const userReducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      // make sure this works properly!
      return state.concat(action.user);
    case 'EDIT_USER':
      return state.map((user) =>
        user.id !== action.id ? user : { ...user, ...action.user }
      );
    case 'ADD_FOLLOWING':
      // get the user and concat on following
      return state;
    case 'ADD_FOLLOWER':
      // get the user and increment followers
      return state;
    case 'REMOVE_FOLLOWING':
      // get the user and filter following
      return state;
    case 'REMOVE_FOLLOWER':
      // get the user and decrement followers
      return state;
    default:
      return state;
  }
};

export default userReducer;
