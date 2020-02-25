import * as React from 'react';

import AppPanel from '../app-panel/app-panel';
import AppTable from '../app-table/app-table';
import {TaskItem} from '../../types';
import {
  getLeftTaskList,
  getSortedByIdTaskList
} from '../../utils';
import taskList from '../../mocks/taskList';

const classes = {
  tableWrapper: {
    marginTop: 150,
    marginRight: 'auto',
    marginBottom: 20,
    marginLeft: 'auto',
    width: '80%'
  },
  formWrapper: {
    width: '100%',
    maxWidth: '1280',
    margin: '150px auto 20px',
    padding: '90px 30px 30px',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    border: 'solid #C4C4C4 1px',
    boxShadow: '0 2px 4px rgba(0,0,0,.24)'
  },
  formWrapperTop: {
    backgroundColor: '#223C6E',
    width: '100%',
  },
  formWrapperStepper: {
    border: '1px solid #c4c4c4',
    borderBottom: '1px solid #e0e0e0',
    width: '80%',
    maxWidth: '1280',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FFFFFF',
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
 * @prop {TaskItem[]} undoList список удаленных элементов для восстановления.
 * @prop {boolean} isTaskFormOpen Открытие формы создания (редактирвания) задачи.
 */
interface IState {
  selected: number[];
  searchTitle: string;
  taskList: TaskItem[];
  isOpenConfirmDeleteDialog: boolean;
  isOpenUndoDeleteSnackbar: boolean;
  undoList: TaskItem[];
  isTaskFormOpen: boolean;
}

class TaskListPage extends React.Component<IProps, IState> {
  state: IState = {
    selected: [],
    taskList,
    searchTitle: '',
    isOpenConfirmDeleteDialog: false,
    isOpenUndoDeleteSnackbar: false,
    undoList: [],
    isTaskFormOpen: false
  };

  render() {
    const {
      taskList,
      selected,
      searchTitle,
      isOpenConfirmDeleteDialog,
      isOpenUndoDeleteSnackbar,
      isTaskFormOpen
    } = this.state;

    const leftTaskList = getSortedByIdTaskList(getLeftTaskList(taskList, searchTitle));

    return <>
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
        onToggleTaskForm={this.handleToggleTaskForm}
        isTaskFormOpen={isTaskFormOpen}
      />

      <div style={classes.tableWrapper}>
        <AppTable
          taskList={leftTaskList}
          onItemSelect={this.handleItemSelect}
          selected={selected}
        />
      </div>
    </>;
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
    if (!selected.length) {
      this.handleItemsExactlyDelete();
    }

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
    const {taskList, undoList} = this.state;

    this.setState({
      selected: [],
      isOpenUndoDeleteSnackbar: false,
      taskList: [...taskList, ...undoList]
    });
  }

  handleItemsExactlyDelete = (): void => {
    this.setState({
      selected: [],
      isOpenUndoDeleteSnackbar: false,
      undoList: []
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
      taskList
    } = this.state;

    const newTaskList = taskList.filter(({id}) => !selected.includes(id));
    const undoList = taskList.filter(({id}) => selected.includes(id));

    this.setState({
      selected: [],
      isOpenConfirmDeleteDialog: false,
      isOpenUndoDeleteSnackbar: true,
      taskList: newTaskList,
      undoList 
    });
  }

  handleToggleTaskForm = () => {
    this.setState(
      (prevState) => ({
        isTaskFormOpen: !prevState.isTaskFormOpen
      })
    );
  }
}

export default TaskListPage;
