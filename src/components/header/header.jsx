import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import Fab from '@material-ui/core/Fab';

import Logo from '../logo/logo.jsx';
import AppTable from '../app-table/app-table.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    paddingLeft: 0,
    maxHeight: 50
  },
  menuButton: {
    marginRight: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0
  },
  title: {
    flexGrow: 1,
    fontSize: `20px`
  },
  subTitle: {
    flexGrow: 1,
    fontSize: `25px`,
    marginLeft: `30%`
  },
  navBar: {
    position: `fixed`,
    height: 50,
    width: `100%`,
    backgroundColor: `#192F57`
  },
  appBar: {
    height: 100,
    width: `100%`,
    backgroundColor: `#223C6E`,
    top: 50,
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.32)`
  },
  search: {
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    color: `#9E9E9E`
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 7),
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     width: 120,
  //     // '&:focus': {
  //     //   width: 200,
  //     // },
  //   },
  // },
  fabButton: {
    position: 'fixed',
    zIndex: 1,
    top: 120,
    left: `25%`,
    right: 0
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const title = `Payload Monitoring`.toUpperCase();
const subTitle = `Automated Tasks`.toUpperCase();

const Header = () => {
  const classes = useStyles();

  return <div className={classes.root}>
    <AppBar className={classes.navBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
          <Logo />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Button color="inherit">Login</Button>
        <IconButton edge="end" color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
        </IconButton>
        <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
        <Typography variant="h6" className={classes.subTitle}>
          {subTitle}
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
          />
        </div>
      </Toolbar>
    </AppBar>
    <AppTable />
  </div>
};

export default Header;
