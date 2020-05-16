import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../components/Navbar/Navbar';
import EditBlogForm from '../components/EditBlogForm/EditBlogForm';

const useStyles = makeStyles((theme) => ({}));

const EditBlog = ({ history, match }) => {
  const classes = useStyles();
  const blogId = match.params.blogId;

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container>
        <EditBlogForm history={history} blogId={blogId}></EditBlogForm>
      </Container>
    </Fragment>
  );
};

export default EditBlog;
