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
import ListEntryBO from '../../api/ListEntryBO';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppAPI from '../../api/AppAPI'


class EntryAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            amount: 0,
            unit: "",
            article: "",
        }        
    }
    
    _handleClick = () => {
      //this.props.addGroup();
    };

    handleChangeAmount = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                amount: e.target.valueAsNumber
            }) 
        }
    }

    handleChangeArticle = (e) => {
        this.setState({article: e.target.value})
        // check if article exists -> if yes use that one with its id
        // else: create new article
        // wie mit article name/id was wie abspeichern und wie drauf zugreifen?
    }


    saveChanges = () => {
        // 
        var liEtry = new ListEntryBO(0, this.state.amount, this.state.unit, 0, 1004, 3000, 0, "", 0)
        liEtry.setName(this.state.article)
        console.log(liEtry)
        AppAPI.getAPI().createListEntries(liEtry)
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
      const { classes } = this.props;
        return (
          <div>
            <Typography className={classes.container} align="right">
            <Fab onClick={this.props.openDialog} className={classes.root} variant="extended" color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon}/>
                neuer Listeneintrag
            </Fab>
            </Typography>
            <Dialog className={classes.dialog} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neuer Listeneintrag</DialogTitle>
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
                    getOptionLabel={(option) => option.label}
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
                
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  abbrechen
                </Button>
                <Button onClick={this.saveChanges} color="primary">
                  hinzufügen
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
    marginRight: 222
  },

  dialog: {
    maxWidth: 350,
    margin: 'auto',
  }
});

export default withStyles(styles)(EntryAddDialog)
