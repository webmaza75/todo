import * as React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
      paddingLeft: 100,
      paddingRight: 100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    panel: {
      width: '100%',
      position: 'sticky',
      height: 64,
      backgroundColor: `#223C6E`,
    },
    wrapper: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: `white`,
    }
  }),
);

export default function FormStepper() {
  const classes = useStyles();
  const [activeStep/*, setActiveStep*/] = React.useState(0);
  const steps = ['General setting', 'Configuration'];

  // function handleNext() {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // }

  // function handleBack() {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // }

  // function handleReset() {
  //   setActiveStep(0);
  // }

  return (
    <div className={classes.panel}>
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </div>
  );
}
