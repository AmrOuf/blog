const userDefaultState = {};

const userReducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return state.concat(action.user);
    case 'EDIT_USER':
      return state.map((user) =>
        user.id !== action.id ? user : { ...user, ...action.user }
      );
    default:
      return state;
  }
};

export default userReducer;
