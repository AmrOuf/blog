import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { addUser } from '../actions/users';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const schema = object().shape({
  firstName: string().required('First Name is required!'),
  lastName: string().required('Last Name is required!'),
  email: string()
    .lowercase()
    .email('Invalid email address!')
    .required('Email is required!'),
  password: string()
    .min(6, 'Password needs to be at least 6 characters!')
    .required('Password is required!'),
});

const SignUp = ({ history, addUser }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });

  const onSubmit = async (user) => {
    console.log(user);
    addUser({ id: Math.random(), ...user, following: [], followers: 0 });
    history.replace('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="standard"
                fullWidth
                id="firstName"
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                inputRef={register}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formState.isSubmitting}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in" className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
