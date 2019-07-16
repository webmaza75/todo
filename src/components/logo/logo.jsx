import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    height: `50px`,
    width: `50px`,
    backgroundColor: `#000000`,
    fontSize: `12px`,
    padding: 0
  }
}));


const Logo = () => {
  const classes = useStyles();
  return <div className={classes.logo}>LOGO</div>;
};

export default Logo;
