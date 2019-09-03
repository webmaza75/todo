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
import {cyan} from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

import SimpleSnackbar from '../simple-snackbar/simple-snackbar';
import ConfirmationDeleteDialog from '../confirmation-delete-dialog/confirmation-delete-dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
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

/**
 * @prop {number[]} selected Выбранные задачи в списке.
 * @prop {string} searchTitle Название задачи для поиска.
 * @prop {Function} onInputChange callback изменения строки поиска.
 * @prop {Function} onSelectionReset callback на сброс выделения задач из списка.
 * @prop {Function} onItemsUndoDelete callback на восстановление удаленных задач из списка.
 * @prop {boolean} isOpenConfirmDeleteDialog Флаг открытия окна подтверждения удаления задачи.
 * @prop {Function} onTasksCancelDelete callback на отмену удаления задачи.
 * @prop {Function} onTasksConfirmDelete callback на подтверждение удаления задачи.
 * @prop {boolean} isOpenUndoDeleteSnackbar Флаг открытия snackbar для возможности восстановления ранее удаленных задач.
 * @prop {Function} onItemsExactlyDelete callback на закрытие snackbar.
 * @prop {Function} onItemsUndoDelete callback на восстановление удаленых задач.
 * @prop {Function} onToggleTaskForm callback на открытие формы добавления задачи.
 * @prop {boolean} isTaskFormOpen Флаг открытия формы добавления задачи.
 */
interface IProps {
  selected: number[];
  searchTitle: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionReset: () => void;
  onItemsDelete: () => void;
  isOpenConfirmDeleteDialog: boolean;
  onTasksCancelDelete: () => void;
  onTasksConfirmDelete: () => void;
  isOpenUndoDeleteSnackbar: boolean;
  onItemsExactlyDelete: () => void;
  onItemsUndoDelete: () => void;
  onToggleTaskForm: () => void;
  isTaskFormOpen: boolean;
}

const subTitleList = {
  list: `Automated Tasks`,
  select: `Selected`,
  add: `Create Automated Task`
};

function getSubTitle(isTaskFormOpen: boolean, selected: number[]) : string {
  if (isTaskFormOpen) {
    return subTitleList.add;
  }
  const subTitle: string = !selected.length ? subTitleList.list : `${selected.length} ${subTitleList.select}`;
  return subTitle;
}

const AppPanel = (props: IProps) => {
  const {
    selected,
    onSelectionReset,
    onItemsDelete,
    searchTitle,
    onInputChange,
    isOpenConfirmDeleteDialog,
    onTasksCancelDelete,
    onTasksConfirmDelete,
    isOpenUndoDeleteSnackbar,
    onItemsExactlyDelete,
    onItemsUndoDelete,
    onToggleTaskForm,
    isTaskFormOpen
  } = props;
  
  const classes = useStyles();
  const appBarClassName = !selected.length ? classes.appBar : `${classes.appBar} ${classes.appBarWithSelect}`;
  const subTitle: string = getSubTitle(isTaskFormOpen, selected);
  const wrapperStyle = isTaskFormOpen ? {boxShadow: 'none'} : {};

  return <AppBar className={appBarClassName} style={wrapperStyle}>
    <Toolbar className={classes.toolbar}>
      <IconButton edge="start" color="inherit" aria-label="Menu">
      </IconButton>
      {
        selected.length === 0 && !isTaskFormOpen &&
          <Link to="/add/">
            <Fab color="secondary"
              aria-label="Add"
              className={classes.fabButton}
              id="addIcon"
              onClick={onToggleTaskForm}
            >
              <AddIcon />
            </Fab>
          </Link>
      }
      <div className={classes.wrapper}>
        <Typography data-test-id="panelTitle" variant="h6" className={classes.subTitle}>
          {
            selected.length > 0 &&
              <ClearIcon
                id="clearIcon"
                onClick={onSelectionReset}
              />

          }
          {
            isTaskFormOpen &&
              <Link to="/">
                <ArrowBackIcon
                  id="arrowBack"
                  onClick={onToggleTaskForm}
                />
              </Link>
          }
          {subTitle}
        </Typography>
        {
          selected.length === 0 && !isTaskFormOpen &&
            <div className={classes.search}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <SearchIcon
                    className={classes.searchIcon}
                  />
                </Grid>
                <Grid item>
                  <TextField id="standard-search"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    InputProps={{classes: {input: classes.inputField, underline: classes.underline}}}
                    value={searchTitle}
                    onChange={onInputChange}
                  />
                </Grid>
              </Grid>
            </div>
        }
        {
          selected.length > 0 &&
            <div style={{display: `flex`}}>
              {selected.length === 1 && <EditIcon id="editIcon" />}
              <DeleteIcon
                id="deleteIcon"
                onClick={onItemsDelete}
              />
            </div>
        }
      </div>
    </Toolbar>
    <ConfirmationDeleteDialog
      open={isOpenConfirmDeleteDialog}
      onTasksCancelDelete={onTasksCancelDelete}
      onTasksConfirmDelete={onTasksConfirmDelete}
    />
    <SimpleSnackbar
      isOpenUndoDeleteSnackbar={isOpenUndoDeleteSnackbar}
      onItemsExactlyDelete={onItemsExactlyDelete}
      onItemsUndoDelete={onItemsUndoDelete}
    />
  </AppBar>;
};

export default AppPanel;
