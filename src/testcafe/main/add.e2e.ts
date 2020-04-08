import Form from './page-models/form';
import Table from './page-models/table';
import Panel from './page-models/panel';

const form = new Form();
const table = new Table();
const panel = new Panel();
const fields = form.fields;
const buttons = form.buttons;

fixture ('Add task')
    .page ('http://localhost:3000/add');

test('Add task', async t => {
    await t
        .expect(form.stepper.exists).ok()
        .expect(form.activeStep.innerText).eql('General setting')
        .expect(form.switcher.checked).ok()
        .typeText(fields.taskTitle, 'Title 1', {paste: true})
        .click(fields.taskType).pressKey('enter')
        .typeText(fields.timeZone, 'America/Argentina/Ushuaia UTC-3:00', {paste: true})
        .click(fields.reportTime).pressKey('down').pressKey('enter')
        .typeText(fields.from, 'From 1', {paste: true})
        .click(fields.repeat).pressKey('down').pressKey('down').pressKey('enter')
        .typeText(fields.recipient, 'Recipient 1', {paste: true})
        .click(buttons.continue)
        .typeText(fields.equipment, 'Equipment 1', {paste: true})
        .click(buttons.create)
        .expect(table.tableBody.childElementCount).eql(6)
        .expect(table.getColumn(5, 0).find('div').innerText).eql('PLM')
        .expect(table.getColumn(5, 1).innerText).eql('Title 1')
        .expect(table.getColumn(5, 2).innerText).eql('America/Argentina/Ushuaia UTC-3:00')
        .expect(table.getColumn(5, 3).innerText).eql('11:15 AM')
        .expect(table.getColumn(5, 4).innerText).eql('Weekend');
});

test('Check stepper and subtitle', async t => {
    await t
        .expect(form.stepper.exists).ok()
        .expect(form.activeStep.innerText).eql('General setting')
        .expect(form.subtitle.innerText).eql('General Setting')

        .click(buttons.continue)
        .expect(form.subtitle.innerText).eql('Configuration')
        .expect(form.completedStep.innerText).eql('General setting')
        .expect(form.activeStep.innerText).eql('Configuration')

        .click(buttons.secondStepCancel)
        .expect(form.activeStep.innerText).eql('General setting')
        .expect(form.subtitle.innerText).eql('General Setting')

        .click(buttons.firstStepCancel)
        .expect(form.stepper.exists).notOk()
        .expect(table.tableBody.childElementCount).eql(5)
});

test('Check title', async t => {
    await t
    .expect(panel.panelTitle.innerText).eql('CREATE AUTOMATED TASK')

    .click(panel.arrowBack)
    .expect(panel.panelTitle.innerText).eql('AUTOMATED TASKS')
});
