const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  blog: blog,
});

const deleteBlog = (blog) => ({
  type: 'DELETE_BLOG',
  blog: blog,
});

export { addBlog, deleteBlog };
