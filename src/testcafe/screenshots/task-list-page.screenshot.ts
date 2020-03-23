import Table from '../main/page-models/table';
import Panel from '../main/page-models/panel';

const table = new Table();
const panel = new Panel();

fixture('TaskListPage')
    .page('http://localhost:3000');

test('Without search screenshot', async t => {
    await t
        .takeScreenshot();
});

test('With search text screenshot', async t => {
    await t
        .typeText(panel.searchInput, 'auto')
        .takeScreenshot();
});

test('Selected 1 row screenshot', async t => {
    await t
        .click(table.tableBody.child(1))
        .takeScreenshot();
});

test('Selected 2 rows screenshot', async t => {
    await t
        .click(table.tableBody.child(0))
        .click(table.tableBody.child(2))
        .takeScreenshot();
});

test('Click add button screenshot', async t => {
    await t
        .click(panel.addIcon)
        .takeScreenshot();
});
