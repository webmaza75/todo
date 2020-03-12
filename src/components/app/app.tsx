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

const App = () => {
  const {ADD_TASK} = ActionType;
  const initialState = {tasks: taskList};
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addTask = (task: TaskItem) => {
    dispatch({
      type: ADD_TASK,
      payload: task,
    })
  };

  return <CssBaseline>
    <Switch>
      <div style={{flexGrow: 1}}>
        <ContextApp.Provider value={{tasks: state.tasks, addTask}}>
          <Navbar />
          <Route path={`/`} exact component={TaskListPage} />
          <Route path={`/add/`} component={TaskForm} />
        </ContextApp.Provider>  
      </div>
    </Switch>
  </CssBaseline>;
};

export default App;
