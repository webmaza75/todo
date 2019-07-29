import * as React from 'react';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';

import TaskAvatar from '../task-avatar/task-avatar';
import taskList from '../../mocks/taskList';
import {getRepeatDays, getReportTime} from '../../utils';
import DoneIcon from '@material-ui/icons/Done';
import {TaskItem} from '../../types';

/**
 * @prop {Function} onItemSelect callback на выбор задачи из списка.
 * @prop {number[]} selected Выбранный элемент.
 */
interface IProps {
  onItemSelect: (item: TaskItem) => void;
  selected: number[];
};
//#B2EBF2
const AppTable = (props: IProps) => {
  const {onItemSelect, selected} = props;
  const formattedTaskList = taskList.map(({id, type, title, timeZone, reportTime, repeat}) => {
    const selectedItem = selected.includes(id);
    const avatarType = !selected.length && <TaskAvatar type={type} />;

    return {
      id,
      type: !selected.length ?
        <TaskAvatar type={type} /> :
        selectedItem ?
        <Avatar ><DoneIcon /></Avatar> :
        <Avatar ></Avatar>, 
      title,
      timeZone,
      reportTime: getReportTime(reportTime),
      repeat: getRepeatDays(repeat),
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
      tableRef={React.createRef()}
      onRowClick={(evt, rowData) => {
        onItemSelect(rowData)
      }}
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
        toolbar: false,
        // selection: true
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
      // onSelectionChange = {
      //   rowData => ({
      //       icon: 'select',
      //       onClick: (evt, rowData) => {
      //         onItemSelect(rowData);
      //         alert('You want to delete ' + rowData.length + evt.target.value +' rows');
      //       }
      //   })
      // }
      // onSelectionChange={(rows) => {/*console.log(`click`, rows); */onItemSelect(rows)}}
      // actions={[
        
      //   // rowData => ({
      //   //   // icon: 'delete',
      //   //   // tooltip: 'Delete User',
      //   //   // onClick: (event, rowData) => confirm("You want to delete " + rowData.name),
      //   //   disabled: rowData.disabled === false
      //   // })
      // ]}
      data={formattedTaskList}
      // components={{
      //   Action: props => (
      //     // <Button onClick={() => props.action.onSelectionChange(props.data)}>
      //     <TaskAvatar
      //       // type={type}
      //       // variant="contained"
      //     />
      //     // </Button>
      //   ),
      // }}
    />
  </div>);
}

export default AppTable;
