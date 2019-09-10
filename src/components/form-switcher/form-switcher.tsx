import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function FormSwitcher() {
  const [state, setState] = React.useState({
    checked: true
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormControlLabel
      label="Task enabled"
      style={{justifyContent: 'space-between'}}
      labelPlacement="start"
      control={
        <Switch
          checked={state.checked}
          onChange={handleChange('checked')}
          value="checked"
          color="primary"
        />
      }
    />
  );
}
