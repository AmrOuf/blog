import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import { deleteBlog, fetchBlogs } from '../actions/blogs';
import { setBlogs } from '../actions/blogs';
import { deleteBlogFromUser } from '../actions/users';
import { fetchBlogById } from '../actions/blogs';
import { Chip, Menu, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  justify: {
    textAlign: 'justify',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  userControls: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const BlogDetails = ({
  loggedIn,
  match,
  fetchBlogById,
  history,
  deleteBlog,
  deleteBlogFromUser,
}) => {
  const classes = useStyles();
  const id = match.params.id;
  const [blog, setBlog] = useState(null);

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

  const handleEdit = () => {
    history.push(`/edit-blog/${blog._id}`);
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URI}/blogs/delete/${blog._id}`, {
        headers: { Authorization: loggedIn.token },
      })
      .then(async () => {
        deleteBlogFromUser(blog._id);
        const blogArray = loggedIn.blogs.filter(
          (currentBlog) => currentBlog._id !== blog._id
        );
        const loggedInTmp = {
          ...loggedIn,
          token: loggedIn.token,
          user: loggedIn.user,
          blogs: blogArray,
        };
        localStorage.setItem('user', JSON.stringify(loggedInTmp));
        history.push('/');
      });
  };

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container className={classes.justify}>
        <Paper className={classes.paper}>
          {loggedIn.user && blog && loggedIn.user._id === blog.author._id && (
            <div className={classes.userControls}>
              <IconButton color="inherit" onClick={handleEdit}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleDelete}>
                <DeleteOutlinedIcon />
              </IconButton>
            </div>
          )}
          <h1>{loggedIn.user && blog && blog.title}</h1>
          <p>{loggedIn.user && blog && blog.body}</p>
          {tagList}
          <Divider></Divider>
          <p>
            <span>Author: </span>
            <Link to={`/profile/${blog && blog.author._id}`}>
              {blog && blog.author.firstName} {blog && blog.author.lastName}
            </Link>
          </p>
        </Paper>
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
  fetchBlogById: (id, token) => dispatch(fetchBlogById(id, token)),
  deleteBlog: (blog) => dispatch(deleteBlog(blog)),
  deleteBlogFromUser: (id) => dispatch(deleteBlogFromUser(id)),
  setBlogs: (blogs) => dispatch(setBlogs(blogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
