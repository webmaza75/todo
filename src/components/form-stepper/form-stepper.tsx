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

interface IProps {
  activeStep: number;
}

export default function FormStepper(props: IProps) {
  const classes = useStyles();
  const {activeStep} = props;
  const steps = ['General setting', 'Configuration'];

  return (
    <div className={classes.panel}>
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Stepper nonLinear activeStep={activeStep} id="stepper">
            {steps.map(label => (
              <Step key={label}>
                <StepLabel id={label === steps[0] ? 'step-1' : 'step-2'} completed={activeStep === 1 && label === steps[0]}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </div>
  );
}
