import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#f4f5f8',
    color: '#00052e',
    fontWeight: 'bold',
    borderBottom: 'none',
    fontFamily: 'Lato'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              props.headRow.map(key => {
                return (
                  <StyledTableCell>{key}</StyledTableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.children}
            {/* <TableCell component="th" scope="row">
              Zilmas
            </TableCell>
            <TableCell>Arjuna</TableCell>
            <TableCell>BrataS</TableCell> */}
        </TableBody>
      </Table>
    </Paper>
  );
}