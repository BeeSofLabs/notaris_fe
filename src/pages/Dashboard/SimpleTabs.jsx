import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';


import ListTables from './ListTables'
import SimpleMenu from './SimpleMenu'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const rowBergerak = ['Pemilik', 'Nomor Mesin', 'color', 'Action']
const rowTidakBergerak = ['Pemilik', 'Nilai Agunan', 'Action']

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Bergerak" {...a11yProps(0)} />
          <Tab label="Tidak Bergerak" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ListTables headRow={rowBergerak}>
          <TableCell component="th" scope="row">
            Zilmas
          </TableCell>
          <TableCell>Arjuna</TableCell>
          <TableCell>BrataS</TableCell>
          <TableCell>
            <SimpleMenu />
          </TableCell>
        </ListTables>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListTables headRow={rowTidakBergerak}>
          <TableCell component="th" scope="row">
            Zilmas
          </TableCell>
          <TableCell>Arjuna</TableCell>
          <TableCell>BrataS</TableCell>
        </ListTables>
      </TabPanel>
    </div>
  );
}