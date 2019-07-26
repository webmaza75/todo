import * as React from 'react';
import MaterialTable from 'material-table';

import TaskAvatar from '../task-avatar/task-avatar';
import taskList from '../../mocks/taskList';
import {getRepeatDays, getReportTime} from '../../utils';

const AppTable = () => {
  const formattedTaskList = taskList.map(({id, type, title, timeZone, reportTime, repeat}) => {
    return {
      type: <TaskAvatar type={type} />, 
      title,
      timeZone,
      reportTime: getReportTime(reportTime),
      repeat: getRepeatDays(repeat)
    }
  });
  const cellStyle = {
    fontSize: 16,
    borderBottom: 0,
    paddingTop: 2,
    paddingBottom: 2
  };

  return (
  <div style={{ maxWidth: "100%"}}>
    <MaterialTable
      style={{
        border: 0,
        boxShadow: 'none'
      }}
      options={{
        search: false,
        sorting: true,
        paging: false,
        maxBodyHeight: 400,
        headerStyle: {
          fontSize: 16
        },
        toolbar: false
      }}
      columns={[
        {
          title: "",
          field: "type",
          sorting: false,
          headerStyle: {
            fontSize: 16,
            borderBottom: 0,
          },
          cellStyle
        },
        {
          title: "Task Title",
          field: "title",
          cellStyle
        },
        {
          title: "Time Zone",
          field: "timeZone",
          sorting: false,
          cellStyle
        },
        {
          title: "Report Time",
          field: "reportTime",
          sorting: false,
          cellStyle
        },
        {
          title: "Repeat",
          field: "repeat",
          sorting: false,
          cellStyle
        },
      ]}
      // actions={[
      //   {
      //     //icon: 'save',
      //     //tooltip: 'Save User',
      //     tooltip: 'Remove All Selected Users',
      //     icon: 'select',
      //     onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
      //   },
      //   // rowData => ({
      //   //   // icon: 'delete',
      //   //   // tooltip: 'Delete User',
      //   //   // onClick: (event, rowData) => confirm("You want to delete " + rowData.name),
      //   //   disabled: rowData.disabled === false
      //   // })
      // ]}
      data={formattedTaskList}
    />
  </div>);
}

export default AppTable;
