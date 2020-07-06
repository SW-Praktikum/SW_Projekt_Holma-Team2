import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

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
        return (
          <div>
            <Button 
              style={{maxWidth: '120px', maxHeight: '120px', minWidth: '120px', minHeight: '120px',}}
              variant="outlined" 
              color="primary"
              startIcon={<AddIcon />} 
              onClick={this.props.handleClickOpen}>Add Group
              </Button>
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
                  inputProps = {{maxlength:60}}
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

export default GroupAddDialog
