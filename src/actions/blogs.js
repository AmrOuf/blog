import axios from 'axios';

const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  blog: blog,
});

const deleteBlog = (blog) => ({
  type: 'DELETE_BLOG',
  blog: blog,
});

const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  blogs,
});

const fetchBlogs = () => {
  return async (dispatch) => {
    // const blogs = await axios.get('http://localhost:3000/blogs', {
    //   headers: { Authorization: token },
    // });
    const blogs = await axios.get('http://localhost:3000/blogs');
    dispatch(setBlogs(blogs.data));
    return blogs.data;
  };
};

const fetchFollowingBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await axios.get('http://localhost:3000/blogs/following', {
      headers: { Authorization: token },
    });
    // console.log(blogs.data);
    dispatch(setBlogs(blogs.data));
    return blogs.data;
  };
};

export { addBlog, deleteBlog, fetchBlogs, fetchFollowingBlogs, setBlogs };
