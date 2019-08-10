import * as React from 'react';

import TaskAvatar from '../task-avatar/task-avatar';
import SelectTaskAvatar from '../select-task-avatar/select-task-avatar';

/**
 * @prop {boolean} isSelectMode Флаг режима выбора строк.
 * @prop {boolean} selected Флаг выбранной строки.
 * @prop {string} type Тип аватара.
 */
interface IProps {
  isSelectMode: boolean;
  selected: boolean;
  type: string;
}

const SelectAvatar = (props: IProps) => {
  const {
    isSelectMode,
    selected,
    type
  } = props;

  return !isSelectMode ?
    <TaskAvatar type={type} /> :
    <SelectTaskAvatar isSelectedItem={selected} />
  ;
};

export default SelectAvatar;
