import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';

import Chip from '@material-ui/core/Chip';
import { red } from '@material-ui/core/colors';

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

const BlogCard = ({ blog, loggedIn, author, history }) => {
  const classes = useStyles();
  const [authorState, setAuthorState] = useState(author);
  const [blogState, setBlogState] = useState(blog);
  const [chipData, setChipData] = React.useState([...blog.tags]);

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
          <Avatar aria-label="recipe" className={classes.avatar}>
            {firstName}
          </Avatar>
        }
        title={title}
        subheader={date}
        onClick={goToBlog}
        className={classes.pointer}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {blogBody}
        </Typography>
      </CardContent>

      {tagList}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(BlogCard);
