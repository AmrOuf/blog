import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import BlogCard from '../components/BlogCard/BlogCard';

const SearchResults = ({ users, blogs, search, history }) => {
  let searchResults;

  const blogList = blogs.map((blog) => {
    return <BlogCard key={blog.id} blog={blog}></BlogCard>;
  });

  const userList = users.map((user) => {
    return <h1 key={user.id}>{user.firstName}</h1>;
  });

  switch (search.activeFilter) {
    case 0:
    case 1:
      searchResults = userList;
      break;
    case 2:
    case 3:
      searchResults = blogList;
      break;
    default:
      searchResults = userList;
  }

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      {searchResults}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs,
    search: state.search,
  };
};

export default connect(mapStateToProps)(SearchResults);
