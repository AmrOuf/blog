import axios from 'axios';

const setFilter = (activeFilter) => ({
  type: 'SET_FILTER',
  activeFilter: activeFilter,
});

const fetchUsers = (token, query) => {
  return async () => {
    const { data } = await axios.get(
      `http://localhost:3000/users/search?keyword=${query}`,
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
      `http://localhost:3000/blogs/searchbytitle?keyword=${query}`,
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

const fetchBlogsByTags = (token, query, pageNumber, pageSize) => {
  return async () => {
    const { data } = await axios.post(
      `http://localhost:3000/blogs/searchbytags?keyword=${query}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

export { setFilter, fetchUsers, fetchBlogsByTitle, fetchBlogsByTags };
