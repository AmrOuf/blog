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
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { deleteBlog, fetchBlogs } from '../../actions/blogs';
import { setBlogs } from '../../actions/blogs';
import { deleteBlogFromUser } from '../../actions/users';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
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
    cursor: 'pointer',
  },
  chip: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const BlogCard = ({
  blog,
  loggedIn,
  author,
  history,
  deleteBlog,
  deleteBlogFromUser,
  setBlogs,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [authorState, setAuthorState] = useState(author);
  const [blogState, setBlogState] = useState(blog);
  const [chipData, setChipData] = React.useState([...blog.tags]);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleEdit = async () => {
    // console.log(blog._id);
    history.replace(`/edit-blog/${blog._id}`);
  };

  const handleDelete = async () => {
    axios
      .delete(`http://localhost:3000/blogs/delete/${blog._id}`, {
        headers: { Authorization: loggedIn.token },
      })
      .then(async () => {
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
        // console.log(blogArray);
        // await fetchBlogs(0, 5);
        // setBlogs(loggedInTmp.blogs);
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
      <MenuItem onClick={handleEdit}>
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

  let tagList = null;
  if (chipData.length > 0 && chipData[0].length > 0) {
    tagList = chipData.map((data) => {
      return (
        <Chip
          key={data}
          label={data.toLowerCase()}
          color="primary"
          className={classes.chip}
        />
      );
    });
  }

  const goToBlog = () => {
    if (loggedIn.user) {
      history.push(`/blog-details/${blog._id}`);
    }
  };

  const d = new Date(blog.createdAt);
  const date = `${d.getDate()} - ${d.getMonth() + 1} - ${d.getFullYear()}`;

  let firstName = 'A';
  let title = '';
  let blogBody = '';
  if (authorState.firstName) {
    firstName = authorState.firstName[0];
    if (blogState.title.length >= 25)
      title = `${blogState.title.substring(0, 25)}...`;
    else title = blogState.title;

    if (blogState.body.length >= 300)
      blogBody = `${blogState.body.substring(0, 300)}...`;
    else blogBody = blogState.body;
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            onClick={goToBlog}
          >
            {firstName}
          </Avatar>
        }
        action={optionsMenu}
        title={title}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {blogBody}
        </Typography>
      </CardContent>
      {/* <CardMedia
        className={classes.media}
        image={blog.image}
        title="Blog image"
      />
      <Box
        component="img"
        display="block"
        boxShadow={2}
        src={`${blog.image}`}
      ></Box>

      <img src={`http://localhost:3001/${blog.image}`} />
      <img
        src={`http://localhost:3001/public/uploads/image-1589803706239.png`}
      /> */}

      {tagList}

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
    setBlogs: (blogs) => dispatch(setBlogs(blogs)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard);
