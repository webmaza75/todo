import * as React from 'react';
import {
  makeStyles,
  Theme
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    height: 50,
    width: 50,
    backgroundColor: `#000000`,
    fontSize: 12,
    paddingTop: 18
  }
}));


const Logo = () => {
  const classes = useStyles();
  return <div className={classes.logo}>LOGO</div>;
};

export default Logo;
