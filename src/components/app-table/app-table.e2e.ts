import {Selector} from 'testcafe';

fixture(`start`)
    .page(`http://localhost:3000`);

test('My first test', async t => {
    await t
        // .expect(AppTable.length).eql(1);
        // .click('[data-test-id="row-1"]')
        .expect(Selector('[data-test-id="row-1"]').innerText)
        .eql('Auto Orica USA report setting');
});
