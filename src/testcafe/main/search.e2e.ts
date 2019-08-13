import Table from './page-models/table';
import Panel from './page-models/panel';

const table = new Table();
const panel = new Panel();

fixture(`search`)
  .page(`http://localhost:3000`);

test('Search tasks by typed phrase', async t => {
  const searchText = 'auto';

  await t.expect(table.tableBody.childElementCount).eql(5);
  await panel.typeSearchText(searchText);
  await t.expect(table.tableBody.childElementCount).eql(4); 
});

test('Search 0 tasks by typed phrase', async t => {
  const searchText = '1111111111111';

  await t.expect(table.tableBody.childElementCount).eql(5);
  await panel.typeSearchText(searchText);
  await t.expect(table.tableBody.childElementCount).eql(1);
  await t.expect(table.tableBody.child(0).textContent).eql(table.emptyTableRowListText); 
});

test('Search all tasks when searchinput is empty', async t => {
  const searchText = '1111111111111';

  await t.expect(table.tableBody.childElementCount).eql(5);
  await panel.typeSearchText(searchText);
  await panel.resetSearchText();
  await t.expect(table.tableBody.childElementCount).eql(5);
});
