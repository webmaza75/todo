import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDeleteDialog = (props: IProps) => {
  const {
    onConfirm,
    onCancel
  } = props;

  return <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{'Delete selected tasks?'}</DialogTitle>
      <DialogActions>
        <Button
          onClick={onConfirm}
          color="primary"
          id="confirmDelete"
        >
          Delete
        </Button>
        <Button
          onClick={onCancel}
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
