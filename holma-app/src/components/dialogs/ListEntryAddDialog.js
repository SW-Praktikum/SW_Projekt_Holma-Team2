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
import ListEntryBO from '../../api/ListEntryBO';

import ArticleAddDialog from './ArticleAddDialog'


class ListEntryAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            amount: 1,
            unit: {
                name: "",
                id: ""
            },
            purchasingUser: {
                name: "",
                id: ""
            },
            article: {
                name: "",
                id: ""
            },
            retailer: {
                name: "",
                id: ""
            },
        }
    }

    updateLocalListEntry(updatedListEntry) {
        // this.setState({
        //     localListEntry: updatedListEntry
        // })
    }

    setAmount = async(amount) => {
        const re = /^[0-9\b]+$/;
        if (amount.target.value === '' || re.test(amount.target.value)) {
            await this.setState({
                amount: amount.target.valueAsNumber
            })
        }
    }

    setUnit = (unit) => {
        if (unit !== null) {
            this.setState({
                unit: unit
            })
        }
    }

    setPurchasingUser = (purchasingUser) => {
        if (purchasingUser !== null) {
            this.setState({
                purchasingUser: {
                    name: purchasingUser.name,
                    id: purchasingUser.id
                }
            })
        }
    }

    setArticle = (article) => {
        if (article !== null) {
            this.setState({
                article: {
                    "name": article.name,
                    "id": article.id
                }
            })
        }
    }

    createNewArticle = (articleName) => {
        let newArticle = new ArticleBO(articleName, this.props.groupId)
        AppAPI.getAPI().createArticle(newArticle).then((article) => {
                let art = {
                    "name": article.getName(),
                    "id": article.getId()
                }                
                this.setArticle(art)
                this.props.loadArticles()
            }
        )
    }

    setRetailer = (retailer) => {
        if (retailer !== null) {
            this.setState({
                retailer: {
                    name: retailer.name,
                    id: retailer.id
                }
            })
        }
    }

    objectExistsByName = (list, name) => {
        var BreakException = {}
        try {
            list.forEach(element => {
                if (element.name == name){
                    throw BreakException
                }
            })
            return false
        } catch (e) {
            return true
        };
    }
    
    saveChanges = () => {
      var liEtry = new ListEntryBO(
        this.state.article.id,
        this.state.article.name,
        this.state.amount, 
        this.state.unit.name, 
        this.state.retailer.id, 
        this.state.retailer.name, 
        1003, //this.state.purchasingUser.id, 
        this.state.purchasingUser.name, 
        3000, //this.props.shoppingListId, 
        "a new list", 
        false, 
        null, //checkedTs
        false //standardarticle
        )
      liEtry.setName(this.state.article.name)
      console.log(liEtry)
      AppAPI.getAPI().createListEntry(liEtry).then(() => {
        this.props.loadListEntries()
      })
      this.props.handleClose()
      

    }

    undoChanges = () => {
        this.setState({
            //localListEntry: Object.assign( Object.create( Object.getPrototypeOf(this.props.listEntry)), this.props.listEntry)
        })
        this.props.handleClose()
    }

    render() {
        const units = [
            {
                name: 'Stück',
                id: 'Stück',
            },
            {
                name: 'g',
                id: 'g',
            },
            {
                name: 'mg',
                id: 'mg',
            },
            {
                name: 'kg',
                id: 'kg',
            },
            {
                name: 'ml',
                id: 'ml',
            },
            {
                name: 'l',
                id: 'l',
            },
        ];

        const filter = createFilterOptions();
        const { classes, open } = this.props;
        const { unit, amount, article, purchasingUser, retailer } = this.state;
        
        const retailers = this.props.retailers.map(retailer => ({"name": retailer.getName(), "id": retailer.getId()}))
        const articles = this.props.articles.map(article => ({"name": article.getName(), "id": article.getId()}))
        const users = this.props.users.map(user => ({"name": user.getName(), "id": user.getId()}))

        return (

          <div>
            <Typography className={classes.container} align="right">
            <Fab onClick={this.props.openDialog} className={classes.root} variant="extended" color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon}/>
                neuer Listeneintrag
            </Fab>
            </Typography>
            <Dialog className={classes.dialog} open={open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
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
                    getOptionLabel={(option) => option.name}
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
                        if (params.inputValue !== '' && !this.objectExistsByName(articles, params.inputValue)) {
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
                <Button onClick={this.undoChanges} color="primary">
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
    marginRight: 222
  },

  dialog: {
    maxWidth: 350,
    margin: 'auto',
  }
});

export default withStyles(styles)(ListEntryAddDialog)
