import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import BlogCard from '../BlogCard/BlogCard';
import { fetchBlogs } from '../../actions/blogs';

// const useStyles = makeStyles((theme) => ({
//   center: {
//     textAlign: 'center',
//   },
// }));

const BlogFeed = ({
  loggedIn,
  blogs,
  pageNumber,
  pageSize,
  history,
  fetchBlogs,
}) => {
  // const classes = useStyles();

  const [page, setPage] = useState(pageNumber);

  const blogList = blogs.map((blog) => {
    return (
      <BlogCard key={blog._id} blog={blog} author={blog.author}></BlogCard>
    );
  });

  const handleChange = async (event, value) => {
    setPage(value);
    history.replace(`/${value}`);
    await fetchBlogs(value - 1, pageSize);
  };

  return (
    <Fragment>
      {blogList}
      <Pagination
        count={2}
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchBlogs: (pageNumber, pageSize) =>
    dispatch(fetchBlogs(pageNumber, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFeed);
