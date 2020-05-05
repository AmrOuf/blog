// default is an empty object or null
const loggedInDefaultState = {
  id: 1,
  firstName: 'Amr',
  lastName: 'Ouf',
  email: 'amr.ouf@yahoo.com',
  password: '123456',
  following: [3],
  followers: 0,
};

const loggedInReducer = (state = loggedInDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default loggedInReducer;
