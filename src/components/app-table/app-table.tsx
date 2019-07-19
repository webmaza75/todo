import * as React from 'react';
import {
  withStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TaskAvatar from '../task-avatar/task-avatar';
import taskList from '../../mocks/taskList';
import {getRepeatDays, getReportTime} from '../../utils';

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    fontSize: 16,
    '&:first-child': {
      borderBottom: 0
    }
  },
  body: {
    fontSize: 16,
    borderBottom: 0,
    paddingTop: 2,
    paddingBottom: 2
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  },
}))(TableRow);

const AppTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell>Task Title</StyledTableCell>
          <StyledTableCell>Time Zone</StyledTableCell>
          <StyledTableCell align="right">Report Time</StyledTableCell>
          <StyledTableCell>Repeat</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {taskList.map(({id, type, title, timeZone, reportTime, repeat}) => {
          return <StyledTableRow key={id}>
            <StyledTableCell><TaskAvatar type={type} /></StyledTableCell>
            <StyledTableCell sortDirection="asc">{title}</StyledTableCell>
            <StyledTableCell>{timeZone}</StyledTableCell>
            <StyledTableCell align="right">{getReportTime(reportTime)}</StyledTableCell>
            <StyledTableCell>{getRepeatDays(repeat)}</StyledTableCell>
          </StyledTableRow>;
        })}
      </TableBody>
    </Table>
  );
}

export default AppTable;
