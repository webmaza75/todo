import * as React from 'react';

import AppPanel from '../app-panel/app-panel';
import AppTable from '../app-table/app-table';
import {
  getLeftTaskList,
  getSortedByIdTaskList
} from '../../utils';
import {ContextApp} from '../../reducer';
import ConfirmationDeleteDialog from '../confirmation-delete-dialog/confirmation-delete-dialog';
import SimpleSnackbar from '../simple-snackbar/simple-snackbar';
import {useConfirm} from '../../hooks/use-confirm';
import {classes} from './task-list-style';

interface IProps {

}

const TaskListPage = () => {
  const {taskList, actions} = React.useContext(ContextApp);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [searchTitle, setSearchTitle] = React.useState('');
  const [ConfirmDialog, showConfirmDialog] = useConfirm(ConfirmationDeleteDialog);
  const [ConfirmSnackbar, showConfirmSnackbar] = useConfirm(SimpleSnackbar);

  const leftTaskList = getSortedByIdTaskList(getLeftTaskList(taskList, searchTitle));

  /**
   * Обработчик выделения строки.
   * @param {number} id Выделенная строка.
   */
  const handleItemSelect = (id: number): void => {
    const res = selected.includes(id);

    if (res === false) {
      setSelected((prevState) => [...prevState, id]);
    } else {
      setSelected((prevState) => prevState.filter((idx) => idx !== id));
    }
  };

  const handleSelectionReset = (): void => {
    setSelected([]);
  }

  const handleItemsDelete = async () => {
    const needShowSnackBar = await showConfirmDialog();

    if (needShowSnackBar) {
      const undoList = taskList.filter(({id}) => selected.includes(id));

      setSelected([]);
      actions.deleteTasks(selected);

      const result = await showConfirmSnackbar();

      if (!result) {
        actions.undoDeleteTasks(undoList);
      }

    } else {
      setSelected([]);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    handleSearchTitleSet(event.target.value);
  }

  const handleSearchTitleSet = (value: string): void => {
    setSearchTitle(value.trimLeft().replace(/\s{2,}/, ' '));
  }

  return <>
      <AppPanel
        selected={selected}
        onSelectionReset={handleSelectionReset}
        onItemsDelete={handleItemsDelete}
        onInputChange={handleInputChange}
        searchTitle={searchTitle}
      />

      <div style={classes.tableWrapper}>
        <AppTable
          taskList={leftTaskList}
          onItemSelect={handleItemSelect}
          selected={selected}
        />
      </div>
      <ConfirmDialog />
      <ConfirmSnackbar />
    </>;
  }

export default TaskListPage;
