import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const AppTable = () => {
  // const classes = useStyles();

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Task Title</StyledTableCell>
            <StyledTableCell align="right">Time Zone</StyledTableCell>
            <StyledTableCell align="right">Report Time</StyledTableCell>
            <StyledTableCell align="right">Repeat</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="right">{123}</StyledTableCell>
            <StyledTableCell align="right">{456}</StyledTableCell>
            <StyledTableCell align="right">{789}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default AppTable;
