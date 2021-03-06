import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../components/Navbar/Navbar';
import AddBlogForm from '../components/AddBlogForm/AddBlogForm';

const useStyles = makeStyles((theme) => ({}));

const AddBlog = ({ history }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container>
        <AddBlogForm history={history}></AddBlogForm>
      </Container>
    </Fragment>
  );
};

export default AddBlog;
