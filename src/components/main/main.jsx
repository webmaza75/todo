import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Navbar from '../navbar/navbar.jsx';
import AppPanel from '../app-panel/app-panel.jsx';
import AppTable from '../app-table/app-table.jsx';

const useStyles = makeStyles(theme => ({
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

const title = `Payload Monitoring`.toUpperCase();
const subTitle = `Automated Tasks`.toUpperCase();

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
