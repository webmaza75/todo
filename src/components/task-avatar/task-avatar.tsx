import * as React from 'react';
import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(
  createStyles({
    avatarPLM: {
      margin: 12,
      color: `#B3B3B3`,
      backgroundColor: `#C5CEFF`,
      height: 42,
      width: 42,
      fontSize: 20,
      lineHeight: 42
    },
    avatarTD: {
      margin: 12,
      color: `#FFE8D9`,
      backgroundColor: `#FFB482`,
      height: 42,
      width: 42,
      fontSize: 20,
      lineHeight: 42
    },
    avatarFM: {
      margin: 12,
      color: `#E3F3E4`,
      backgroundColor: `#A0D6A5`,
      height: 42,
      width: 42,
      fontSize: 20,
      lineHeight: 42
    },
  }),
);

interface Props {
  type: string
};

export const getShortAvatarType = (type: string) => {
  const avatarType = {
    [`Payload Monitoring Report`]: `PLM`,
    [`Fragmentation Report`]: `FM`,
    [`Tooth Detection Report`]: `TD`
  };
  return avatarType[type];
};

const TaskAvatar = (props) => {
  const {type} = props;
  const classes = useStyles();
  const shortType = getShortAvatarType(type);

  return <Avatar className={classes[`avatar${shortType}`]}>{shortType}</Avatar>;
};

export default TaskAvatar;