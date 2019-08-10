import * as React from 'react';
import {memoize} from 'lodash';

import Navbar from '../navbar/navbar';
import AppPanel from '../app-panel/app-panel';
import AppTable from '../app-table/app-table';
import {TaskItem} from '../../types';
import {getLeftTaskList} from '../../utils';
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

}

/**
 * @prop {number[]} selected Выбранные задачи в списке.
 * @prop {string} searchTitle Название задачи для поиска.
 * @prop {TaskItem[]} taskList Все имеющиеся задачи.
 * @prop {boolean} isOpenConfirmDeleteDialog Открытие диалогового окна подтверждения удаления задач.
 * @prop {boolean} isOpenUndoDeleteSnackbar Открытие snackbar с возможностью восстановления удаленных на предыдущем шаге задач.
 * @prop {number[]} deletedList id всех удаленных элементов.
 */
interface IState {
  selected: number[];
  searchTitle: string;
  taskList: TaskItem[];
  isOpenConfirmDeleteDialog: boolean;
  isOpenUndoDeleteSnackbar: boolean;
  deletedList: number[];
}

class Main extends React.Component<IProps, IState> {
  state: IState = {
    selected: [],
    taskList,
    searchTitle: '',
    isOpenConfirmDeleteDialog: false,
    isOpenUndoDeleteSnackbar: false,
    deletedList: []
  };

  render() {
    const {
      taskList,
      selected,
      searchTitle,
      isOpenConfirmDeleteDialog,
      isOpenUndoDeleteSnackbar,
      deletedList
    } = this.state;

    const leftTaskList = getLeftTaskList({deletedList, taskList, searchTitle});

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
   * @param {number} id Выделенная строка.
   */
  handleItemSelect = (id: number): void => {
    const {selected} = this.state;
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
        selected: selected.filter((idx) => idx !== id)
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
    this.setState({
      selected: [],
      isOpenUndoDeleteSnackbar: false,
      deletedList: []
    });
  }

  handleItemsExactlyDelete = (): void => {
    const {
      taskList,
      deletedList
    } = this.state;

    const newTaskList = taskList.filter(({id}) => !deletedList.includes(id));

    this.setState({
      selected: [],
      taskList: newTaskList,
      isOpenUndoDeleteSnackbar: false,
      deletedList: []
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const {value} = event.target;
    this.getSearchList(value);
  }

  filterBySearchTitle = (title: string, searchTitle: string) => {
    return title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1
  }

  getSearchList = (value: string): void => {
    this.setState({
      searchTitle: value.trimLeft().replace(/\s{2,}/, ' ')
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
      deletedList
    } = this.state;

    this.setState({
      selected: [],
      isOpenConfirmDeleteDialog: false,
      isOpenUndoDeleteSnackbar: true,
      deletedList: [...deletedList, ...selected]
    });
  }
}

export default Main;
