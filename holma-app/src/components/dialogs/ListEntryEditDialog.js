import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import AppAPI from '../../api/AppAPI'
import ArticleAddDialog from './ArticleAddDialog'

class ListEntryEditDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            entryId: this.props.entryId,
            listEntry: this.props.listEntry,
            amount: this.props.listEntry.getAmount(),
            unit: this.props.listEntry.getUnit(),
            article: {name: this.props.listEntry.getName(), value: 5000},
            purchasingUser: this.props.listEntry.getPurchasingUserId(),
            retailer: this.props.listEntry.getRetailerId(),
            standard: false,
            user: {name : "Herbert", value: 1000},
            articleAddDialogOpen: false
          }        
    }

    handleChangeAmount = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                amount: e.target.valueAsNumber
            })
            this.state.listEntry.setAmount(this.state.amount)
            //console.log(this.state.listEntry)
               
        }
    }

    handleChangeArticle = (e) => {
        // überlegen wie wir article und deren ID ansprechen oder alles über name
        // autovorschläge für neue ListenEinträge?
        this.setState({article: e.target.value})
        this.state.listEntry.setName(this.state.article)
            //console.log(this.state.listEntry)   
    }

    saveChanges = () => {
        AppAPI.getAPI().updateListEntry(this.state.listEntry)
        //AppAPI.getAPI().createListEntry(this.state.listEntry)
        console.log(this.state.listEntry)
    }

    setInputValue = (e) => {
      console.log(e)
      this.setState({
          inputValue: e
      })
    }

    openArticleAddDialog= (e) => {
      console.log(e)
      this.setState({
        articleAddDialogOpen: e
      })
    }

    setUser = (e) => {
      this.setState({
          user: e
      })
    } 

    setArticle = (e) => {
      this.setState({
          article: e
      })
    } 


    render() {
      const filter = createFilterOptions();

      const { classes } = this.props;
      const { articleAddDialogOpen } = this.state;
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
      const users = [{name : "Herbert", value: 1000}, {name : "Markus", value: 1001}]
      const articles = [{name : "Brot", value: 5001}, {name : "Banane", value: 5002}]

        return (
          <div>
            <Typography className={classes.container} align="right">
            
            </Typography>
            <Dialog className={classes.dialog} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-editEntry">Eintrag bearbeiten</DialogTitle>
              <DialogContent>

                {/* Anzahl */}
                <TextField
                    type="number"
                    value={this.state.amount}
                    onChange={this.handleChangeAmount}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Menge"
                />

                {/* Einheit */}
                <Autocomplete
                    id="combo-unit"
                    inputValue={this.state.unit}
                    options={units} //liste der Einheiten laden
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Einheit" variant="standard" />}
                />

                {/* Artikel */}
                <Autocomplete
                    //not working yet
                    freeSolo
                    options={articles} //Artikel laden
                    //onChange={(event, newValue) => this.setUser(newValue)}
                    onChange={(event, newValue) => {
                      if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                          this.openArticleAddDialog(true);
                          this.setNewArticleDialogValue({
                            name: newValue,
                            value: '',
                          });
                        });
                      } else if (newValue && newValue.inputValue) {
                        this.openArticleAddDialog(true);
                        this.setNewArticleDialogValue({
                          name: newValue.inputValue,
                          value: '',
                        });
                      } else {
                        this.setArticle(newValue);
                      }
                    }}

                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: "Add " + params.inputValue,
                        });
                      }
                      return filtered;
                    }}

                    getOptionLabel={(option) => {
                      // e.g value selected with enter, right from the input
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.name;
                    }}
                    defaultValue={this.state.article}
                    renderInput={(params) => <TextField {...params} label="Einkäufer" variant="standard" placeholder="Test" />}
                />

                {/* Einkäufer */}
                <Autocomplete
                    //not working yet
                    freeSolo
                    options={users} //liste der beutzer der Gruppe laden
                    //onChange={(event, newValue) => this.setUser(newValue)}
                    onChange={(event, newValue) => {this.setUser(newValue)}}
                    getOptionLabel={(option) => option.name}
                    defaultValue={this.state.user}
                    renderInput={(params) => <TextField {...params} label="Einkäufer" variant="standard" placeholder="Test" />}
                />

                {/* Retailer */}
                <Autocomplete
                    id="combo-retailer"
                    options={retailer} //liste der retailer laden
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" label="Händler" placeholder="Favorites" />
                    )}                
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
            <ArticleAddDialog 
              articleAddDialogOpen={articleAddDialogOpen} 
              openArticleAddDialog={this.openArticleAddDialog} 
              setNewArticleDialogValue={this.setNewArticleDialogValue}
              setArticle = {this.setArticle}
            /> 
          
            {/* <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <form onSubmit={this.handleSubmit}>
                <DialogTitle id="form-dialog-title">Neuen Artikel erstellen</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Fehlt ein Artikel? Dann füg ihn hinzu!
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={newArticleDialogValue.name}
                    onChange={(event) => this.setNewArticleDialogValue({ ...newArticleDialogValue, name: event.target.value })}
                    label="name"
                    type="text"
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    value={newArticleDialogValue.value}
                    onChange={(event) => this.setNewArticleDialogValue({ ...newArticleDialogValue, value: event.target.value })}
                    label="value"
                    type="number"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Add
                  </Button>
                </DialogActions>
              </form>
            </Dialog>           */}
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

export default withStyles(styles)(ListEntryEditDialog)
