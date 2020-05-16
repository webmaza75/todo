import * as React from 'react';
import {FormControl, Grid} from '@material-ui/core';
import RepeatIcon from '@material-ui/icons/Repeat';
import RoomIcon from '@material-ui/icons/Room';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TodayIcon from '@material-ui/icons/Today';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import FormStepper from '../form-stepper/form-stepper';
import AppPanelForm from '../app-panel-form/app-panel-form';
import {ContextApp} from '../../reducer';
import {taskTypeList} from '../../mocks/taskTypeList';
import {repeatDays} from '../../mocks/repeatDays';
import {reportTimeList} from '../../mocks/reportTimeList';
import {IState, useStyles, FieldComponent, FormSwitcher} from '../field-components/field-components';
import {TaskItem} from '../../types';

/**
 * Получение начального состояния формы.
 *
 * @param idTask id редактируемой задачи.
 * @param taskList Список задач.
 */
const getInitialFormValues = (idTask, taskList) => {
  const emptyTask: IState = {
    taskTitle: '',
    taskType: '',
    timeZone: '',
    reportTime: '',
    from: '',
    repeat: [],
    recipient: '',
    equipment: '',
    enabled: true,
  };

  if (idTask >= 0) {
    const searchedTask = taskList.find(({id}) => id === idTask);

    return searchedTask ?
      {
        id: searchedTask.id,
        taskTitle: searchedTask.title,
        enabled: searchedTask.enabled,
        taskType: searchedTask.type,
        timeZone: searchedTask.timeZone,
        reportTime: searchedTask.reportTime,
        from: searchedTask.from,
        repeat: searchedTask.repeat,
        recipient: searchedTask.recipient,
        equipment: searchedTask.equipment,
      } : emptyTask;
  }

  return emptyTask;
};

/**
 * 
 * @param idTask 
 * @param taskList 
 */
const getInitialStateSwitcher = (idTask, taskList) => {
  const searchedTask = taskList.find(({id}) => id === idTask);

  if (searchedTask) {
    return searchedTask.enabled;
  }

  return true;
};

/**
 * Свойства компонента, передаваемые через Route.
 *
 * @prop {any} match TODO Указать правильный тип.
 */
interface IProps {
  match: any;
}

const TaskForm = (props) => {
  const {history} = props;
  const {actions, taskList} = React.useContext(ContextApp);
  const id = parseInt(props.match.params.id, 10);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [switcher, setSwitcher] = React.useState(getInitialStateSwitcher(id, taskList));
  const [values, setValues] = React.useState<IState>(getInitialFormValues(id, taskList));

  /**
   * TODO убрать хардкод
   */
  const handleSave = () => {
    const editMode: boolean = !!values.id && values.id >= 0;
    const newTask: TaskItem = {
      id: !!values.id && values.id >= 0 ? values.id : taskList.length + 1,
      title: values.taskTitle,
      enabled: switcher,
      type: values.taskType,
      timeZone: values.timeZone,
      reportTime: values.reportTime,
      from: values.from,
      repeat: values.repeat,
      recipient: values.recipient,
      equipment: values.equipment,
    };

    if (editMode) {
      actions.editTask(newTask);
    } else {
      actions.addTask(newTask);
    }

    history.push("/");
  }

  const handleChange = (name: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [name]: event.target.value});
  };

  const handleChangeSwitcher = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitcher(event.target.checked);
  };

  const FirstStep = () => {
    return <>
      <FormControl fullWidth>
        <FormSwitcher switcher={switcher} onChange={handleChangeSwitcher} />
      </FormControl>
  
      <div className={classes.dense}>
        <FieldComponent fieldName='taskTitle' values={values} onChange={handleChange} fullWidth={true} />
      </div>

      {/* Task Type */}
      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          <FieldComponent icon={<TodayIcon />} fieldName='taskType' values={values} onChange={handleChange} select={true} itemList={taskTypeList} fullWidth={true} />
        </Grid>
      </div>

      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* Time Zone */}
          <FieldComponent icon={<RoomIcon />} fieldName='timeZone' values={values} onChange={handleChange} />

          <Grid item style={{width: '6%'}}> </Grid>
        
          {/* Report Time */}
          <FieldComponent icon={<ScheduleIcon />} fieldName='reportTime' values={values} onChange={handleChange} select={true} itemList={reportTimeList} />
        </Grid>
      </div>

      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* From */}
          <FieldComponent icon={<TodayIcon />} fieldName='from' values={values} onChange={handleChange} />

          <Grid item style={{width: '6%'}}> </Grid>

          {/* Repeat */}
          <FieldComponent icon={<RepeatIcon />} fieldName='repeat' values={values} onChange={handleChange} select={true} multiple={true} itemList={repeatDays} />
        </Grid>
      </div>

      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* Recipient */}
          <FieldComponent icon={<PersonIcon />} fieldName='recipient' values={values} onChange={handleChange} fullWidth={true} />
        </Grid>
      </div>
  
      <div>
        <Link to='/' className={classes.innerLink}>
          <Button variant="contained" className={classes.defaultButton} id="firstStepBtnCancel">
            Cancel
          </Button>
        </Link>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => setActiveStep(1)} id="continue">
          Continue
        </Button>
      </div>
    </>;
  }

  const SecondStep = () => {
    return <>
      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* Equipment */}
          <FieldComponent icon={<PersonIcon />} fieldName='equipment' values={values} onChange={handleChange} fullWidth={true} />
        </Grid>
      </div>
      <div>
        <Button variant="contained" className={classes.defaultButton} onClick={() => setActiveStep(0)} id="secondStepBtnCancel">
          Cancel
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSave} id="save">
          Create
        </Button>
      </div>
    </>;
  }

  const renderForm = () => {
    return activeStep ? <SecondStep /> : <FirstStep />;
  }

  const title = !activeStep ? 'General Setting' : 'Configuration';

  return (
    <>
      <AppPanelForm />
      <FormStepper activeStep={activeStep} />
      <div className={classes.formContainer}>
        <h2>{title}</h2>
        <div className={classes.container}>
            <form noValidate autoComplete="off" className={classes.form}>
              {renderForm()}
            </form>
        </div>
      </div>
    </>
  );
}

export default TaskForm;
