import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';

/**
 * Durch diesen Dialog kann eine neue Shoppinglist erstellt und der angesprochenen Gruppe hinzugefügt werden.
 */

class ShoppingListAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }        
    }

    render() {
      const { classes, minLength } = this.props;
        return (
          <div>
            <Typography className={classes.container} align="right">
            <Fab onClick={this.props.openDialog} className={classes.root} variant="extended" color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon}/>
                neue Shoppingliste
            </Fab>
            </Typography>
            <Dialog className={classes.dialog} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neue Shoppingliste</DialogTitle>
              <DialogContent>
                <TextField
                  error ={this.props.shoppingListName.length >= minLength ? false : true }
                  helperText =  {this.props.shoppingListName.length >= minLength ? "" : "Mindestens " + minLength + " Zeichen" }
                  autoFocus
                  onChange={this.props.handleInputChange}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="Name der Shoppingliste"
                  type="email"
                  fullWidth
                  inputProps = {{maxlength:60}}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={this.props.checked} onChange={this.props.addStandardArticles} name="" />}
                  label="Standardartikel übernehmen"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  abbrechen
                </Button>
                <Button onClick={this.props.checkStandard} disabled={this.props.buttonDisabled} color="primary">
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
    marginRight: 215
  },

  dialog: {
    maxWidth: 350,
    margin: 'auto',
  }
});

export default withStyles(styles)(ShoppingListAddDialog)
