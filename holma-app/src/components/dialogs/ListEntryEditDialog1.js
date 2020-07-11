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
            listEntry: this.props.listEntry,
            purchasingUser: this.props.purchasingUser,
            article: this.props.article,
            retailer: this.props.retailer,
        }
    }

    updateListEntry = (listEntry) => {
        this.setState({
            listEntry: listEntry
        })
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

    

    saveChanges = () => {
        AppAPI.getAPI().updateListEntry(this.state.listEntry)
    }

    render() {
        const filter = createFilterOptions();

        const { classes, users, purchasingUser, retailers, retailer, article, articles} = this.props;
        
        return (
          <div>
            <Typography className={classes.container} align="right">
            
            </Typography>
            <Dialog className={classes.dialog} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-editEntry">Eintrag bearbeiten</DialogTitle>
              <DialogContent>
                {/* Artikel */}
                <Autocomplete
                    value={article}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={articles} 
                    //onChange={(event, article) => {this.setArticle(article);}}
                    onChange={(event, article) => {
                        if (typeof article === 'string') {
                            console.log(article, "is string!")
                            this.createNewArticle(article)
                        } else if (article && article.inputValue) {
                          // Create a new value from the user input
                            console.log("New Article from user input:", article.inputValue)
                            this.createNewArticle(article.inputValue)
                        } else {
                            console.log("Normal selection")
                            this.setArticle(article);
                        }
                    }}
                    filterOptions={(options, params) => {
                        console.log(options, params)
                        const filtered = filter(options, params);
                
                        // Suggest the creation of a new value
                        if (params.inputValue !== '') {
                          filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                          });
                        }
                
                        return filtered;
                    }}
                    defaultValue={article}
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
                <Button onClick={this.props.handleClose} color="primary">
                  abbrechen
                </Button>
                <Button onClick={this.saveChanges} color="primary">
                  speichern
                </Button>
              </DialogActions>
            </Dialog>

            {/* <ArticleAddDialog 
              articleAddDialogOpen={articleAddDialogOpen} 
              openArticleAddDialog={this.openArticleAddDialog} 
              setNewArticleDialogValue={this.setNewArticleDialogValue}
              setArticle = {this.setArticle}
            />            */}

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
