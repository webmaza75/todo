import * as React from 'react';
import {
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

import Logo from '../logo/logo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,

  },
  toolbar: {
    paddingLeft: 0,
    maxHeight: 50,
    minHeight: 50
  },
  menuButton: {
    marginRight: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0
  },
  title: {
    flexGrow: 1,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  navBar: {
    position: `sticky`,
    height: 50,
    width: `100%`,
    backgroundColor: `#192F57`
  }
}));

const title = `Payload Monitoring`;

const Navbar = () => {
  const classes = useStyles();

  return <AppBar className={classes.navBar}>
    <Toolbar className={classes.toolbar}>
      <IconButton edge="start" className={classes.menuButton} color="inherit">
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
};

export default Navbar;
