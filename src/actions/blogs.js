import axios from 'axios';

const addBlog = (blog, token) => {
  return async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/blogs/add`,
      blog,
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

const editBlog = (id, blog, token) => {
  return async () => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URI}/blogs/edit/${id}`,
      {
        title: blog.title,
        body: blog.body,
        tags: blog.tags,
      },
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

const deleteBlog = (blog) => ({
  type: 'DELETE_BLOG',
  blog: blog,
});

const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  blogs,
});

const fetchBlogs = (pageNumber, pageSize) => {
  return async (dispatch) => {
    const blogs = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/blogs`,
      {
        pageNumber,
        pageSize,
      }
    );
    dispatch(setBlogs(blogs.data));
    return blogs.data;
  };
};

const fetchBlogById = (id, token) => {
  return async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/blogs/getById/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    return data;
  };
};

const fetchFollowingBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/blogs/following`,
      {
        headers: { Authorization: token },
      }
    );
    dispatch(setBlogs(blogs.data));
    return blogs.data;
  };
};

export {
  addBlog,
  editBlog,
  deleteBlog,
  fetchBlogs,
  fetchFollowingBlogs,
  fetchBlogById,
  setBlogs,
};
