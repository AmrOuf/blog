const blogDefaultState = [];

const blogReducer = (state = blogDefaultState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      console.log(state);
      console.log(action.blogs);
      return [...action.blogs];
    case 'ADD_BLOG':
      return [...state, action.blog];
    case 'EDIT_BLOG':
      // get the blog by id and edit
      return state;
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    default:
      return state;
  }
};

export default blogReducer;
