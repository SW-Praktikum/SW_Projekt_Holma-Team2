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



class EntryAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }        
    }
    
    _handleClick = () => {
      //this.props.addGroup();
    };

    render() {
      const { classes } = this.props;
        return (
          <div>
            <Typography className={classes.container} align="right">
            <Fab onClick={this.props.openDialog} className={classes.root} variant="extended" color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon}/>
                neuer Listeneintrag
            </Fab>
            </Typography>
            <Dialog className={classes.dialog} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neuer Listeneintrag</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  onChange={this.props.handleInputChange}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="hier die einzelnen Elemente hinterlegen"
                  type="email"
                  fullWidth
                  inputProps = {{maxlength:60}}
                />
                
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  abbrechen
                </Button>
                <Button onClick={null} color="primary">
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
    marginRight: 222
  },

  dialog: {
    maxWidth: 350,
    margin: 'auto',
  }
});

export default withStyles(styles)(EntryAddDialog)
