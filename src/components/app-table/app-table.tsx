import * as React from 'react';
import MaterialTable from 'material-table';
import {cyan} from '@material-ui/core/colors';

import TaskAvatar from '../task-avatar/task-avatar';
import SelectTaskAvatar from '../select-task-avatar/select-task-avatar';
import taskList from '../../mocks/taskList';
import {getRepeatDays, getReportTime} from '../../utils';
import {TaskItem} from '../../types';

/**
 * @prop {number[]} selected Массив выбранных строк.
 * @prop {TaskItem[]} taskList Все имеющиеся задачи.
 * @prop {Function} onItemSelect callback на выбор задачи из списка.
 */
interface IProps {
  selected: number[];
  taskList: TaskItem[];
  onItemSelect: (item: TaskItem) => void;
};

const AppTable = (props: IProps) => {
  const {
    onItemSelect,
    selected,
    taskList
  } = props;
  const formattedTaskList = taskList.map(({id, type, title, timeZone, reportTime, repeat}) => {
    const isSelectedItem = selected.includes(id);

    return {
      id,
      type: !selected.length ?
        <TaskAvatar type={type} /> :
        <SelectTaskAvatar isSelectedItem={isSelectedItem} />,
      title,
      timeZone,
      reportTime: getReportTime(reportTime),
      repeat: getRepeatDays(repeat),
      selected: isSelectedItem
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
        rowStyle: (rowData) => ({
          backgroundColor: selected.includes(rowData.id) ? cyan[100]: 'transparent'
        })
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
      data={formattedTaskList}
    />
  </div>);
}

export default AppTable;
