import Table from './page-models/table';
import Snackbar from './page-models/snackbar';
import DeleteDialog from './page-models/delete-dialog';
import Panel from './page-models/panel';

const table = new Table();
const snackbar = new Snackbar();
const deleteDialog = new DeleteDialog();
const panel = new Panel();

fixture(`delete`)
  .page(`http://localhost:3000`);

test('Confirm delete tasks', async t => {
  await t
    .expect(table.tableBody.childElementCount).eql(5)
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .expect(snackbar.snackbarGroup.exists).ok()
    .expect(snackbar.undoDelete.exists).ok()
    .expect(table.tableBody.childElementCount).eql(3);
});

test('Cancel delete tasks', async t => {
  await t
    .expect(table.tableBody.childElementCount).eql(5)
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .click(panel.deleteIcon)
    .click(deleteDialog.cancelDelete)
    .expect(table.tableBody.childElementCount).eql(5);
});

test('Delete searched tasks', async t => {
  await t
    .typeText(panel.searchInput, 'auto')
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .expect(panel.searchInput.value).eql('auto')
    .expect(table.tableBody.childElementCount).eql(2)
});

// 5 -> 4 -> 2 -> 1 -> 2
// search with 'auto' -> delete 2 selected rows (confirm) -> delete 1 selected row -> clear searched text
test('Delete searched tasks 2 times', async t => {
  await t
    .typeText(panel.searchInput, 'auto')
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .click(table.tableBody.child(0))
    .wait(500)
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .click(panel.searchInput)
    .selectText(panel.searchInput)
    .pressKey('delete')
    .expect(table.tableBody.childElementCount).eql(2)
});

// Delete last searched row, confirm, exact delete;
// select 2 first rows, delete, confirm;
// clear searchinput
test('Exact delete searched rows, again delete and clear searchInput', async t => {
  await t
    .typeText(panel.searchInput, 'auto')
    .click(table.tableBody.child(3))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .click(snackbar.closeSnackbar)
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .selectText(panel.searchInput)
    .pressKey('delete')
    .wait(1000)
    .expect(table.tableBody.childElementCount).eql(2, { timeout: 500 })
});

// Delete 1 searched row, confirm, exact delete;
// select 2 first rows, delete, confirm, undo delete;
// select 1 row, delete, confirm, exact delete;
// clear searchinput
// select first row, delete, undo;
test('Exact delete searched rows, again delete, undo, clear searchInput, again exact delete, undo delete', async t => {
  await t
    .typeText(panel.searchInput, 'auto')
    .click(table.tableBody.child(2))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .click(snackbar.closeSnackbar)
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(2))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .click(snackbar.undoDelete)
    .click(table.tableBody.child(1))
    .click(panel.deleteIcon)
    .click(deleteDialog.confirmDelete)
    .click(snackbar.closeSnackbar)
    .selectText(panel.searchInput)
    .pressKey('delete')
    .expect(table.tableBody.childElementCount).eql(3)
});
