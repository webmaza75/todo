import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

import SimpleSnackbar from '../simple-snackbar/simple-snackbar';
import ConfirmationDeleteDialog from '../confirmation-delete-dialog/confirmation-delete-dialog';
import {appPanelStyles as useAppPanelStyles} from './app-panel.style';

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

function getSubTitle(isTaskFormOpen: boolean, selected: number[]): string {
  if (isTaskFormOpen) {
    return subTitleList.add;
  }

  return !selected.length ? subTitleList.list : `${selected.length} ${subTitleList.select}`;
}

/**
 * Рендерит кнопку Add
 *
 * @param {IProps} props Свойства компонента AppPanel.
 * @param {any} classes Стили компонента AppPanel.
 */
const renderAddButton = (props: IProps, classes: any) => {
  const {onToggleTaskForm} = props;

  return (
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
  )
};

/**
 * Рендерит кнопку Clear
 *
 * @param {IProps} props Свойства компонента AppPanel.
 */
const renderClearButton = (props: IProps) => {
  return <ClearIcon id="clearIcon" onClick={props.onSelectionReset} />;
};

/**
 * Рендерит кнопку (стрелку) Назад в режиме создания/редактирования задачи
 *
 * @param {IProps} props Свойства компонента AppPanel.
 */
const renderBackArrowButton = (props: IProps) => {
  const {onToggleTaskForm} = props;

  return (
    <Link to="/">
      <ArrowBackIcon
        id="arrowBack"
        onClick={onToggleTaskForm}
      />
    </Link>
  );
};

/**
 * Рендерит строку поиска с иконкой
 *
 * @param {IProps} props Свойства компонента AppPanel.
 * @param {any} classes Стили компонента AppPanel.
 */
const renderSearchBlock = (props: IProps, classes: any) => {
  const {searchTitle, onInputChange} = props;

  return (
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
  );
};

/**
 * Рендерит кнопку удаления и редактирования (если выбран только 1 элемент)
 *
 * @param {IProps} props Свойства компонента AppPanel.
 */
const renderDeleteOrEditButton = (props: IProps) => {
  const {selected, onItemsDelete} = props;

  return (
    <div style={{display: `flex`}}>
      {selected.length === 1 && <EditIcon id="editIcon" />}
      <DeleteIcon
        id="deleteIcon"
        onClick={onItemsDelete}
      />
    </div>
  );
};

/**
 * Компонент основной панели приложения (содержит возможные действия).
 */
const AppPanel = (props: IProps) => {
  const {
    selected,
    isOpenConfirmDeleteDialog,
    onTasksCancelDelete,
    onTasksConfirmDelete,
    isOpenUndoDeleteSnackbar,
    onItemsExactlyDelete,
    onItemsUndoDelete,
    isTaskFormOpen
  } = props;
  
  const classes = useAppPanelStyles();
  const appBarClassName = !selected.length ? classes.appBar : `${classes.appBar} ${classes.appBarWithSelect}`;
  const wrapperStyle = isTaskFormOpen ? {boxShadow: 'none'} : {};
  const isSelectionMode = selected.length > 0;
  const isStandartMode = !isSelectionMode && !isTaskFormOpen;

  return <AppBar className={appBarClassName} style={wrapperStyle}>
    <Toolbar className={classes.toolbar}>
      <IconButton edge="start" color="inherit" aria-label="Menu" />
      {isStandartMode && renderAddButton(props, classes)}
      <div className={classes.wrapper}>
        <Typography data-test-id="panelTitle" variant="h6" className={classes.subTitle}>
          {isSelectionMode && renderClearButton(props)}
          {isTaskFormOpen && renderBackArrowButton(props)}
          {getSubTitle(isTaskFormOpen, selected)}
        </Typography>
        {isStandartMode && renderSearchBlock(props, classes)}
        {isSelectionMode && renderDeleteOrEditButton(props)}
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
