import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import BlogCard from '../components/BlogCard/BlogCard';
import ProfileBody from '../components/ProfileBody/ProfileBody';

const useStyles = makeStyles((theme) => ({
  pt: {
    paddingTop: theme.spacing(6),
  },
  mt: {
    marginTop: theme.spacing(4),
  },
}));

const Profile = ({ history }) => {
  const classes = useStyles();
  console.log(history);
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container className={classes.pt}>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <ProfileHeader></ProfileHeader>
            <Divider className={classes.mt} variant="middle" />
            <ProfileBody></ProfileBody>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(Profile);
