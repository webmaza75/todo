import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Grid, MenuItem, Select, Checkbox, ListItemText, FormControlLabel, Switch} from '@material-ui/core';
import {getRepeatDays} from '../../utils';

export const useStyles = makeStyles((theme: Theme) =>
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
    innerLink: {
      textDecoration: 'none',
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

// Наименования полей и подписи к ним
export enum Labels {
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
export interface IFieldProps {
  icon?: JSX.Element;
  values: IState;
  fieldName: keyof IState;
  onChange: Function;
  fullWidth?: boolean;
  select?: boolean;
  itemList?: any[];
  multiple?: boolean;
}

/**
 * Состояние формы создания/редактирования.
 */
export interface IState {
    id?: number;
    taskTitle: string;
    taskType: string;
    timeZone: string;
    reportTime: string;
    from: string;
    repeat: number[];
    recipient: string;
    equipment: string;
    enabled: boolean;
  }

/**
 * Переключатель доступности задачи
 */
export const FormSwitcher = (props) => {
  const {switcher, onChange} = props;

    return (
        <FormControlLabel
            label="Task enabled"
            style={{justifyContent: 'space-between'}}
            labelPlacement="start"
            control={
                <Switch
                    id="switcher"
                    checked={switcher}
                    onChange={onChange}
                    value={switcher}
                    color="primary"
                />
            }
        />
    );
}

/**
 * Текстовое поле, включая простой select.
 * @param {IFieldProps} props Свойства компонента.
 */
export const TextFieldComponent = (props: IFieldProps) => {
  const {values, fieldName, onChange, select = false, itemList} = props;
  const items = itemList && itemList.length ? itemList : null;

  return (<TextField
    id={fieldName}
    label={Labels[fieldName]}
    select={select}
    fullWidth={true}
    value={values[fieldName]}
    onChange={onChange(fieldName)}
  >
    {!!items &&
      items.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
  </TextField>);
};

/**
 * Поле со множественным выбором.
 * @param {IFieldProps} props Свойства компонента.
 */
export const MultiSelectFieldComponent = (props: IFieldProps) => {
  const {values, fieldName, onChange, itemList} = props;
  const items = itemList && itemList.length ? itemList : null;

  const selectedValues = fieldName === 'repeat' ?
    (selected) => getRepeatDays(selected as number[]) :
    (selected) => (selected as string[]);

  return (<Select
    id={fieldName}
    label={Labels[fieldName]}
    fullWidth={true}
    value={values[fieldName]}
    onChange={onChange(fieldName)}
    multiple
    renderValue={selectedValues}
    >
      {!!items && items.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={(values[fieldName] as number[]).includes(option.value)} />
          <ListItemText primary={option.label} />
        </MenuItem>
      ))}
    </Select>
  );
}

/** 
 * Компонент поле
 *
 * Может занимать всю ширину формы, отображаться с иконкой, быть выпадающим списком.
 */
export const FieldComponent = (props: IFieldProps) => {
  const {icon, fullWidth = false, multiple = false} = props;
  const fieldWidth = !icon ? '100%' : fullWidth ? '96%' : '43%';

  return (
    <>
      {!!icon && (
        <Grid item style={{width: '4%'}}>
          {icon}
        </Grid>
      )}
      <Grid item style={{width: fieldWidth}}>
        {!multiple && <TextFieldComponent {...props} />}
        {multiple && <MultiSelectFieldComponent {...props} />}
      </Grid>
    </>
  );
};
