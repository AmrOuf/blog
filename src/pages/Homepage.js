import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';

import Navbar from '../components/Navbar/Navbar';
import BlogCard from '../components/BlogCard/BlogCard';

const Homepage = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container>
        <BlogCard></BlogCard>
      </Container>
    </Fragment>
  );
};

export default Homepage;
