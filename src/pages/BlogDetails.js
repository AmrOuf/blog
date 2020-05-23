import React, { Fragment, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';

import Navbar from '../components/Navbar/Navbar';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import ProfileBody from '../components/ProfileBody/ProfileBody';
import { fetchUser } from '../actions/users';
import { fetchBlogById } from '../actions/blogs';
import { Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  // pt: {
  //   paddingTop: theme.spacing(6),
  // },
  // mt: {
  //   marginTop: theme.spacing(4),
  // },
  chip: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  justify: {
    textAlign: 'justify',
  },
}));

const BlogDetails = ({ loggedIn, match, fetchBlogById, history }) => {
  const classes = useStyles();
  const id = match.params.id;
  const [blog, setBlog] = useState(null);

  // console.log(loggedIn)

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const oneBlog = await fetchBlogById(id, user.token);
      setBlog(oneBlog);
    })();
  }, []);

  const tagList =
    loggedIn.user &&
    blog &&
    blog.tags.map((data) => {
      return (
        <Chip
          key={data}
          label={data.toLowerCase()}
          color="primary"
          className={classes.chip}
        />
      );
    });

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container className={classes.justify}>
        <h1>{loggedIn.user && blog && blog.title}</h1>
        <p>{loggedIn.user && blog && blog.body}</p>
        {tagList}
        <p>
          <span>Author: </span>
          <Link to={`/profile/${blog && blog.author._id}`}>
            {blog && blog.author.firstName} {blog && blog.author.lastName}
          </Link>
        </p>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // fetchBlogs: (token) => dispatch(fetchBlogs(token)),
  fetchBlogById: (id, token) => dispatch(fetchBlogById(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
