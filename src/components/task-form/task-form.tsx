import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {FormControl, Grid, MenuItem} from '@material-ui/core';
import RepeatIcon from '@material-ui/icons/Repeat';
import RoomIcon from '@material-ui/icons/Room';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TodayIcon from '@material-ui/icons/Today';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import FormSwitcher from '../form-switcher/form-switcher';
import FormStepper from '../form-stepper/form-stepper';
import AppPanelForm from '../app-panel-form/app-panel-form';
import {ContextApp} from '../../reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    dense: {
      marginBottom: 20,
    },
    menu: {
      width: 200,
    },
    form: {
      width: '100%',
      marginTop: 20,
      padding: 10
    },
    switcher: {
      width: '100%'
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    defaultButton: {
      margin: theme.spacing(1),
      backgroundColor: '#fff',
      color: '#223C6E'
    },
    wrapper: {
      width: `80%`,
      margin: `auto`,
      height: 100,
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      paddingLeft: 70
    },
    formContainer: {
      width: `80%`,
      margin: `auto`,
      marginBottom: 20,
      padding: 20,
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.32)`
    }
  }),
);

const itemList = [{label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}];

// Наименования полей и подписи к ним
enum Labels {
  taskTitle = 'Task Title',
  taskType = 'Task Type',
  timeZone = 'Time Zone',
  reportTime = 'Report Time',
  from = 'From',
  repeat = 'Repeat',
  recipient = 'Recipient',
  equipment = 'Equipment',
};

/**
 * Свойства текстового поля
 * 
 * @prop {JSX.Element} [icon] Иконка.
 * @prop {IState} values Состояние компонента TaskForm.
 * @prop {keyof IState} fieldName Имя поля.
 * @prop {Function} onChange Обработчик изменения значения в поле.
 * @prop {boolean} [fullWidth] Флаг, задать ли компоненту максимальную ширину.
 * @prop {boolean} [select] Флаг, используется ли компонент для выбора значений из выпадающего списка.
 * @prop {any[]} [itemList] Массив значений для выпадающего списка.
 */
interface ITextFieldProps {
  icon?: JSX.Element;
  values: IState;
  fieldName: keyof IState;
  onChange: Function;
  fullWidth?: boolean;
  select?: boolean;
  itemList?: any[];
}

/** 
 * Компонент Текстовое поле
 *
 * Может занимать всю ширину формы, отображаться с иконкой, быть выпадающим списком.
 */
const TextFieldComponent = (props: ITextFieldProps) => {
  const {icon, values, fieldName, onChange, fullWidth = false, select = false, itemList} = props;
  const fieldWidth = !icon ? '100%' : fullWidth ? '96%' : '43%';
  const items = itemList && itemList.length ? itemList : null;

  return (
    <>
      {!!icon && (
        <Grid item style={{width: '4%'}}>
          {icon}
        </Grid>
      )}
      <Grid item style={{width: fieldWidth}}>
        <TextField
          id={fieldName}
          label={Labels[fieldName]}
          select={select}
          fullWidth={true}
          value={values[fieldName]}
          onChange={onChange(fieldName)}
        >
          {!!items && (
            items.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          )}
        </TextField> 
      </Grid>
    </>
  );
};

interface IState {
  taskTitle: string;
  taskType: string;
  timeZone: string;
  reportTime: string;
  from: string;
  repeat: string;
  recipient: string;
  equipment: string;
}

const TaskForm = () => {
  const {addTask} = React.useContext(ContextApp);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState<IState>({
    taskTitle: '',
    taskType: '',
    timeZone: '',
    reportTime: '',
    from: '',
    repeat: '',
    recipient: '',
    equipment: ''
  });

  const handleSave = () => {
    const value = {
      id: 6,
      type: `MPM auto weekly report task`,
      title: `Orica USA`,
      timeZone: `Africa/Johannesburg UTC+2:00`,
      reportTime: `Wed Jul 17 2019 09:30:13 GMT+0300`,
      repeat: [1]
    };
    addTask(value);
  }

  const handleChange = (name: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [name]: event.target.value});
  };

  const renderFirstStep = () => {
    return <>
      <FormControl fullWidth>
        <FormSwitcher />
      </FormControl>
  
      <div className={classes.dense}>
        <TextFieldComponent fieldName='taskTitle' values={values} onChange={handleChange} fullWidth={true} />
      </div>

      {/* Task Type */}
      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          <TextFieldComponent icon={<TodayIcon />} fieldName='taskType' values={values} onChange={handleChange} select={true} itemList={itemList} fullWidth={true} />
        </Grid>
      </div>

      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* Time Zone */}
          <TextFieldComponent icon={<RoomIcon />} fieldName='timeZone' values={values} onChange={handleChange} />

          <Grid item style={{width: '6%'}}> </Grid>
        
          {/* Report Time */}
          <TextFieldComponent icon={<ScheduleIcon />} fieldName='reportTime' values={values} onChange={handleChange} select={true} itemList={itemList} />
        </Grid>
      </div>

      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* From */}
          <TextFieldComponent icon={<TodayIcon />} fieldName='from' values={values} onChange={handleChange} />

          <Grid item style={{width: '6%'}}> </Grid>

          {/* Repeat */}
          <TextFieldComponent icon={<RepeatIcon />} fieldName='repeat' values={values} onChange={handleChange} select={true} itemList={itemList} />
        </Grid>
      </div>

      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* Recipient */}
          <TextFieldComponent icon={<PersonIcon />} fieldName='recipient' values={values} onChange={handleChange} fullWidth={true} />
        </Grid>
      </div>
  
      <div>
        <Link to='/' >
          <Button variant="contained" className={classes.defaultButton}>
            Cancel
          </Button>
        </Link>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => setActiveStep(1)}>
          Continue
        </Button>
      </div>
    </>;
  }

  const renderSecondStep = () => {
    return <>
      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* Equipment */}
          <TextFieldComponent icon={<PersonIcon />} fieldName='equipment' values={values} onChange={handleChange} fullWidth={true} />
        </Grid>
      </div>
      <div>
        <Button variant="contained" className={classes.defaultButton} onClick={() => setActiveStep(0)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSave}>
          Create
        </Button>
      </div>
    </>;
  }

  const renderForm = () => {
    return activeStep ? renderSecondStep() : renderFirstStep();
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
