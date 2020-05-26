import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import BlogCard from '../BlogCard/BlogCard';
import { fetchBlogs } from '../../actions/blogs';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const BlogFeed = ({
  loggedIn,
  blogs,
  pageNumber,
  pageSize,
  history,
  fetchBlogs,
  isInHomepage,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(pageNumber);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/blogs/count`
      );
      setPageCount(Math.ceil(data.count / pageSize));
      await fetchBlogs(pageNumber - 1, pageSize);
    })();
  }, []);

  const blogList = blogs.map((blog) => {
    return (
      <BlogCard
        key={blog._id}
        blog={blog}
        author={blog.author}
        history={history}
      ></BlogCard>
    );
  });

  const handleChange = async (event, value) => {
    setPage(value);
    // history.replace(`/${value}`);
    await fetchBlogs(value - 1, pageSize);
  };

  return (
    <Fragment>
      {blogList}
      {isInHomepage && (
        <Pagination
          count={pageCount}
          color="primary"
          page={page}
          onChange={handleChange}
          className={classes.pagination}
        />
      )}
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
