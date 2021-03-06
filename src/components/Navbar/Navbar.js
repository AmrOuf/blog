import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

import useStyles from './NavbarStyle';

const Navbar = ({ search, history, loggedIn }) => {
  const classes = useStyles();
  const [placeholder, setPlaceholder] = useState('Search...');

  const menuId = 'primary-search-account-menu';

  const searchComponent = (
    <Fragment>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={(e) => handleSubmitSearch(e)}
        />
      </div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.responsive}
        onClick={() => handleChangeFilter(0)}
      >
        all
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.responsive}
        onClick={() => handleChangeFilter(1)}
      >
        users
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.responsive}
        onClick={() => handleChangeFilter(2)}
      >
        title
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.responsive}
        onClick={() => handleChangeFilter(3)}
      >
        tags
      </Button>
    </Fragment>
  );

  const renderSearch = JSON.parse(localStorage.getItem('user'))
    ? searchComponent
    : null;

  const handleChangeFilter = (filter) => {
    search.activeFilter = filter;

    // change placeholder
    switch (filter) {
      case 0:
        setPlaceholder('Search...');
        break;
      case 1:
        setPlaceholder('Search users...');
        break;
      case 2:
        setPlaceholder('Search blogs...');
        break;
      case 3:
        setPlaceholder('Search tags...');
        break;
      default:
        setPlaceholder('Search...');
    }
  };

  const handleSearch = (data) => {
    search.searchQuery = data;
  };

  const handleSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      console.log(search);
      history.replace('/results');
    }
  };

  const profileLink = loggedIn.user
    ? `/profile/${loggedIn.user._id}`
    : '/sign-in';

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.link}>
              BLOG
            </Link>
          </Typography>
          <Typography className={classes.title} variant="body1" noWrap>
            <Link to="/" className={classes.link}>
              HOME
            </Link>
          </Typography>

          <div className={classes.grow} />
          {renderSearch}
          <div className={classes.sectionDesktop}>
            <Link to={profileLink} className={classes.link}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(Navbar);
