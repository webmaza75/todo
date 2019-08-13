import Table from './page-models/table';
import Panel from './page-models/panel';

const table = new Table();
const panel = new Panel();

fixture(`select`)
  .page(`http://localhost:3000`);

test('Without select any rows', async t => {
  await t
    .expect(panel.panelTitle.textContent).eql('Automated Tasks');
});

test('Select first row', async t => {
  await t
    .expect(panel.panelTitle.textContent).eql('Automated Tasks')
    .click(table.tableBody.child(0))
    .expect(panel.panelTitle.textContent).eql('1 Selected')
    .expect(panel.editIcon.exists).ok()
    .expect(panel.deleteIcon.exists).ok()
});

test('Select two rows', async t => {
  await t
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .expect(panel.panelTitle.textContent).eql('2 Selected')
    .expect(panel.editIcon.exists).notOk()
    .expect(panel.deleteIcon.exists).ok()
});

test('Select twice second row', async t => {
  await t
    .expect(panel.panelTitle.textContent).eql('Automated Tasks')
    .click(table.tableBody.child(1))
    .click(table.tableBody.child(1))
    .expect(panel.panelTitle.textContent).eql('Automated Tasks');
});

test('Select two rows and twice click on 2-th row', async t => {
  await t
    .expect(panel.panelTitle.textContent).eql('Automated Tasks')
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .click(table.tableBody.child(2))
    .click(table.tableBody.child(1))
    .expect(panel.panelTitle.textContent).eql('2 Selected')
});

test('There is clearIcon when select rows', async t => {
  await t
    .click(table.tableBody.child(0))
    .expect(panel.clearIcon.exists).ok();
});

test('Click on clearIcon when selected rows to return initial', async t => {
  await t
    .click(table.tableBody.child(0))
    .click(table.tableBody.child(1))
    .click(panel.clearIcon)
    .expect(panel.panelTitle.textContent).eql('Automated Tasks');
});
