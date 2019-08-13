import {Selector} from 'testcafe';

export default class DeleteDialog {
  confirmDelete: any;
  cancelDelete: any;

  constructor () {
    this.confirmDelete = Selector('#confirmDelete', {visibilityCheck: true});
    this.cancelDelete = Selector('#cancelDelete', {visibilityCheck: true});
  }
}