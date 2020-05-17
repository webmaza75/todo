import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Switch, Route} from 'react-router-dom';

import TaskListPage from '../task-list-page/task-list-page';
import TaskForm from '../task-form/task-form';
import Navbar from '../navbar/navbar';
import {reducer, ContextApp} from '../../reducer';
import {TaskItem} from './../../types';
import {ActionType} from '../actions/action-types';

const defaultList = require('../../mocks/taskList').default;

/**
 * @prop {TaskItem[]} taskList Все имеющиеся задачи.
 */
interface IState {
  taskList: TaskItem[];
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {});
  React.useEffect(() => {
    new Promise(resolve => {
      resolve(loadTasks(defaultList));
    })
  }, []);

  const addTask = (task: TaskItem) => {
    dispatch({
      type: ActionType.ADD_TASK,
      payload: task,
    })
  };

  const editTask = (task: TaskItem) => {
    dispatch({
      type: ActionType.EDIT_TASK,
      payload: task,
    })
  };

  const loadTasks = (tasks: TaskItem[]) => {
    dispatch({
      type: ActionType.LOAD_LIST,
      payload: tasks,
    })
  };

  const undoDeleteTasks = (tasks: TaskItem[]) => {
    dispatch({
      type: ActionType.UNDO_DELETE_TASKS,
      payload: tasks,
    })
  };

  const deleteTasks = (tasksIds: number[]) => {
    dispatch({
      type: ActionType.DELETE_TASKS,
      payload: tasksIds,
    })
  };

  return <CssBaseline>
    <Switch>
      <div style={{flexGrow: 1}}>
        <ContextApp.Provider value={{...state, actions: {addTask, undoDeleteTasks, deleteTasks, editTask}}}>
          <Navbar />
          <Route path={`/`} exact component={TaskListPage} />
          <Route path={`/add/`} component={TaskForm} />
          <Route path={`/edit/:id`} component={TaskForm} />
        </ContextApp.Provider>  
      </div>
    </Switch>
  </CssBaseline>;
};

export default App;
