import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
  open: boolean;
  onTasksCancelDelete: () => void;
  onTasksConfirmDelete: () => void;
}

const ConfirmationDeleteDialog = (props: IProps) => {
  const {
    open,
    onTasksCancelDelete,
    onTasksConfirmDelete
  } = props;

  return <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{'Delete selected tasks?'}</DialogTitle>
      <DialogActions>
        <Button
          onClick={onTasksConfirmDelete}
          color="primary"
          id="confirmDelete"
        >
          Delete
        </Button>
        <Button
          onClick={onTasksCancelDelete}
          color="primary"
          id="cancelDelete"
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>;
}

export default ConfirmationDeleteDialog;
