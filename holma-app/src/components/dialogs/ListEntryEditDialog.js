import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import AppAPI from '../../api/AppAPI';
import ArticleBO from '../../api/ArticleBO';


class ListEntryEditDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            listEntry: this.props.listEntry,
            localListEntry: Object.assign( Object.create( Object.getPrototypeOf(this.props.listEntry)), this.props.listEntry),
            amount: this.props.listEntry.getAmount(),
            unit: {
                name: this.props.listEntry.getUnit(),
                id: this.props.listEntry.getUnit()
            },
            purchasingUser: {
                "name": this.props.listEntry.purchasingUser.getName(),
                "id": this.props.listEntry.getPurchasingUserId()
            },
            article: {
                "name": this.props.listEntry.article.getName(),
                "id": this.props.listEntry.getArticleId()
            },
            retailer: {
                "name": this.props.listEntry.retailer.getName(),
                "id": this.props.listEntry.getRetailerId()
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
            let localListEntry = this.state.localListEntry
            localListEntry.setAmount(this.state.amount)
            this.updateLocalListEntry(localListEntry)
        }
    }

    setUnit = (unit) => {
        if (unit !== null) {
            this.setState({
                unit: unit
            })
            let localListEntry = this.state.localListEntry
            localListEntry.setUnit(unit.id)
            this.updateLocalListEntry(localListEntry)
        }
    }

    setPurchasingUser = (purchasingUser) => {
        if (purchasingUser !== null) {
            this.setState({
                purchasingUser: {
                    "name": purchasingUser.name,
                    "id": purchasingUser.id
                }
            })
            let localListEntry = this.state.localListEntry
            localListEntry.setPurchasingUserId(purchasingUser.id)
            this.updateLocalListEntry(localListEntry)
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
            let localListEntry = this.state.localListEntry
            localListEntry.setArticleId(article.id)
            this.updateLocalListEntry(localListEntry)
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
                    "name": retailer.name,
                    "id": retailer.id
                }
            })
            let localListEntry = this.state.localListEntry
            localListEntry.setRetailerId(retailer.id)
            this.updateLocalListEntry(localListEntry)
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
        let { localListEntry } = this.state
        let { listEntry } = this.state
        localListEntry.setName(localListEntry.article.getName())
        AppAPI.getAPI().updateListEntry(localListEntry)
        
        listEntry.setAmount(localListEntry.getAmount())
        listEntry.setUnit(localListEntry.getUnit())
        listEntry.setArticleId(localListEntry.getArticleId())
        listEntry.setPurchasingUserId(localListEntry.getPurchasingUserId())
        listEntry.setRetailerId(localListEntry.getRetailerId())
        
        this.props.loadListEntries()
        this.props.closeDialog()

    }

    undoChanges = () => {
        this.setState({
            localListEntry: Object.assign( Object.create( Object.getPrototypeOf(this.props.listEntry)), this.props.listEntry)
        })
        this.props.closeDialog()
    }

    render() {
        const units = [
            {
                name: 'Stück',
                id: 'Stück',
            },
            {
                name: 'mal',
                id: 'mal',
            },
            {
                name: 'Kasten',
                id: 'Kasten',
            },
            {
                name: 'Flasche',
                id: 'Flasche',
            },
            {
                name: 'Dose',
                id: 'Dose',
            },
            {
                name: 'Glas',
                id: 'Glas',
            },
            {
                name: 'Karton',
                id: 'Karton',
            },
            {
                name: 'Packung',
                id: 'Packung',
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
                <Button onClick={this.undoChanges} color="primary">
                  abbrechen
                </Button>
                <Button onClick={this.saveChanges} color="primary">
                  speichern
                </Button>
              </DialogActions>
            </Dialog>
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
