import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';

//transaction list im Bankbeispiel dazu anschauen

class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            open: false,
            amount: "",
            product: "",
            standard: false,
        }
  };    


        setOpen = () => {
            if (this.state.open === false)
                this.setState({open: true})
            else
                this.setState({open: false})
        }

        setStandard = () => {
            if(this.state.standard === false)
                this.setState({standard: true})
                //add as Standard article
            else
                this.setStandard({standard: false})
                //remove from standard
        }   

        handleChangeCheck = (e) => {
            this.setState({checked: e.target.checked})
        }

        handleChangeAmount = (e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({amount: e.target.value})
            }
        }

        handleChangeProduct = (e) => {
            this.setState({product: e.target.value})
        }

    render() {
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
          const user = "Herbert";
          const retailer = "Edeka"
          const lastUpdated ="22-06-20-14:45"
        return (
            <React.Fragment>
                <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={this.state.checked}
                        onChange={this.handleChangeCheck}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </TableCell>

                <TableCell align='center'>
                    <TextField
                        type="number"
                        value={this.state.amount}
                        onChange={this.handleChangeAmount}
                        margin="dense"
                        id="outlined-basic"
                        variant="standard"
                        label="Menge"
                        style={{ width: 60 }}
                    />
                </TableCell>

                <TableCell align='center' component='th' scope='row'>
                    <Autocomplete
                        id="combo-box-demo"
                        options={units}
                        getOptionLabel={(option) => option.value}
                        style={{ width: 140 }}
                        renderInput={(params) => <TextField {...params} label="Einheit" variant="standard" />}
                    />
                </TableCell>

                <TableCell align='center'>
                    <TextField
                        type="text"
                        onChange={this.handleChangeProduct}
                        margin="dense"
                        id="outlined-basic"
                        variant="standard"
                        label="Artikel"
                        style={{ width: 140 }}
                    />
                </TableCell>
                
                <TableCell align='right'>
                    <IconButton aria-label="expand row" size="small" onClick={() => this.setStandard(this.state.standard)}>
                        {this.state.standard ?  <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                </TableCell>

                <TableCell align='right'>
                    <DeleteIcon/>
                </TableCell>

                <TableCell align='right'>
                    <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(this.state.open)}>
                        {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                </TableRow>
                <Collapse in={this.state.open}>
                    <TableRow>
                    <TableCell align='left'>
                        <b>Einkäufer: </b>{user}
                    </TableCell>
                    
                    <TableCell align='left'>
                        <b>Einzelhändler: </b>{retailer}
                    </TableCell>

                    <TableCell align='left'>
                        <b>geändert: </b>{lastUpdated}
                    </TableCell>

                    </TableRow>
                </Collapse>
            </React.Fragment>
  );
}}

export default ListEntry;