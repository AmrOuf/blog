import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import useStyles from './NavbarStyle';
import { setFilter } from '../../actions/search';

const Navbar = ({ search, setFilter, history, loggedIn }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [placeholder, setPlaceholder] = useState('Search...');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

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
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
        className={classes.mr}
        onClick={() => handleChangeFilter(0)}
      >
        all
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.mr}
        onClick={() => handleChangeFilter(1)}
      >
        users
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.mr}
        onClick={() => handleChangeFilter(2)}
      >
        title
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.mr}
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
    // setFilter(filter);
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

  const handleProfileClick = () => {
    // if (loggedIn.user) {
    //   history.replace(`/profile/${loggedIn.user._id}`);
    // } else {
    //   history.replace('/sign-in');
    // }
  };

  const profileLink = loggedIn.user
    ? `/profile/${loggedIn.user._id}`
    : '/sign-in';

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/1" className={classes.link}>
              BLOG
            </Link>
          </Typography>
          {renderSearch}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to={profileLink} className={classes.link}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileClick}
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

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter) => dispatch(setFilter(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
