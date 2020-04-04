import Form from './page-models/form';
import Table from './page-models/table';
import Panel from './page-models/panel';

const form = new Form();
const table = new Table();
const panel = new Panel();

fixture ('Add task')
    .page ('http://localhost:3000/add');

test('Add task', async t => {
    await t
        .expect(form.stepper.exists).ok()
        .expect(form.activeStep.innerText).eql('General setting')
        .expect(form.switcher.checked).ok()
        .typeText(form.taskTitle, 'Title 1', {paste: true})
        .click(form.taskType).pressKey('enter')
        .typeText(form.timeZone, 'America/Argentina/Ushuaia UTC-3:00', {paste: true})
        .click(form.reportTime).pressKey('down').pressKey('enter')
        .typeText(form.from, 'From 1', {paste: true})
        .click(form.repeat).pressKey('down').pressKey('down').pressKey('enter')
        .typeText(form.recipient, 'Recipient 1', {paste: true})
        .click(form.btnContinue)
        .typeText(form.equipment, 'Equipment 1', {paste: true})
        .click(form.btnCreate)
        .expect(table.tableBody.childElementCount).eql(6)
});

test('Check stepper and subtitle', async t => {
    await t
        .expect(form.stepper.exists).ok()
        .expect(form.activeStep.innerText).eql('General setting')
        .expect(form.subtitle.innerText).eql('General Setting')

        .click(form.btnContinue)
        .expect(form.subtitle.innerText).eql('Configuration')
        .expect(form.completedStep.innerText).eql('General setting')
        .expect(form.activeStep.innerText).eql('Configuration')

        .click(form.btnCancel_2)
        .expect(form.activeStep.innerText).eql('General setting')
        .expect(form.subtitle.innerText).eql('General Setting')

        .click(form.btnCancel_1)
        .expect(form.stepper.exists).notOk()
        .expect(table.tableBody.childElementCount).eql(5)
});

test('Check title', async t => {
    await t
    .expect(panel.panelTitle.innerText).eql('CREATE AUTOMATED TASK')

    .click(panel.arrowBack)
    .expect(panel.panelTitle.innerText).eql('AUTOMATED TASKS')
});

test('Check content of the added task', async t => {
    await t
        .typeText(form.taskTitle, 'Title 1', {paste: true})
        .click(form.taskType).pressKey('enter')
        .typeText(form.timeZone, 'America/Argentina/Ushuaia UTC-3:00', {paste: true})
        .click(form.reportTime).pressKey('down').pressKey('enter')
        .typeText(form.from, 'From 1', {paste: true})
        .click(form.repeat).pressKey('down').pressKey('down').pressKey('enter')
        .typeText(form.recipient, 'Recipient 1', {paste: true})
        .click(form.btnContinue)
        .typeText(form.equipment, 'Equipment 1', {paste: true})
        .click(form.btnCreate)
        .expect(table.getColumn(5, 0).find('div').innerText).eql('PLM')
        .expect(table.getColumn(5, 1).innerText).eql('Title 1')
        .expect(table.getColumn(5, 2).innerText).eql('America/Argentina/Ushuaia UTC-3:00')
        .expect(table.getColumn(5, 3).innerText).eql('11:15 AM')
        .expect(table.getColumn(5, 4).innerText).eql('Weekend');
});
