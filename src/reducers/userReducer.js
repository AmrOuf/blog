// Dummy data - default is an empty array
const userDefaultState = [
  {
    id: 1,
    firstName: 'Amr',
    lastName: 'Ouf',
    email: 'amr.ouf@yahoo.com',
    password: '123456',
    following: [1, 2, 5, 7, 8],
    followers: 100,
  },
  {
    id: 2,
    firstName: 'Momen',
    lastName: 'Sherif',
    email: 'momen.sherif@yahoo.com',
    password: '123456',
    following: [1, 2],
    followers: 10,
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
      console.log('user reducer');
      return state.concat(action.user);
    case 'EDIT_USER':
      // get the user and edit it
      return state;
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
