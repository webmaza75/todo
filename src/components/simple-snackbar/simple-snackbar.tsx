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
  isOpenUndoDeleteSnackbar: boolean;
  onItemsExactlyDelete: () => void;
  onItemsUndoDelete: () => void;
}

const SimpleSnackbar = (props: IProps) => {
  const {
    isOpenUndoDeleteSnackbar,
    onItemsExactlyDelete,
    onItemsUndoDelete
  } = props;
  const classes = useStyles();

  return <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={isOpenUndoDeleteSnackbar}
    autoHideDuration={6000}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">Task deleted</span>}
    action={[
      <Button key="undo" color="secondary" size="small" onClick={onItemsUndoDelete}>
        UNDO
      </Button>,
      <IconButton
        key="close"
        aria-label="close"
        color="inherit"
        className={classes.close}
        onClick={onItemsExactlyDelete}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />;
}

export default SimpleSnackbar;
