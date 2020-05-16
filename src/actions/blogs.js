import axios from 'axios';

const addBlog = (blog, token) => {
  return async () => {
    const savedBlog = await axios.post(
      'http://localhost:3000/blogs/add',
      {
        title: blog.title,
        body: blog.body,
        tags: blog.tags,
      },
      {
        headers: { Authorization: token },
      }
    );
    console.log(savedBlog);
    // dispatch(setBlogs(blogs.data));
    return savedBlog;
  };
};

const editBlog = (id, blog, token) => {
  return async () => {
    const { data } = await axios.patch(
      `http://localhost:3000/blogs/edit/${id}`,
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
    // const blogs = await axios.get('http://localhost:3000/blogs', {
    //   headers: { Authorization: token },
    // });
    const blogs = await axios.post('http://localhost:3000/blogs', {
      pageNumber,
      pageSize,
    });
    dispatch(setBlogs(blogs.data));
    return blogs.data;
  };
};

const fetchBlogById = (id, token) => {
  return async () => {
    const { data } = await axios.get(
      `http://localhost:3000/blogs/getById/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    return data;
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

export {
  addBlog,
  editBlog,
  deleteBlog,
  fetchBlogs,
  fetchFollowingBlogs,
  fetchBlogById,
  setBlogs,
};
