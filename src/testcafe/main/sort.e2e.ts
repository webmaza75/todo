import Table from './page-models/table';

const table = new Table();

fixture(`sort`)
  .page(`http://localhost:3000`);

test('Sort tasks desc', async t => {
  
  await t
    .expect(table.searchAscSortedInput.exists).ok()
    .click(table.searchAscSortedInput)
    .click(table.searchAscSortedInput)
    .expect(table.searchAscSortedInput.exists).notOk()
    .expect(table.searchDescSortedInput.exists).ok(); 
});

test('Sort tascs asc', async t => {
  
  await t
    .expect(table.searchAscSortedInput.exists).ok()
    .click(table.searchAscSortedInput)
    .click(table.searchAscSortedInput)
    .click(table.searchDescSortedInput)
    .expect(table.searchDescSortedInput.exists).notOk()
    .expect(table.searchAscSortedInput.exists).ok(); 
});
