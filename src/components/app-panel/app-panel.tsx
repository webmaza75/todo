import * as React from 'react';
import {
  fade,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      paddingLeft: 0,
      maxHeight: 50
    },
    subTitle: {
      flexGrow: 1,
      fontSize: 25,
      marginLeft: `30%`,
      textTransform: 'uppercase'
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
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      color: `#9E9E9E`
    },
    searchIcon: {
      width: 24,
      height: 24,
      color: `#FFFFFF`
    },
    fabButton: {
      position: 'fixed',
      zIndex: 1,
      top: 120,
      left: `15%`,
      right: 0
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      height: 24,
      width: 200,
      focused: {
        color: `#FFFFFF`
      }
    },
    inputField: {
      color: `#FFFFFF`
    },
    underline: {
      '&:before': {
        borderBottomColor: `transparent`
      },
      '&:after': {
        borderBottomColor: `transparent`
      },
      '&:focus-within': {
        '&:after': {
          borderBottomColor: `#FFFFFF`
        },
        color: `#FFFFFF`
      },
      '&:hover': {
        '&:not': {
          '&:before': {
            borderBottomColor: `#FFFFFF`
          },
        },
        '&:after': {
          borderBottomColor: `#FFFFFF`
        }
      },
    }
  })
);

const subTitle: string = `Automated Tasks`;

const AppPanel = () => {
  const classes = useStyles();

  return <AppBar className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <IconButton edge="start" color="inherit" aria-label="Menu">
      </IconButton>
      <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
        <AddIcon />
      </Fab>
      <Typography variant="h6" className={classes.subTitle}>
        {subTitle}
      </Typography>
      <div className={classes.search}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon className={classes.searchIcon} />
          </Grid>
          <Grid item>
            <TextField id="standard-search"
              type="search"
              className={classes.textField}
              margin="normal"
              InputProps={{classes: {input: classes.inputField, underline: classes.underline}}}
            />
          </Grid>
        </Grid>
      </div>
    </Toolbar>
  </AppBar>;
};

export default AppPanel;
