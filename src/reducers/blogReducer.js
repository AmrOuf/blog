// Dummy data - default is an empty array
// const blogDefaultState = [
//   {
//     id: 1,
//     title: 'Blog Title',
//     body:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     image: 'Bytes representing the image for now',
//     author: 7,
//     tags: ['tag1', 'tag2', 'tag3'],
//   },
//   {
//     id: 2,
//     title: 'Blog Title',
//     body: 'Blog Body which will be a very long string',
//     image: 'Bytes representing the image for now',
//     author: 5,
//     tags: ['tag4', 'tag5', 'tag6'],
//   },
//   {
//     id: 3,
//     title: 'Blog Title',
//     body: 'Blog Body which will be a very long string',
//     image: 'Bytes representing the image for now',
//     author: 7,
//     tags: ['tag4', 'tag5', 'tag6'],
//   },
// ];

const blogDefaultState = [];

const blogReducer = (state = blogDefaultState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      // console.log('action.blogs');
      return [...action.blogs];
    case 'ADD_BLOG':
      return [...state, action.blog];
    case 'EDIT_BLOG':
      // get the blog by id and edit
      return state;
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.blog.id);
    default:
      return state;
  }
};

export default blogReducer;
