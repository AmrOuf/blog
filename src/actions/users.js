const addUser = (user) => ({
  type: 'ADD_USER',
  user: user,
});

const editUser = (id, user) => ({
  type: 'EDIT_USER',
  id: id,
  user: user,
});

export { addUser, editUser };
