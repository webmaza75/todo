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
 */
interface IState {
  selected: number[];
  searchTitle: string;
  taskList: TaskItem[];
  leftTaskList: TaskItem[];
};

class Main extends React.Component<IProps, IState> {
  state: IState = {
    selected: [],
    taskList,
    leftTaskList: taskList,
    searchTitle: ''
  };

  render() {
    const {
      selected,
      leftTaskList,
      searchTitle
    } = this.state;
    return <div style={classes.root}>
      <Navbar />
      <AppPanel
        selected={selected}
        onSelectionReset={this.handleSelectionReset}
        onItemsDelete={this.handleItemsDelete}
        onItemsUndoDelete={this.handleItemsUndoDelete}
        onInputChange={this.handleInputChange}
        searchTitle={searchTitle}
        onTitleSearch={this.handleTitleSearch}
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
    const {
      selected,
      taskList
    } = this.state;
    this.setState({
      selected: [],
      leftTaskList: taskList.filter(item => !selected.includes(item.id))
    });
  }

  handleItemsUndoDelete = (): void => {
    const {leftTaskList} = this.state;
    this.setState({
      selected: [],
      leftTaskList: taskList
    });
  }

  handleItemsExactlyDelete = (): void => {
    const {leftTaskList} = this.state;
    this.setState({
      selected: [],
      taskList: leftTaskList
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    if (event && event.target) {
      this.setState({
        searchTitle: event.target.value
      });
    }
  }

  handleTitleSearch = (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    event.preventDefault();

    const {taskList, searchTitle} = this.state;

    if (searchTitle.trim() !== '') {
      const res = taskList.filter(({title}) => title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1);

      this.setState({
        leftTaskList: res
      });
    } else {
      this.setState({
        leftTaskList: taskList
      });
    }
  }
}

export default Main;
