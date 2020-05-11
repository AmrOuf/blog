import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';

import BlogCard from '../BlogCard/BlogCard';

// const useStyles = makeStyles((theme) => ({
//   center: {
//     textAlign: 'center',
//   },
// }));

const BlogFeed = ({ loggedIn, blogs }) => {
  // const classes = useStyles();

  // console.log(blogs);

  const blogList = blogs.map((blog) => {
    return (
      <BlogCard key={blog._id} blog={blog} author={blog.author}></BlogCard>
    );
  });

  return <Fragment>{blogList}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(BlogFeed);
