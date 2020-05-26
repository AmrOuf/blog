const blogDefaultState = [];

const blogReducer = (state = blogDefaultState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return [...action.blogs];
    case 'ADD_BLOG':
      return [...state, action.blog];
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    default:
      return state;
  }
};

export default blogReducer;
