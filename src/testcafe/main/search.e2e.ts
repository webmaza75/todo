import {Selector} from 'testcafe';

fixture(`search`)
  .page(`http://localhost:3000`);

test('Search tasks by typed phrase', async t => {
  const searchInput = await Selector('#standard-search');
  await t
    .expect(Selector('tbody').childElementCount).eql(5)
    .typeText(searchInput, 'auto')
    .expect(Selector('tbody').childElementCount).eql(4); 
});

test('Search 0 tasks by typed phrase', async t => {
  const searchInput = await Selector('#standard-search');
  await t
    .expect(Selector('tbody').childElementCount).eql(5)
    .typeText(searchInput, '1111111111111')
    .expect(Selector('tbody').childElementCount).eql(1)
    .expect(Selector('tbody').child(0).textContent).eql('No records to display'); 
});

test('Search all tasks when searchinput is empty', async t => {
  const searchInput = await Selector('#standard-search');
  await t
    .expect(Selector('tbody').childElementCount).eql(5)
    .typeText(searchInput, '1111111111111')
    .selectText(searchInput)
    .pressKey('delete')
    .expect(Selector('tbody').childElementCount).eql(5);
});
