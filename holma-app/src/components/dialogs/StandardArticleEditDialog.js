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
import StandardArticleEdit from '../../components/StandardArticleEdit';
import ArticleAddDialog from './ArticleAddDialog'


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
                "name": this.props.standardArticle.getPurchasingUserName(),
                "id": this.props.standardArticle.getPurchasingUserId()
            },
            article: {
                "name": this.props.standardArticle.getArticleName(),
                "id": this.props.standardArticle.getArticleId()
            },
            retailer: {
                "name": this.props.standardArticle.getRetailerName(),
                "id": this.props.standardArticle.getRetailerId()
            },
        }
    }

    updateLocalStandardArticle(updatedStandardArticle) {
        this.setState({
             localStandardArticle: updatedStandardArticle
        })
    }

    setAmount = (amount) => {
       // const re = /^[0-9\b]+$/;
        //if (amount.target.value === '' || re.test(amount.target.value)) {
            this.setState({
                amount: amount
            })
            let localStandardArticle = this.state.localStandardArticle
            localStandardArticle.setAmount(this.state.amount)
            this.updateLocalStandardArticle(localStandardArticle)
        }
    

    setUnit = (unit) => {
        if (unit !== null) {
            this.setState({
                unit: unit
            })
            let localStandardArticle = this.state.localStandardArticle
            localStandardArticle.setUnit(unit)
            this.updateLocalStandardArticle(localStandardArticle)
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
            localStandardArticle.setPurchasingUserName(purchasingUser.name)
            this.updateLocalStandardArticle(localStandardArticle)
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
            localStandardArticle.setArticleName(article.name)
            this.updateLocalStandardArticle(localStandardArticle)
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
            localStandardArticle.setRetailerName(retailer.name)
            this.updateLocalStandardArticle(localStandardArticle)
        }
    }

    
    saveChanges = () => {
        let { localStandardArticle } = this.state
        let { standardArticle } = this.state
        localStandardArticle.setName(localStandardArticle.articleName)
        AppAPI.getAPI().updatedStandardArticle(localStandardArticle)
        
        standardArticle.setAmount(localStandardArticle.getAmount())
        standardArticle.setUnit(localStandardArticle.getUnit())
        standardArticle.setArticleId(localStandardArticle.getArticleId())
        standardArticle.setArticleName(localStandardArticle.getArticleName())
        standardArticle.setPurchasingUserId(localStandardArticle.getPurchasingUserId())
        standardArticle.setPurchasingUserName(localStandardArticle.getPurchasingUserName())
        standardArticle.setRetailerId(localStandardArticle.getRetailerId())
        standardArticle.setRetailerName(localStandardArticle.getRetailerName())

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
        const {retailers} = this.props.retailers.map(retailer => ({"name": retailer.getName(), "id": retailer.getId()}))
        const articles = this.props.articles.map(article => ({"name": article.getName(), "id": article.getId()}))
        const users = this.props.users.map(user => ({"name": user.getName(), "id": user.getId()}))

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
                    onChange={this.setAmount(amount)}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Menge"
                /> 
                
                {/* Einheit */}
                <TextField
                    type="string"
                    value={unit}
                    onChange={this.setUnit(unit)}
                    defaultValue={unit}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Einheit"
                /> 

                {/* Artikel */}
                <TextField
                    type="string"
                    value={article}
                    onChange={(articleName) => {
                        if (typeof articleName === 'string') {
                            this.createNewArticle(articleName)
                        } else if (articleName && articleName.inputValue) {
                            // Create a new value from the user input
                            this.createNewArticle(articleName.inputValue)
                        } else {
                            this.setArticle(articleName);
                        }
                    }}
                    defaultValue={article}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Artikel"
                /> 

                {/* Einkäufer */}
                <TextField
                    type="string"
                    value={purchasingUser}
                    onChange={(purchasingUser) => {this.setPurchasingUser(purchasingUser);}}
                    defaultValue={purchasingUser}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Einkäufer"
                /> 

                {/* Retailer */}
                <TextField
                    type="string"
                    value={retailer}
                    onChange={(retailer) => {this.setRetailer(retailer);}}
                    defaultValue={retailer}
                    margin="dense"
                    id="combo-amount"
                    variant="standard"
                    label="Händler"
                /> */
              
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
    marginRight: 215
  },

  dialog: {
    maxWidth: 350,
    margin: 'auto',
  }
});

export default withStyles(styles)(StandardArticleEditDialog)
