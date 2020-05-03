const searchDefaultState = {
  activeFilter: 0, // 0 => all (users, default), 1 => users, 2 => blogs, 3 => tags
  searchQuery: '',
};

const searchReducer = (state = searchDefaultState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, activeFilter: action.activeFilter };
    case 'SET_QUERY':
      return { ...state, searchQuery: action.searchQuery };
    default:
      return state;
  }
};

export default searchReducer;
