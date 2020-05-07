import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  }),
);

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const SimpleSnackbar = (props: IProps) => {
  const {
    onConfirm,
    onCancel
  } = props;
  const classes = useStyles();

  return <Snackbar
    id="snackBarForUndoDelete"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={true}
    onClose={onConfirm}
    autoHideDuration={5000}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">Task deleted</span>}
    action={[
      <Button
        id="undoDelete"
        key="undo"
        color="secondary"
        size="small"
        onClick={onCancel}
      >
        UNDO
      </Button>,
      <IconButton
        id="closeSnackbar"
        key="close"
        aria-label="close"
        color="inherit"
        className={classes.close}
        onClick={onConfirm}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />;
}

export default SimpleSnackbar;
