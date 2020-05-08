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
    const blogs = await axios.get('http://localhost:3000/blogs');
    // console.log(blogs.data);
    dispatch(setBlogs(blogs.data));
  };
};

export { addBlog, deleteBlog, fetchBlogs };
