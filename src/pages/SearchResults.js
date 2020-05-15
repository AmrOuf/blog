import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import BlogCard from '../components/BlogCard/BlogCard';
import { fetchUsers } from '../actions/search';
import { fetchBlogsByTitle } from '../actions/search';
import { fetchBlogsByTags } from '../actions/search';

const SearchResults = ({
  blogs,
  search,
  history,
  fetchUsers,
  fetchBlogsByTitle,
  fetchBlogsByTags,
}) => {
  const [searchResults, setSearchResults] = useState(null);
  let users = null;
  let fetchedBlogs = null;

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      // console.log(search);
      if (search.activeFilter === 2) {
        fetchedBlogs = await fetchBlogsByTitle(user.token, search.searchQuery);
        const blogList = fetchedBlogs.map((blog) => {
          return (
            <BlogCard
              key={blog._id}
              blog={blog}
              author={blog.author}
            ></BlogCard>
          );
        });
        setSearchResults(blogList);
      } else if (search.activeFilter === 3) {
        fetchedBlogs = await fetchBlogsByTags(user.token, search.searchQuery);
        const blogList = fetchedBlogs.map((blog) => {
          return (
            <BlogCard
              key={blog._id}
              blog={blog}
              author={blog.author}
            ></BlogCard>
          );
        });
        setSearchResults(blogList);
      } else {
        users = await fetchUsers(user.token, search.searchQuery);
        const userList = users.map((user) => {
          return <h1 key={user._id}>{user.firstName}</h1>;
        });
        setSearchResults(userList);
      }
    })();
  }, []);

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

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (token, query) => dispatch(fetchUsers(token, query)),
  fetchBlogsByTitle: (token, query) =>
    dispatch(fetchBlogsByTitle(token, query)),
  fetchBlogsByTags: (token, query) => dispatch(fetchBlogsByTags(token, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
