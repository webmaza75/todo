import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Switch, Route} from 'react-router-dom';

import TaskListPage from '../task-list-page/task-list-page';
import TaskForm from '../task-form/task-form';
import Navbar from '../navbar/navbar';

const App = () => {
  return <CssBaseline>
    <Switch>
      <div style={{flexGrow: 1}}>
        <Navbar />
        <Route path={`/`} exact component={TaskListPage} />
        <Route path={`/add/`} component={TaskForm} />
      </div>
    </Switch>
  </CssBaseline>;
};

export default App;
