import {Selector} from 'testcafe';
import {AppTable} from './app-table';

fixture(`start`)
    .page(`http://localhost:3000`);

test('My first test', async t => {
    await t
        .expect(AppTable.exists).ok();
        // .click('[data-test-id="row-1"]')
        // .expect(Selector('[data-test-id="row-1"]').innerText)
        // .eql('Auto Orica USA report setting');
});
