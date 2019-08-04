import * as React from 'react';

import Navbar from '../navbar/navbar';
import AppPanel from '../app-panel/app-panel';
import AppTable from '../app-table/app-table';
import {TaskItem} from '../../types';
import taskList from '../../mocks/taskList';

const classes = {
  root: {
    flexGrow: 1,
  },
  tableWrapper: {
    marginTop: 150,
    marginRight: 'auto',
    marginBottom: 20,
    marginLeft: 'auto',
    width: '80%'
  }
};

interface IProps {

};

/**
 * @prop {number[]} selected Выбранные задачи в списке.
 * @prop {string} searchTitle Название задачи для поиска.
 * @prop {TaskItem[]} taskList Все имеющиеся задачи.
 * @prop {TaskItem[]} leftTaskList Оставшиеся после удаления задачи.
 * @prop {boolean} isOpenConfirmDeleteDialog Открытие диалогового окна подтверждения удаления задач.
 * @prop {boolean} isOpenUndoDeleteSnackbar Открытие snackbar с возможностью восстановления удаленных на предыдущем шаге задач.
 */
interface IState {
  selected: number[];
  searchTitle: string;
  taskList: TaskItem[];
  leftTaskList: TaskItem[];
  isOpenConfirmDeleteDialog: boolean;
  isOpenUndoDeleteSnackbar: boolean;
};

class Main extends React.Component<IProps, IState> {
  state: IState = {
    selected: [],
    taskList,
    leftTaskList: taskList,
    searchTitle: '',
    isOpenConfirmDeleteDialog: false,
    isOpenUndoDeleteSnackbar: false
  };

  render() {
    const {
      selected,
      leftTaskList,
      searchTitle,
      isOpenConfirmDeleteDialog,
      isOpenUndoDeleteSnackbar
    } = this.state;
    return <div style={classes.root}>
      <Navbar />
      <AppPanel
        selected={selected}
        onSelectionReset={this.handleSelectionReset}
        onItemsDelete={this.handleItemsDelete}
        onInputChange={this.handleInputChange}
        searchTitle={searchTitle}
        isOpenConfirmDeleteDialog={isOpenConfirmDeleteDialog}
        onTasksCancelDelete={this.handleTasksCancelDelete}
        onTasksConfirmDelete={this.handleTasksConfirmDelete}
        isOpenUndoDeleteSnackbar={isOpenUndoDeleteSnackbar}
        onItemsExactlyDelete={this.handleItemsExactlyDelete}
        onItemsUndoDelete={this.handleItemsUndoDelete}
      />
      <div style={classes.tableWrapper}>
        <AppTable
          taskList={leftTaskList}
          onItemSelect={this.handleItemSelect}
          selected={selected}
        />
      </div>
    </div>;
  }

  // /**
  //  * Нахождение задачи по id из массива всех имеющихся.
  //  * @param {number} itemId 
  //  * @param {TaskItem[]} taskList Массив имеющихся задач.
  //  */
  // private findItemById(itemId: number, taskList: TaskItem[]) {
  //   return taskList.find(({id}) => id === itemId);
  // }

  /**
   * Обработчик выделения строки.
   * @param {TaskItem} item Выделенная строка.
   */
  handleItemSelect = (item: TaskItem): void => {
    const {selected} = this.state;
    const {id} = item;
    const res = selected.includes(id);

    if (res === false) {
      this.setState({
        selected: [
          ...selected,
          id
        ]
      });
    } else {
      this.setState({
        selected: selected.filter((idx) => idx !== item.id)
      });
    }    
  }

  handleSelectionReset = (): void => {
    this.setState({
      selected: []
    });
  }

  handleItemsDelete = (): void => {
    this.setState({
      isOpenConfirmDeleteDialog: true
    });
  }

  handleItemsUndoDelete = (): void => {
    const {searchTitle} = this.state;
    const res: TaskItem[] = !searchTitle ?
      taskList :
      taskList.filter(({title}) => this.filterBySearchTitle(title, searchTitle));

    this.setState({
      selected: [],
      leftTaskList: taskList,
      isOpenUndoDeleteSnackbar: false
    });
  }

  handleItemsExactlyDelete = (): void => {
    const {leftTaskList} = this.state;
    this.setState({
      selected: [],
      taskList: leftTaskList,
      isOpenUndoDeleteSnackbar: false
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    if (event && event.target) {
      const {value} = event.target;

      this.getSearchList(value);
    }
  }

  filterBySearchTitle = (title: string, searchTitle: string) => {
    return title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1
  }

  getSearchList = (value: string): void => {
    const {taskList} = this.state;
    let res: TaskItem[];

    const searchTitle = value.trimLeft().replace(/\s{2,}/, ' ');

    if (searchTitle !== '') {
      res = taskList.filter(({title}) => title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1);
    } else {
      res = taskList;
    }
  
    this.setState({
      searchTitle: searchTitle,
      leftTaskList: res
    });
  }

  handleTasksCancelDelete = () => {
    this.setState({
      isOpenConfirmDeleteDialog: false
    });
  }
  
  handleTasksConfirmDelete = () => {
    const {
      selected,
      taskList,
      searchTitle
    } = this.state;

    const res: TaskItem[] = !searchTitle ?
      taskList.filter(({id}) => !selected.includes(id)) :
      taskList.filter(({id, title}) => !selected.includes(id) && this.filterBySearchTitle(title, searchTitle));
    
    this.setState({
      selected: [],
      leftTaskList: res,
      isOpenConfirmDeleteDialog: false,
      isOpenUndoDeleteSnackbar: true
    });
  }
}

export default Main;
