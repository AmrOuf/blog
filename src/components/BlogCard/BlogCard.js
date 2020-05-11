import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { deleteBlog } from '../../actions/blogs';
import { deleteBlogFromUser } from '../../actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const BlogCard = ({
  blog,
  loggedIn,
  author,
  deleteBlog,
  deleteBlogFromUser,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [authorState, setAuthorState] = useState(author);
  const [blogState, setBlogState] = useState(blog);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDelete = async () => {
    // make an action to delete from state

    // console.log(loggedIn);
    // shouldn't loggedIn state be updated by now?

    axios
      .delete(`http://localhost:3000/blogs/delete/${blog._id}`, {
        headers: { Authorization: loggedIn.token },
      })
      .then(() => {
        deleteBlogFromUser(blog._id);
        const blogArray = loggedIn.blogs.filter(
          (currentBlog) => currentBlog._id !== blog._id
        );
        const loggedInTmp = {
          ...loggedIn,
          token: loggedIn.token,
          user: loggedIn.user,
          blogs: blogArray,
        };
        console.log(loggedInTmp);
        localStorage.setItem('user', JSON.stringify(loggedInTmp));
      });
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <EditOutlinedIcon />
        </IconButton>
        <p>Edit</p>
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <DeleteOutlinedIcon />
        </IconButton>
        <p>Delete</p>
      </MenuItem>
    </Menu>
  );

  let optionsMenu = null;

  if (loggedIn.user && loggedIn.user._id === author._id) {
    optionsMenu = (
      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {authorState.firstName[0]}
          </Avatar>
        }
        action={optionsMenu}
        title={blogState.title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {blogState.body}
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image="/images/paella.jpg"
        title="Paella dish"
      />
      {renderMobileMenu}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBlog: (blog) => dispatch(deleteBlog(blog)),
    deleteBlogFromUser: (id) => dispatch(deleteBlogFromUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard);
