const loggedInDefaultState = {};

const loggedInReducer = (state = loggedInDefaultState, action) => {
  switch (action.type) {
    case 'SET_LOGGEDIN_USER':
      return action.data;
    case 'DELETE_BLOG':
      // console.log('about to delete from reducer...');
      const blogArray = state.blogs.filter((blog) => blog._id !== action.id);
      console.log(blogArray);
      console.log({
        ...state,
        token: state.token,
        user: state.user,
        blogs: blogArray,
      });
      return {
        ...state,
        token: state.token,
        user: state.user,
        blogs: blogArray,
      };
    default:
      return state;
  }
};

export default loggedInReducer;
