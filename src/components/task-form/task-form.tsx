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

import FormSwitcher from '../form-switcher/form-switcher';
import FormStepper from '../form-stepper/form-stepper';
import AppPanelForm from '../app-panel-form/app-panel-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: 'auto',
      marginRight: 'auto'
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

interface IProps {
}

interface State {
  taskTitle: string;
  taskType: string;
  timeZone: string;
  reportTime: string;
  from: string;
  repeat: string;
  recipient: string;
  equipment: string;
}

const TaskForm = (props: IProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState<State>({
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
    console.log(`values`, values);
    return values;
  }

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [name]: event.target.value});
  };

  const renderFirstStep = () => {
    return <><FormControl fullWidth>
    <FormSwitcher />
  </FormControl>
  
  <div className={classes.dense}>
    <TextField
      id="taskTitle"
      label="Task Title"
      className={classes.textField}
      margin="normal"
      fullWidth
      value={values.taskTitle}
      onChange={handleChange('taskTitle')}
    />
  </div>

  {/* Task Type */}
  <div className={classes.dense}>
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item style={{width: '4%'}}>
        <TodayIcon />
      </Grid>
      <Grid item style={{width: '96%'}}>
        <TextField
          id="taskType"
          select
          label="Task Type"
          fullWidth
          value={values.taskType}
          onChange={handleChange('taskType')}
        >
          {[{label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}].map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  </div>

  <div className={classes.dense}>
    <Grid container spacing={1} alignItems="flex-end">
      {/* Time Zone */}
      <Grid item style={{width: '4%'}}>
        <RoomIcon />
      </Grid>
      <Grid item style={{width: '43%'}}>
        <TextField
          id="timeZone"
          label="Time Zone"
          fullWidth
          value={values.timeZone}
          onChange={handleChange('timeZone')}
        />
      </Grid>

      <Grid item style={{width: '6%'}}> </Grid>

      {/* Report Time */}
      <Grid item style={{width: '4%'}}>
        <ScheduleIcon />
      </Grid>
      <Grid item style={{width: '43%'}}>
        <TextField
          id="reportTime"
          select
          label="Report Time"
          fullWidth
          value={values.reportTime}
          onChange={handleChange('reportTime')}
        >
          {[{label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}].map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  </div>

  <div className={classes.dense}>
    <Grid container spacing={1} alignItems="flex-end">
      {/* From */}
      <Grid item style={{width: '4%'}}>
        <TodayIcon />
      </Grid>
      <Grid item style={{width: '43%'}}>
        <TextField
          id="from"
          label="From"
          fullWidth
          value={values.from}
          onChange={handleChange('from')}
        />
      </Grid>
      <Grid item style={{width: '6%'}}> </Grid>

      {/* Repeat */}
      <Grid item style={{width: '4%'}}>
        <RepeatIcon />
      </Grid>
      <Grid item style={{width: '43%'}}>
        <TextField
          id="repeat"
          select
          label="Repeat"
          fullWidth
          value={values.repeat}
          onChange={handleChange('repeat')}
        >
          {[{label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}].map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  </div>

  <div className={classes.dense}>
    <Grid container spacing={1} alignItems="flex-end">
      {/* Recipient */}
      <Grid item style={{width: '4%'}}>
        <PersonIcon />
      </Grid>
      <Grid item style={{width: '96%'}}>
        <TextField
          id="recipient"
          label="Recipient"
          fullWidth
          value={values.recipient}
          onChange={handleChange('recipient')}
        />
      </Grid>
    </Grid>
  </div>
  
  <div>
    <Button variant="contained" className={classes.defaultButton} onClick={() => setActiveStep(0)}>
      Cancel
    </Button>
    <Button variant="contained" color="primary" className={classes.button} onClick={() => setActiveStep(1)}>
      Continue
    </Button>
  </div></>;
  }

  const renderSecondStep = () => {
    return <>
      <div className={classes.dense}>
        <Grid container spacing={1} alignItems="flex-end">
          {/* Equipment */}
          <Grid item style={{width: '4%'}}>
            <PersonIcon />
          </Grid>
          <Grid item style={{width: '96%'}}>
            <TextField
              id="equipment"
              label="Equipment"
              fullWidth
              value={values.equipment}
              onChange={handleChange('equipment')}
            />
          </Grid>
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
