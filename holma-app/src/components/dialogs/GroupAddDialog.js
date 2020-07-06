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
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    //marginTop: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

class GroupAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }        
    }
    
    _handleClick = () => {
      this.props.addGroup();
    };

    render() {
      const { classes } = this.props;
        return (
          <div>
            <Fab onClick={this.props.handleClickOpen} className={classes.root} variant="extended" color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon}/>
                neue Gruppe
            </Fab>
            
            <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neue Gruppe erstellen</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  onKeyDown={this._handleKeyDown}
                  onChange={this.props.handleChange}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="Gruppenname"
                  type="email"
                  fullWidth
                  inputProps = {{maxlength:30}}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  abbrechen
                </Button>
                <Button onClick={this._handleClick} color="primary">
                  weiter
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          );
    }
}
GroupAddDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(GroupAddDialog)
