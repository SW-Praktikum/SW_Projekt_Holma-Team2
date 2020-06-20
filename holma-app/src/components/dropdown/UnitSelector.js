import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const units = [
  {
    value: 'Stück',
    label: 'st',
  },
  {
    value: 'Gramm',
    label: 'g',
  },
  {
    value: 'Milligramm',
    label: 'mg',
  },
  {
    value: 'Kilogramm',
    label: 'kg',
  },
  {
    value: 'Milliliter',
    label: 'ml',
  },
  {
    value: 'Liter',
    label: 'l',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [unit, setUnit] = React.useState('');

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        
        
      </div>
      
      <div>
        <TextField
          id="outlined-select-units"
          select
          label="Einheit"
          value={unit}
          onChange={handleChange}
          helperText="Bitte wählen Sie eine Einheit"
          variant="outlined"
        >
          {units.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    </form>
  );
}
