import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(
  createStyles({
    avatarPLM: {
      margin: 10,
      color: `#B3B3B3`,
      backgroundColor: `#C5CEFF`,
      height: 42,
      width: 42,
      fontSize: 20
    },
    avatarTD: {
      margin: 10,
      color: `#FFE8D9`,
      backgroundColor: `#FFB482`,
      height: 42,
      width: 42,
      fontSize: 20
    },
    avatarFM: {
      margin: 10,
      color: `#E3F3E4`,
      backgroundColor: `#A0D6A5`,
      height: 42,
      width: 42,
      fontSize: 20
    },
  }),
);

const TaskAvatar = (props) => {
  const {type} = props;
  const classes = useStyles();

  return <Avatar className={classes[`avatar${type}`]}>{type}</Avatar>;
};

export default TaskAvatar;