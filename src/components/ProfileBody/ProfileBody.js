import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import BlogCard from '../BlogCard/BlogCard';
import { setBlogs } from '../../actions/blogs';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
}));

const ProfileBody = ({ viewedUser, setBlogs, blogs, loggedIn }) => {
  // const classes = useStyles();

  // console.log(viewedUser.blogs);
  // useEffect(() => {
  //   (() => {
  //     setBlogs(viewedUser.blogs);
  //   })();
  // }, []);

  // console.log(loggedIn);
  // console.log(viewedUser);

  let blogList = null;

  if (loggedIn.user && viewedUser.user) {
    if (loggedIn.user._id === viewedUser.user._id) {
      blogList = loggedIn.blogs.map((blog) => {
        return (
          <BlogCard
            key={blog._id}
            blog={blog}
            author={loggedIn.user}
          ></BlogCard>
        );
      });
    } else {
      // this should mean it's not my profile
      blogList = viewedUser.blogs.map((blog) => {
        return (
          <BlogCard
            key={blog._id}
            blog={blog}
            author={viewedUser.user}
          ></BlogCard>
        );
      });
    }
  }

  // const blogList = viewedUser.blogs.map((blog) => {
  //   return (
  //     <BlogCard key={blog._id} blog={blog} author={viewedUser.user}></BlogCard>
  //   );
  // });

  return <Fragment>{blogList}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setBlogs: (blogs) => dispatch(setBlogs(blogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBody);
