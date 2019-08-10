import {Selector} from 'testcafe';

fixture(`delete`)
  .page(`http://localhost:3000`);

test('Confirm delete tasks', async t => {
  const tableBody = await Selector('tbody');
  const deleteIcon = await Selector('#deleteIcon', {visibilityCheck: true});
  const confirmDelete = await Selector('#confirmDelete', {visibilityCheck: true});
  const snackBarForUndoDelete = await Selector('#snackBarForUndoDelete');
  const undoDelete = await Selector('#undoDelete');

  await t
    .expect(tableBody.childElementCount).eql(5)
    .click(tableBody.child(0))
    .click(tableBody.child(1))
    .click(deleteIcon)
    .click(confirmDelete)
    .expect(snackBarForUndoDelete.exists).ok()
    .expect(undoDelete.exists).ok()
    .expect(tableBody.childElementCount).eql(3);
});

test('Cancel delete tasks', async t => {
  const tableBody = await Selector('tbody');
  const deleteIcon = await Selector('#deleteIcon', {visibilityCheck: true});
  const cancelDelete = await Selector('#cancelDelete', {visibilityCheck: true});

  await t
    .expect(tableBody.childElementCount).eql(5)
    .click(tableBody.child(0))
    .click(tableBody.child(1))
    .click(deleteIcon)
    .click(cancelDelete)
    .expect(tableBody.childElementCount).eql(5);
});

test('Delete searched tasks', async t => {
  const searchInput = await Selector('#standard-search');
  const tableBody = await Selector('tbody');
  const deleteIcon = await Selector('#deleteIcon', {visibilityCheck: true});
  const confirmDelete = await Selector('#confirmDelete', {visibilityCheck: true});

  await t
    .typeText(searchInput, 'auto')
    .click(tableBody.child(0))
    .click(tableBody.child(1))
    .click(deleteIcon)
    .click(confirmDelete)
    .expect(searchInput.value).eql('auto')
    .expect(tableBody.childElementCount).eql(2)
});

// 5 -> 4 -> 2 -> 1 -> 2
// search with 'auto' -> delete 2 selected rows (confirm) -> delete 1 selected row -> clear searched text
test('Delete searched tasks 2 times', async t => {
  const searchInput = await Selector('#standard-search');
  const tableBody = await Selector('tbody');
  const deleteIcon = await Selector('#deleteIcon', {visibilityCheck: true});
  const confirmDelete = await Selector('#confirmDelete', {visibilityCheck: true});

  await t
    .typeText(searchInput, 'auto')
    .click(tableBody.child(0))
    .click(tableBody.child(1))
    .click(deleteIcon)
    .click(confirmDelete)
    .click(tableBody.child(0))
    .click(deleteIcon)
    .click(confirmDelete)
    .selectText(searchInput)
    .pressKey('delete')
    .expect(tableBody.childElementCount).eql(2)
});

// Delete last searched row, confirm, exact delete;
// select 2 first rows, delete, confirm;
// clear searchinput
test('Exact delete searched rows, again delete and clear searchInput', async t => {
  const searchInput = await Selector('#standard-search');
  const tableBody = await Selector('tbody');
  const deleteIcon = await Selector('#deleteIcon', {visibilityCheck: true});
  const confirmDelete = await Selector('#confirmDelete', {visibilityCheck: true});
  const closeSnackbar = await Selector('#closeSnackbar', {visibilityCheck: true});

  await t
    .typeText(searchInput, 'auto')
    .click(tableBody.child(3))
    .click(deleteIcon)
    .click(confirmDelete)
    .click(closeSnackbar)
    .click(tableBody.child(0))
    .click(tableBody.child(1))
    .click(deleteIcon)
    .click(confirmDelete)
    .selectText(searchInput)
    .pressKey('delete')
    .expect(tableBody.childElementCount).eql(2)
});

// Delete 1 searched row, confirm, exact delete;
// select 2 first rows, delete, confirm, undo delete;
// select 1 row, delete, confirm, exact delete;
// clear searchinput
// select first row, delete, undo;
test('Exact delete searched rows, again delete, undo, clear searchInput, again exact delete, undo delete', async t => {
  const searchInput = await Selector('#standard-search');
  const tableBody = await Selector('tbody');
  const deleteIcon = await Selector('#deleteIcon', {visibilityCheck: true});
  const confirmDelete = await Selector('#confirmDelete', {visibilityCheck: true});
  const closeSnackbar = await Selector('#closeSnackbar', {visibilityCheck: true});
  const undoDelete = await Selector('#undoDelete');

  await t
    .typeText(searchInput, 'auto')
    .click(tableBody.child(2))
    .click(deleteIcon)
    .click(confirmDelete)
    .click(closeSnackbar)
    .click(tableBody.child(0))
    .click(tableBody.child(2))
    .click(deleteIcon)
    .click(confirmDelete)
    .click(undoDelete)
    .click(tableBody.child(1))
    .click(deleteIcon)
    .click(confirmDelete)
    .click(closeSnackbar)
    .selectText(searchInput)
    .pressKey('delete')
    .expect(tableBody.childElementCount).eql(3)
});
