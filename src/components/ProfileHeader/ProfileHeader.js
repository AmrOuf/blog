import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  center: {
    textAlign: 'center',
  },
  mb: {
    marginBottom: theme.spacing(3),
  },
}));

const ProfileHeader = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container className={classes.center}>
        <Grid item xs={6} className={classes.mb}>
          <Typography variant="h4">Amr Ouf</Typography>
        </Grid>
        <Grid item xs={6} className={classes.mb}>
          <Button variant="outlined" color="primary">
            Edit profile
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            8
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Posts
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            108
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Followers
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            142
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Following
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfileHeader;
