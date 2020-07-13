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

class ArticleEditDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            articleId: this.props.articleId,
            article: this.props.article,
            articleName: this.props.article.name,
            standard: false,
        }        
    }

    handleChangeArticle = (e) => {
        this.setState({articleName: e.target.value})
        this.state.article.setName(this.state.articleName);
    }


    saveChanges = () => {
        AppAPI.getAPI().updateArticle(this.state.article);
    }


    render() {
      const { classes } = this.props;
        return (
          <div>
            <Typography className={classes.container} align="right">
            
            </Typography>
            <Dialog className={classes.dialog} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-editEntry">Artikel bearbeiten</DialogTitle>
              <DialogContent>
                <TextField
                    type="text"
                    onChange={this.handleChangeArticle}
                    margin="dense"
                    id="combo-article"
                    variant="standard"
                    label={this.state.article.name}
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

export default withStyles(styles)(ArticleEditDialog)
