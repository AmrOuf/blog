import axios from 'axios';

const setLoggedInUser = (data) => ({
  type: 'SET_LOGGEDIN_USER',
  data,
});

const addUser = (user) => {
  return async () => {
    const { data } = await axios.post(
      'http://localhost:3000/users/register',
      user
    );
    return data;
  };
};

const logInUser = (credentials) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      'http://localhost:3000/users/login',
      credentials
    );
    dispatch(setLoggedInUser(data));
    return data;
  };
};

const fetchUser = (id) => {
  return async (dispatch) => {
    console.log('calling backend..');
    const data = await axios.get(`http://localhost:3000/users/${id}`);
    console.log(data);
    return data;
  };
};

const deleteBlogFromUser = (id) => ({
  type: 'DELETE_BLOG',
  id,
});

// may remove edit
const editUser = (id, user) => ({
  type: 'EDIT_USER',
  id: id,
  user: user,
});

export {
  addUser,
  editUser,
  logInUser,
  setLoggedInUser,
  fetchUser,
  deleteBlogFromUser,
};
