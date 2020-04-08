import {Selector, t} from 'testcafe';

export default class Form {
    stepper: any;
    switcher: any;
    activeStep: any;
    completedStep: any;
    subtitle: any;
    fields: any;
    buttons: any;

    constructor() {

        this.stepper = Selector('#stepper');
        this.switcher = Selector('#switcher');
        this.activeStep = Selector('.MuiStepLabel-active');
        this.completedStep = Selector('.MuiStepLabel-completed');
        this.subtitle = Selector('h2');
        this.fields = {
            taskTitle: Selector('#taskTitle'),
            taskType: Selector('#taskType'),
            timeZone: Selector('#timeZone'),
            reportTime: Selector('#reportTime'),
            from: Selector('#from'),
            repeat: Selector('#repeat'),
            recipient: Selector('#recipient'),
            equipment: Selector('#equipment'),
        };
        this.buttons = {
            firstStepCancel: Selector('#firstStepBtnCancel'),
            secondStepCancel: Selector('#secondStepBtnCancel'),
            continue: Selector('#continue'),
            create: Selector('#save'),
        };
    }
}