import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import {cyan} from '@material-ui/core/colors';

const style = {
  margin: 12,
  height: 42,
  width: 42,
  fontSize: 20,
  lineHeight: 42,
  color: cyan[200],
  backgroundColor: 'white',
  border: `1px solid ${cyan[100]}`
};

/**
 * @prop isSelectedItem Выбран ли элемент.
 */
interface IProps {
  isSelectedItem: boolean;
}

const SelectTaskAvatar = (props: IProps) => {
  const {isSelectedItem} = props;
  if (isSelectedItem) {
    return <Avatar style={style}><DoneIcon /></Avatar>;
  }
  return <Avatar style={style}></Avatar>;
};

export default SelectTaskAvatar;
