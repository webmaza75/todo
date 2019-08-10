import {Selector} from 'testcafe';

fixture(`select`)
  .page(`http://localhost:3000`);

test('Without select any rows', async t => {
  await t
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('Automated Tasks');
});

test('Select first row', async t => {
  await t
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('Automated Tasks')
    .click('[data-test-id="row-1"]')
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('1 Selected')
    .expect(Selector('#editIcon').exists).ok()
    .expect(Selector('#deleteIcon').exists).ok()
});

test('Select two rows', async t => {
  await t
    .click('[data-test-id="row-1"]')
    .click('[data-test-id="row-2"]')
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('2 Selected')
    .expect(Selector('#editIcon').exists).notOk()
    .expect(Selector('#deleteIcon').exists).ok()
});

test('Select twice second row', async t => {
  await t
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('Automated Tasks')
    .click('[data-test-id="row-2"]')
    .click('[data-test-id="row-2"]')
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('Automated Tasks');
});

test('Select two rows and twice click on 2-th row', async t => {
  await t
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('Automated Tasks')
    .click('[data-test-id="row-1"]')
    .click('[data-test-id="row-2"]')
    .click('[data-test-id="row-3"]')
    .click('[data-test-id="row-2"]')
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('2 Selected')
});

test('There is clearIcon when select rows', async t => {
  await t
    .click('[data-test-id="row-1"]')
    .expect(Selector('#clearIcon').exists).ok();
});

test('Click on clearIcon when selected rows to return initial', async t => {
  await t
    .click('[data-test-id="row-1"]')
    .click('[data-test-id="row-2"]')
    .click('#clearIcon')
    .expect(Selector('[data-test-id="panelTitle"]').textContent).eql('Automated Tasks');
});
