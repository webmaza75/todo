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
      type,
      title,
      timeZone,
      reportTime: getReportTime(reportTime),
      repeat: getRepeatDays(repeat),
      selected: isSelectedItem,
      ['data-test-id']: `row-${id}`
    }
  });
  const cellStyle = {
    fontSize: 16,
    borderBottom: 0,
    paddingTop: 2,
    paddingBottom: 2
  };

  return <div style={{ maxWidth: "100%"}}>
    <MaterialTable
      onRowClick={(_, rowData) => {
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
        rowStyle: (rowData) => ({
          backgroundColor: rowData.selected ? cyan[100]: 'transparent'
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
          render: (rowData) => <SelectAvatar
            isSelectMode={selected.length > 0}
            type={rowData.type}
            selected={rowData.selected}
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
      components={{
        Row: props => <MTableBodyRow
          {...props}
          data-test-id={props.data['data-test-id']}
        />
      }}
    />
  </div>;
}

export default AppTable;
