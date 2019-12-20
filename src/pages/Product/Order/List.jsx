import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import * as _ from 'lodash'
import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.09)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const convertToRupiah = val => {
  const numberString = val.toString();
  const sisa = numberString.length % 3;
  let rupiah = numberString.substr(0, sisa);
  const ribuan = numberString.substr(sisa).match(/\d{3}/g);
  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return `Rp ${rupiah}`;
};

const  CheckboxList = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.handleGetAgunan(newChecked)
    setChecked(newChecked);
  };
  return (
    <List className={classes.root}>
      {props.listAgunan.items.map(value => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value.id)}>
            <ListItemText id={labelId} primary={value.owner} secondary={convertToRupiah(value.collateral_value)}/>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value.id) !== -1}
                tabIndex={-1}
                disableRipple
                color="primary"
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckboxList;