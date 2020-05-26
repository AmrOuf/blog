import axios from 'axios';

const setLoggedInUser = (data) => ({
  type: 'SET_LOGGEDIN_USER',
  data,
});

const addUser = (user) => {
  return async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/users/register`,
      user
    );
    return data;
  };
};

const logInUser = (credentials) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/users/login`,
      credentials
    );
    dispatch(setLoggedInUser(data));
    return data;
  };
};

const fetchUser = (id) => {
  return async (dispatch) => {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/users/${id}`
    );
    return data;
  };
};

const editUser = (id, user, token) => {
  return async () => {
    const data = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URI}/users/edit/${id}`,
      { user: user },
      { headers: { Authorization: token } }
    );
  };
};

const deleteBlogFromUser = (id) => ({
  type: 'DELETE_BLOG',
  id,
});

export {
  addUser,
  editUser,
  logInUser,
  setLoggedInUser,
  fetchUser,
  deleteBlogFromUser,
};
