import * as React from 'react';
import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingLeft: 0,
      maxHeight: 64,
    },
    subTitle: {
      fontSize: 25,
      maxWidth: 500,
      marginLeft: 70,
      textTransform: 'uppercase',
      color: 'white'
    },
    appBar: {
      height: 100,
      width: `100%`,
      backgroundColor: `#223C6E`,
      top: 50,
      boxShadow: `none`,
      position: 'sticky'
    },
    wrapper: {
      width: `80%`,
      margin: `auto`,
      height: 100,
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      paddingLeft: 70,
      boxShadow: 'none'
    },
    link: {
      color: 'white'
    }
  })
);

const AppPanelForm = () => {
  const classes = useStyles();
  const subTitle: string = `Create Automated Task`;

  return <AppBar className={classes.appBar} /*style={wrapperStyle}*/>
    <Toolbar className={classes.toolbar}>
      <IconButton edge="start" color="inherit" aria-label="Menu" />
      <div className={classes.wrapper}>
        <Typography data-test-id="panelTitle" variant="h6" className={classes.subTitle}>
          <Link to="/" className={classes.link}>
            <ArrowBackIcon
              id="arrowBack"
            />
          </Link>
          {subTitle}
        </Typography>
      </div>
    </Toolbar>
  </AppBar>;
};

export default AppPanelForm;
