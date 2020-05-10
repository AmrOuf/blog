import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { string, object } from 'yup';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { editUser } from '../../actions/users';

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
  },
  submitBtn: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: '16px',
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

const EditProfileForm = ({ users, loggedInUser, editUser }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });

  // this (1) should be the logged in user id
  // const loggedInUser = users.find((user) => user.id === 1);

  const onSubmit = async (user) => {
    const updatedUser = { ...loggedInUser, ...user };
    editUser(loggedInUser.id, updatedUser);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit profile
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit profile"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  name="firstName"
                  variant="standard"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={loggedInUser.firstName}
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
                  defaultValue={loggedInUser.lastName}
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
                  defaultValue={loggedInUser.email}
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

            <Button type="submit" color="primary" className={classes.submitBtn}>
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (id, user) => dispatch(editUser(id, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
