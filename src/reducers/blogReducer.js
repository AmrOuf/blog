// Dummy data - default is an empty array
const blogDefaultState = [
  {
    id: 1,
    title: 'Blog Title',
    body: 'Blog Body which will be a very long string',
    image: 'Bytes representing the image for now',
    author: 5,
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: 2,
    title: 'Blog Title',
    body: 'Blog Body which will be a very long string',
    image: 'Bytes representing the image for now',
    author: 7,
    tags: ['tag4', 'tag5', 'tag6'],
  },
];

const blogReducer = (state = blogDefaultState, action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.blog);
    case 'EDIT_BLOG':
      // get the blog by id and edit
      return state;
    case 'DELETE_BLOG':
      // filter state by action.id (do not mutate)
      return state;
    default:
      return state;
  }
};

export default blogReducer;
