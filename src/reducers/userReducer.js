// Dummy data - default is an empty array
// Assume id: 1 is logged in
const userDefaultState = [
  {
    id: 1,
    firstName: 'Amr',
    lastName: 'Ouf',
    email: 'amr.ouf@yahoo.com',
    password: '123456',
    following: [3],
    followers: 0,
  },
  {
    id: 2,
    firstName: 'Momen',
    lastName: 'Sherif',
    email: 'momen.sherif@yahoo.com',
    password: '123456',
    following: [],
    followers: 0,
  },
  {
    id: 3,
    firstName: 'Mennatullah',
    lastName: 'Sayed',
    email: 'menna.sayed@yahoo.com',
    password: '123456',
    following: [2, 4, 6, 8, 10, 12, 14],
    followers: 200,
  },
];

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
