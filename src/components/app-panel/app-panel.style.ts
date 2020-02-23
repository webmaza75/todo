
import {cyan} from '@material-ui/core/colors';
import {
    makeStyles,
    createStyles,
    Theme
  } from '@material-ui/core/styles';

export const appPanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingLeft: 0,
      maxHeight: 50,
    },
    subTitle: {
      fontSize: 25,
      maxWidth: 500,
      marginLeft: 70,
      textTransform: 'uppercase'
    },
    appBar: {
      height: 100,
      width: `100%`,
      backgroundColor: `#223C6E`,
      top: 50,
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.32)`
    },
    appBarWithSelect: {
      backgroundColor: cyan[100],
      color: `#333333`
    },
    search: {
      position: 'relative',
      marginLeft: 0,
      maxWidth: 300,
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
      position: 'absolute',
      zIndex: 1,
      top: 70,
      left: `15%`
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
    },
    wrapper: {
      width: `80%`,
      margin: `auto`,
      height: 100,
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      paddingLeft: 70
    }
  })
);
