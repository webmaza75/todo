import * as React from 'react';
import {
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import Navbar from '../navbar/navbar';
import AppPanel from '../app-panel/app-panel';
import AppTable from '../app-table/app-table';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  tableWrapper: {
    marginTop: 150,
    marginRight: `auto`,
    marginBottom: 20,
    marginLeft: `auto`,
    width: `80%`
  }
}));

const Main = () => {
  const classes = useStyles();

  return <div className={classes.root}>
    <Navbar />
    <AppPanel />
    <div className={classes.tableWrapper}>
      <AppTable />
    </div>
  </div>
};

export default Main;
