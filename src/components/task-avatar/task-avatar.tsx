import * as React from 'react';
import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import {AvatarType} from '../../types';

const useStyles = makeStyles(
  createStyles({
    avatar: {
      margin: 12,
      height: 42,
      width: 42,
      fontSize: 20,
      lineHeight: 42
    },
    avatarPLM: {
      color: `#B3B3B3`,
      backgroundColor: `#C5CEFF`
    },
    avatarTD: {
      color: `#FFE8D9`,
      backgroundColor: `#FFB482`
    },
    avatarFM: {
      color: `#E3F3E4`,
      backgroundColor: `#A0D6A5`
    },
    avatarNA: {
      color: `#FFFFFF`,
      backgroundColor: `#000000`
    }
  }),
);

interface Props {
  type: string
};

export const getShortAvatarType = (type: string): AvatarType => {
  const avatarType = {
    [AvatarType.PAYLOAD_MONITORING_REPORT]: `PLM`,
    [AvatarType.FRAGMENTATION_REPORT]: `FM`,
    [AvatarType.TOOTH_DETECTION_REPORT]: `TD`
  };
  const result = avatarType[type];
  if (!result) {
    return AvatarType.NOT_APPLICABLE
  }
  return result;
};

const TaskAvatar = (props) => {
  const {type} = props;
  const classes = useStyles();
  const shortType = getShortAvatarType(type);

  return <Avatar className={`${classes.avatar} ${classes[`avatar${shortType}`]}`}>{shortType}</Avatar>;
};

export default TaskAvatar;
