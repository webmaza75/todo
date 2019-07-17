import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    height: 50,
    width: 50,
    backgroundColor: `#000000`,
    fontSize: 12,
    padding: 0
  }
}));


const Logo = () => {
  const classes = useStyles();
  return <div className={classes.logo}>LOGO</div>;
};

export default Logo;
