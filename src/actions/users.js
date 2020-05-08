import axios from 'axios';

const addUser = (user) => {
  return async () => {
    const { data } = await axios.post(
      'http://localhost:3000/users/register',
      user
    );
    return data;
  };
};

const editUser = (id, user) => ({
  type: 'EDIT_USER',
  id: id,
  user: user,
});

export { addUser, editUser };
