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

/**
 * Dieser Dialog wird in 'StandardArticles' aufgerufen.
 * 
 * Die beim Anlegen angegebenen Attribute können nachträglich angepasst werden.
 * 
 */


class StandardArticleEditDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            standardArticle: this.props.standardArticle,
            localStandardArticle: Object.assign( Object.create( Object.getPrototypeOf(this.props.standardArticle)), this.props.standardArticle),
            amount: this.props.standardArticle.getAmount(),
            unit: {
                name: this.props.standardArticle.getUnit(),
                id: this.props.standardArticle.getUnit()
            },
            purchasingUser: {
                "name": this.props.standardArticle.purchasingUser.getName(),
                "id": this.props.standardArticle.getPurchasingUserId()
            },
            article: {
                "name": this.props.standardArticle.article.getName(),
                "id": this.props.standardArticle.getArticleId()
            },
            retailer: {
                "name": this.props.standardArticle.retailer.getName(),
                "id": this.props.standardArticle.getRetailerId()
            },
        }
    }



    setAmount = async(amount) => {
        const re = /^[0-9\b]+$/;
        if (amount.target.value === '' || re.test(amount.target.value)) {
            await this.setState({
                amount: amount.target.valueAsNumber
            })
            let localStandardArticle = this.state.localStandardArticle
            localStandardArticle.setAmount(this.state.amount)
        }
    }
    

    setUnit = (unit) => {
        if (unit !== null) {
            this.setState({
                unit: unit
            })
            let localStandardArticle = this.state.localStandardArticle
            localStandardArticle.setUnit(unit)

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
            let localStandardArticle = this.state.localStandardArticle
            localStandardArticle.setPurchasingUserId(purchasingUser.id)
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
            let localStandardArticle = this.state.localStandardArticle
            localStandardArticle.setArticleId(article.id)
        }
    }


    setRetailer = (retailer) => {
        if (retailer !== null) {
            this.setState({
                retailer: {
                    "name": retailer.name,
                    "id": retailer.id
                }
            })
            
            let localStandardArticle = this.state.localStandardArticle
            localStandardArticle.setRetailerId(retailer.id)
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
    
    saveChanges = () => {
        let { localStandardArticle } = this.state
        let { standardArticle } = this.state
        localStandardArticle.setName(localStandardArticle.article.getName())
        AppAPI.getAPI().updateListEntry(localStandardArticle)
        
        standardArticle.setAmount(localStandardArticle.getAmount())
        standardArticle.setUnit(localStandardArticle.getUnit())
        standardArticle.setArticleId(localStandardArticle.getArticleId())
        standardArticle.setPurchasingUserId(localStandardArticle.getPurchasingUserId())
        standardArticle.setRetailerId(localStandardArticle.getRetailerId())

        this.props.closeDialog()

    }

    undoChanges = () => {
        this.setState({
            localStandardArticle: Object.assign( Object.create( Object.getPrototypeOf(this.props.standardArticle)), this.props.standardArticle)
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
        console.log(articles)
        console.log(this.props.articles)
        
        return (
            <React.Fragment>
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
            </React.Fragment>
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

export default withStyles(styles)(StandardArticleEditDialog)
