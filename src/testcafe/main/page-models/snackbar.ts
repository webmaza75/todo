import {Selector} from 'testcafe';

export default class Snackbar {
  undoDelete: any;
  closeSnackbar: any;
  snackbarGroup: any;

  constructor () {
    this.snackbarGroup = Selector('#snackBarForUndoDelete', {visibilityCheck: true});
    this.closeSnackbar = Selector('#closeSnackbar', {visibilityCheck: true});
    this.undoDelete = Selector('#undoDelete', {visibilityCheck: true});
  }
}
