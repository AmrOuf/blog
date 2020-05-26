import React, { Fragment } from 'react';

import Container from '@material-ui/core/Container';

import Navbar from '../components/Navbar/Navbar';
import EditBlogForm from '../components/EditBlogForm/EditBlogForm';

const EditBlog = ({ history, match }) => {
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
