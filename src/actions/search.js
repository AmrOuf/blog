import axios from 'axios';

const setFilter = (activeFilter) => ({
  type: 'SET_FILTER',
  activeFilter: activeFilter,
});

const fetchUsers = (token, query) => {
  return async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/users/search?keyword=${query}`,
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

const fetchBlogsByTitle = (token, query) => {
  return async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/blogs/searchbytitle?keyword=${query}`,
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

const fetchBlogsByTags = (token, query) => {
  return async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/blogs/searchbytags?keyword=${query}`,
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

export { setFilter, fetchUsers, fetchBlogsByTitle, fetchBlogsByTags };
