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
import {Link} from 'react-router-dom';

import {appPanelStyles as useAppPanelStyles} from './app-panel.style';

/**
 * @prop {number[]} selected Выбранные задачи в списке.
 * @prop {string} searchTitle Название задачи для поиска.
 * @prop {Function} onInputChange callback изменения строки поиска.
 * @prop {Function} onSelectionReset callback на сброс выделения задач из списка.
 * @prop {Function} onItemsDelete callback на удаление задач.
 */
interface IProps {
  selected: number[];
  searchTitle: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionReset: () => void;
  onItemsDelete: () => void;
}

const subTitleList = {
  list: `Automated Tasks`,
  select: `Selected`,
};

function getSubTitle(selected: number[]): string {
  return !selected.length ? subTitleList.list : `${selected.length} ${subTitleList.select}`;
}

/**
 * Компонент с кнопкой Add
 *
 * @param {any} props Свойства компонента AppPanel и его стили.
 */
const AddButton = (props: any) => {
  const {classes} = props;

  return (
    <Link to="/add/">
      <Fab color="secondary"
        aria-label="Add"
        className={classes.fabButton}
        id="addIcon"
      >
        <AddIcon />
      </Fab>
    </Link>
  )
};

/**
 * Компонент с кнопкой Clear
 *
 * @param {IProps} appPanelProps Свойства компонента AppPanel.
 */
const ClearButton = (props: IProps) => {
  return <ClearIcon id="clearIcon" onClick={props.onSelectionReset} />;
};

/**
 * Компонент со строкой поиска с иконкой
 *
 * @param {any} props Свойства компонента AppPanel и его стили.
 */
const SearchBlock = (props: any) => {
  const {appPanelProps: {searchTitle, onInputChange}, classes} = props;

  return (
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
            value={searchTitle}
            onChange={onInputChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

/**
 * Компонент с кнопкой удаления и редактирования (если выбран только 1 элемент)
 *
 * @param {IProps} props Свойства компонента AppPanel.
 */
const DeleteAndEditButton = (props: IProps) => {
  const {selected, onItemsDelete} = props;

  return (
    <div style={{display: `flex`}}>
      {selected.length === 1 &&
        <Link to={`/edit/${selected[0]}`}>
          <EditIcon id="editIcon" />
        </Link>
      }
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
  } = props;
  
  const classes = useAppPanelStyles();
  const appBarClassName = !selected.length ? classes.appBar : `${classes.appBar} ${classes.appBarWithSelect}`;
  const isSelectionMode = selected.length > 0;

  return <AppBar className={appBarClassName} >
    <Toolbar className={classes.toolbar}>
      <IconButton edge="start" color="inherit" aria-label="Menu" />
      {!isSelectionMode && <AddButton appPanelProps={props} classes={classes} />}
      <div className={classes.wrapper}>
        <Typography data-test-id="panelTitle" variant="h6" className={classes.subTitle}>
          {isSelectionMode && <ClearButton {...props} />}
          {getSubTitle(selected)}
        </Typography>
        {!isSelectionMode && <SearchBlock appPanelProps={props} classes={classes} />}
        {isSelectionMode && <DeleteAndEditButton {...props} />}
      </div>
    </Toolbar>
  </AppBar>;
};

export default AppPanel;
