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
import ArticleBO from '../../api/ArticleBO';

import ArticleAddDialog from './ArticleAddDialog'


class ListEntryEditDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            open: this.props.open,
            listEntry: this.props.listEntry,
            amount: this.props.listEntry.getAmount(),
            unit: {
                label: this.props.listEntry.getUnit(),
                value: this.props.listEntry.getUnit()
            },
            purchasingUser: this.props.purchasingUser,
            users: this.props.users,
            article: this.props.article,
            articles: this.props.articles,
            retailer: this.props.retailer,
            retailers: this.props.retailers,
        }
    }

    updateListEntry = (listEntry) => {
        this.setState({
            listEntry: listEntry
        })
    }

    setAmount = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                amount: e.target.valueAsNumber
            })
            let updatedListEntry = this.state.listEntry
            updatedListEntry.setAmount(this.state.amount)
            this.updateListEntry(updatedListEntry)
        }
    }

    setUnit = (unit) => {
        this.setState({
            unit: unit
        })
        let updatedListEntry = this.state.listEntry
        updatedListEntry.setUnit(unit["value"])
        this.updateListEntry(updatedListEntry)
    }

    setPurchasingUser = (purchasingUser) => {
        this.setState({
            purchasingUser: purchasingUser
        })
        let updatedListEntry = this.state.listEntry
        updatedListEntry.setPurchasingUserId(purchasingUser.getId())
        this.updateListEntry(updatedListEntry)
    }

    setArticle = (article) => {
        if (article !== null) {
            this.setState({
                article: article
            })
            let updatedListEntry = this.state.listEntry
            updatedListEntry.setArticleId(article.getId())
            updatedListEntry.setName(article.getName())
            this.updateListEntry(updatedListEntry)
        }
    }

    createNewArticle = (articleName) => {
        let newArticle = new ArticleBO(articleName, this.props.groupId)
        AppAPI.getAPI().createArticle(newArticle).then((article) => {
                this.setArticle(article)
                this.props.loadArticles()
            }
        )
    }

    setRetailer = (retailer) => {
        this.setState({
            retailer: retailer
        })
        let updatedListEntry = this.state.listEntry
        updatedListEntry.setRetailerId(retailer.getId())
        this.updateListEntry(updatedListEntry)
    }

    articleAlreadyExists = (articleName) => {
        try {
            this.state.articles.forEach( article => {
                if (article.getName() == articleName){
                    throw BreakException
                }
            })
            return false
        } catch (e) {
            return true
        };
    }
    
    saveChanges = () => {
        AppAPI.getAPI().updateListEntry(this.state.listEntry)
        this.props.closeDialog()
    }

    render() {
        const units = [
            {
                label: 'Stück',
                value: 'Stück',
            },
            {
                label: 'g',
                value: 'g',
            },
            {
                label: 'mg',
                value: 'mg',
            },
            {
                label: 'kg',
                value: 'kg',
            },
            {
                label: 'ml',
                value: 'ml',
            },
            {
                label: 'l',
                value: 'l',
            },
        ];

        const filter = createFilterOptions();
        const { classes, open } = this.props;
        const { unit, amount, article, articles, purchasingUser, users, retailer, retailers } = this.state;

        return (
          <div>
            <Typography className={classes.container} align="right">
            
            </Typography>
            <Dialog className={classes.dialog} open={open} onClose={this.props.closeDialog} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-editEntry">Eintrag bearbeiten</DialogTitle>
              <DialogContent>

                {/* Anzahl */}
                <TextField
                    type="number"
                    value={amount}
                    onChange={this.setAmount}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Menge"
                /> 

                {/* Einheit */}
<               Autocomplete
                    options={units} 
                    onChange={(event, unit) => {this.setUnit(unit);}}
                    defaultValue={unit}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Einheit" variant="standard" placeholder="Einheit" />}
                />

                {/* Artikel */}
                <Autocomplete
                    defaultValue={article}
                    onChange={(event, articleName) => {
                        if (typeof articleName === 'string') {
                            this.createNewArticle(articleName)
                        } else if (articleName && articleName.inputValue) {
                          // Create a new value from the user input
                            this.createNewArticle(articleName.inputValue)
                        } else {
                            this.setArticle(articleName);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== '' && !this.articleAlreadyExists(params.inputValue)) {
                          filtered.push({
                            inputValue: params.inputValue,
                            name: `Erstelle "${params.inputValue}"`,
                          });
                        }
                
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={articles} 
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.name;
                      }}                    
                    renderOption={(option) => option.name}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="Artikel" variant="standard" placeholder="Artikel" />}
                />

                {/* Einkäufer */}
                <Autocomplete
                    options={users} 
                    onChange={(event, purchasingUser) => {this.setPurchasingUser(purchasingUser);}}
                    defaultValue={purchasingUser}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Einkäufer" variant="standard" placeholder="Einkäufer" />}
                />

                {/* Retailer */}
                <Autocomplete
                    options={retailers} 
                    onChange={(event, retailer) => {this.setRetailer(retailer);}}
                    defaultValue={retailer}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Retailer" variant="standard" placeholder="Retailer" />}
                />

              
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.closeDialog} color="primary">
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

export default withStyles(styles)(ListEntryEditDialog)
