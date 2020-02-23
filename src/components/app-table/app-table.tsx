import * as React from 'react';
import MaterialTable, { MTableBodyRow } from 'material-table';
import {cyan} from '@material-ui/core/colors';

import SelectAvatar from '../select-avatar/select-avatar';
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
  onItemSelect: (id: number) => void;
}

const AppTable = (props: IProps) => {
  const {
    onItemSelect,
    selected,
    taskList
  } = props;

  const cellStyle = {
    fontSize: 16,
    borderBottom: 0,
    paddingTop: 2,
    paddingBottom: 2
  };

  return <div style={{ maxWidth: "100%"}}>
    <MaterialTable
      onRowClick={(_, rowData: TaskItem) => {
        console.log('rowData', rowData);
        const {id} = rowData;
        onItemSelect(id);
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
        rowStyle: (rowData: TaskItem) => ({
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
          cellStyle,
          render: (rowData: TaskItem) => <SelectAvatar
            isSelectMode={selected.length > 0}
            type={rowData.type}
            selected={selected.includes(rowData.id)}
          />
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
          cellStyle,
          render: (rowData: TaskItem) => getReportTime(rowData.reportTime)
        },
        {
          title: "Repeat",
          field: "repeat",
          sorting: false,
          cellStyle,
          render: (rowData: TaskItem) => getRepeatDays(rowData.repeat)
        },
      ]}
      data={taskList}
      components={{
        Row: props => <MTableBodyRow
          {...props}
          data-test-id={`row-${props.data.id}`}
        />
      }}
    />
  </div>;
}

export default AppTable;
