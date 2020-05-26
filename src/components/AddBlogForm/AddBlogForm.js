import React, { useState } from 'react';
import { connect } from 'react-redux';
import { string, object } from 'yup';
import { DropzoneArea } from 'material-ui-dropzone';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { addBlog } from '../../actions/blogs';

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
  chip: {
    marginLeft: theme.spacing(1),
  },
}));

const AddBlogForm = ({ loggedIn, addBlog, history }) => {
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  const schema = object().shape({
    title: string().required('Blog title is required!'),
    body: string().required('Blog body is required!'),
  });

  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });

  const onSubmit = async (blog) => {
    const newBlog = {
      ...blog,
      tags: [...chipData],
    };

    const savedBlog = await addBlog(newBlog, loggedIn.token);
    console.log(savedBlog);
    history.push('/');
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value.trim() !== '') {
        setChipData([...chipData, e.target.value.toLowerCase()]);
      }
      e.target.value = '';
    }
  };

  const handleFileChange = (files) => {
    const file = files[0];
    const fReader = new FileReader();
    if (file) fReader.readAsDataURL(file);
    fReader.onloadend = () => {
      setImgFile(file);
    };
  };

  const tagList = chipData.map((data) => {
    return (
      <Chip
        key={data}
        label={data.toLowerCase()}
        color="primary"
        onDelete={handleDelete(data)}
        className={classes.chip}
      />
    );
  });

  const renderBlogForm = (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            variant="outlined"
            fullWidth
            id="title"
            label="Blog title"
            error={!!errors.title}
            helperText={errors.title?.message}
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="body"
            variant="outlined"
            fullWidth
            id="body"
            label="Create a blog"
            multiline
            rows={8}
            error={!!errors.body}
            helperText={errors.body?.message}
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="tags"
            variant="outlined"
            fullWidth
            id="tags"
            label="Add some tags!"
            inputRef={register}
            onKeyPress={(e) => handleAddTag(e)}
          />
        </Grid>
        <Grid item xs={12}>
          {tagList}
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
        Add
      </Button>
    </form>
  );

  const blogForm = loggedIn.token ? renderBlogForm : null;

  return <div className={classes.paper}>{blogForm}</div>;
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBlog: (blog, token) => dispatch(addBlog(blog, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogForm);
