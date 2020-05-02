import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import BlogCard from '../BlogCard/BlogCard';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
}));

const ProfileBody = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <BlogCard></BlogCard>
      <BlogCard></BlogCard>
    </Fragment>
  );
};

export default ProfileBody;
