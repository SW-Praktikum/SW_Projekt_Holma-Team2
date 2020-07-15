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



class GroupAddDialog extends Component {
    constructor (props) {
        super(props)
    }
    
    _handleClick = () => {
      this.props.addGroup();
    };

    render() {
      const { classes, minLength } = this.props;
        return (
          <div>
            <Typography className={classes.container} align="right">
            <Fab onClick={this.props.handleClickOpen} className={classes.root} variant="extended" color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon}/>
                neue Gruppe
            </Fab>
            </Typography>
            <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neue Gruppe erstellen</DialogTitle>
              <DialogContent>
                <TextField
                  error ={this.props.groupName.length >= minLength ? false : true }
                  helperText =  {this.props.groupName.length >= minLength ? "" : "Mindestens " + minLength + " Zeichen" }
                  autoFocus
                  onChange={this.props.handleChange}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="Gruppenname"
                  type="email"
                  fullWidth
                  inputProps={{
                    maxLength: 30,
                  }}                
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  abbrechen
                </Button>
                <Button onClick={this._handleClick} disabled={this.props.buttonDisabled} color="primary">
                  weiter
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
    minWidth: 100, 
    marginRight: 160
  }
});

export default withStyles(styles)(GroupAddDialog)
