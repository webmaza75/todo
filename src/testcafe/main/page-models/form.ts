import {Selector, t} from 'testcafe';

export default class Form {
    stepper: any;
    switcher: any;
    activeStep: any;
    completedStep: any;
    subtitle: any;
    taskTitle: any;
    taskType: any;
    timeZone: any;
    reportTime: any;
    from: any;
    repeat: any;
    recipient: any;
    equipment: any;
    btnCancel_1: any;
    btnCancel_2: any;
    btnContinue: any;
    btnCreate: any;

    constructor() {
        this.stepper = Selector('#stepper');
        this.switcher = Selector('#switcher');
        this.activeStep = Selector('.MuiStepLabel-active');
        this.completedStep = Selector('.MuiStepLabel-completed');
        this.subtitle = Selector('h2');
        this.taskTitle = Selector('#taskTitle');
        this.taskType = Selector('#taskType');
        this.timeZone = Selector('#timeZone');
        this.reportTime = Selector('#reportTime');
        this.from = Selector('#from');
        this.repeat = Selector('#repeat');
        this.recipient = Selector('#recipient');
        this.equipment = Selector('#equipment');
        this.btnCancel_1 = Selector('#cancel-1');
        this.btnCancel_2 = Selector('#cancel-2');
        this.btnContinue = Selector('#continue');
        this.btnCreate = Selector('#save');
    }
}