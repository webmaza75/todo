import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Switch, Route} from 'react-router-dom';

import TaskListPage from '../task-list-page/task-list-page';
import TaskForm from '../task-form/task-form';
import Navbar from '../navbar/navbar';
import {reducer, ContextApp} from '../../reducer';
import taskList from '../../mocks/taskList';
import {TaskItem} from './../../types';
import {ActionType} from '../actions/action-types';

/**
 * @prop {TaskItem[]} taskList Все имеющиеся задачи.
 */
interface IState {
  taskList: TaskItem[];
}

const App = () => {
  const {ADD_TASK, DELETE_TASKS, UNDO_DELETE_TASKS} = ActionType;
  const [state, dispatch] = React.useReducer(reducer, {taskList});

  const addTask = (task: TaskItem) => {
    dispatch({
      type: ADD_TASK,
      payload: task,
    })
  };

  const undoDeleteTasks = (tasks: TaskItem[]) => {
    dispatch({
      type: UNDO_DELETE_TASKS,
      payload: tasks,
    })
  };

  const deleteTasks = (tasksIds: number[]) => {
    dispatch({
      type: DELETE_TASKS,
      payload: tasksIds,
    })
  };

  return <CssBaseline>
    <Switch>
      <div style={{flexGrow: 1}}>
        <ContextApp.Provider value={{...state, addTask, undoDeleteTasks, deleteTasks}}>
          <Navbar />
          <Route path={`/`} exact component={TaskListPage} />
          <Route path={`/add/`} component={TaskForm} />
        </ContextApp.Provider>  
      </div>
    </Switch>
  </CssBaseline>;
};

export default App;
