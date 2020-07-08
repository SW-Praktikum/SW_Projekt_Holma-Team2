import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppAPI from '../../api/AppAPI'

class EntryEditDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            entryId: this.props.entryId,
            listEntry: this.props.listEntry,
            amount: this.props.listEntry.getAmount(),
            unit: this.props.listEntry.getUnit(),
            article: this.props.listEntry.getName(),
            purchasingUser: this.props.listEntry.getPurchasingUserId(),
            retailer: this.props.listEntry.getRetailerId(),
            standard: false,
        }        
    }

    handleChangeAmount = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                amount: e.target.valueAsNumber
            }, () => {
                this.state.listEntry.setAmount(this.state.amount)
                //console.log(this.state.listEntry)
            })   
        }
    }

    handleChangeArticle = (e) => {
        // überlegen wie wir article und deren ID ansprechen oder alles über name
        // autovorschläge für neue ListenEinträge?
        this.setState({article: e.target.value}, () => {
            this.state.listEntry.setName(this.state.article)
            //console.log(this.state.listEntry)
        })   
    }


    saveChanges = () => {
        AppAPI.getAPI().updateListEntry(this.state.listEntry)
    }

    render() {
      const { classes } = this.props;
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
      const retailer = [
          {
            value: 'Edeka',
          },
          {
            value: 'Rewe',
          },
          {
            value: 'Netto',
            },            
            {
            value: 'Penny',
            },
            {
            value: 'Lidl',
            },
            {
            value: 'Kaufland',
            },
            {
            value: 'Aldi',
            },
            {
            value: 'Real',
            },
            {
            value: 'Metro',
            },
            {
            value: 'dm',
            },
            {
            value: 'Rossmann',
            },
            {
            value: 'Norma',
            },
            {
            value: 'Müller',
            },
            {
            value: 'Tegut',
            },
            {
            value: 'Alnatura',
            },
            {
            value: 'Denn\'s',
            },
            {
            value: 'Wochenmarkt',
            },
            {
            value: 'Bauernladen',
            },
            {
            value: 'Metzger',
            },
            {
            value: 'Bäcker',
            },
            {
            value: 'Sonstige',
            },
            {
            value: 'Naturgut'

          }
      ]
      const user = [{value : "Herbert"}]
      
        return (
          <div>
            <Typography className={classes.container} align="right">
            
            </Typography>
            <Dialog className={classes.dialog} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-editEntry">Eintrag bearbeiten</DialogTitle>
              <DialogContent>
                <TextField
                    type="number"
                    value={this.state.amount}
                    onChange={this.handleChangeAmount}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Menge"
                />
                <Autocomplete
                    id="combo-unit"
                    inputValue={this.state.unit}
                    options={units} //liste der Einheiten laden
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => <TextField {...params} label="Einheit" variant="standard" />}
                />
                <TextField
                    type="text"
                    value={this.state.article}
                    onChange={this.handleChangeArticle}
                    margin="dense"
                    id="combo-article"
                    variant="standard"
                    label="Artikel"
                />
                <Autocomplete
                    id="combo-purchasingUser"
                    inputValue={this.state.purchasingUser}
                    // mit inputValue Falsche Syntax -> Fehler
                    // on Change methoden wie hier:
                    // https://codesandbox.io/s/9v197?file=/demo.js
                    options={user} //liste der beutzer der Gruppe laden
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => <TextField {...params} label="Einkäufer" variant="standard" />}
                />
                <Autocomplete
                    id="combo-retailer"
                    options={retailer} //liste der retailer laden
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => <TextField {...params} label="Händler" variant="standard" />}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  abbrechen
                </Button>
                <Button onClick={this.saveChanges} color="primary">
                  speichern
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          );
    }
}

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    //right: theme.spacing(1),
    
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    
  },
  container: {
    minWidth: 50, 
    marginRight: 215
  },

  dialog: {
    maxWidth: 350,
    margin: 'auto',
  }
});

export default withStyles(styles)(EntryEditDialog)
