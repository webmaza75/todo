import {Selector} from 'testcafe';

fixture(`sort`)
  .page(`http://localhost:3000`);

test('Sort tasks desc', async t => {
  const searchAscSortedInput = await Selector('.MuiTableSortLabel-iconDirectionAsc');
  const searchDescSortedInput = await Selector('.MuiTableSortLabel-iconDirectionDesc', {visibilityCheck: true});
  
  await t
    .expect(Selector(searchAscSortedInput).exists).ok()
    .click(searchAscSortedInput)
    .click(searchAscSortedInput)
    .expect(searchAscSortedInput.exists).notOk()
    .expect(searchDescSortedInput.exists).ok(); 
});

test('Sort tascs asc', async t => {
  const searchAscSortedInput = await Selector('.MuiTableSortLabel-iconDirectionAsc');
  const searchDescSortedInput = await Selector('.MuiTableSortLabel-iconDirectionDesc', {visibilityCheck: true});
  
  await t
    .expect(Selector(searchAscSortedInput).exists).ok()
    .click(searchAscSortedInput)
    .click(searchAscSortedInput)
    .click(searchDescSortedInput)
    .expect(searchDescSortedInput.exists).notOk()
    .expect(searchAscSortedInput.exists).ok(); 
});
