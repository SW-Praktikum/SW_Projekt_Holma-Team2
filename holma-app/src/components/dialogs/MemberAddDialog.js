import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppAPI from '../../api/AppAPI';
import AddIcon from '@material-ui/icons/Add';

class MemberAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            memberName: "",
            memberId: "",
            groupId: 7,
            open: false
        }        
    }


    handleChange = (e) => {
        this.state.memberId = e.target.value
    }
    
    handleClickOpen = () => {
        this.setState({
            open: true
        })    
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    _handleClick = () => {
      this.addMember();
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.addMember();
        };
    };
    
    addMember() { 
      AppAPI.getAPI().addUserToGroup(this.state.groupId, this.state.memberId);
        }

    render() {
        return (
          <div>
            <Button 
              style={{maxWidth: '160px', maxHeight: '140px', minWidth: '80px', minHeight: '70px',}}
              variant="outlined" 
              color="primary"
              startIcon={<AddIcon />} 
              onClick={this.handleClickOpen}>Mitglied hinzufügen
              </Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neues Mitglied hinzufügen</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  onKeyDown={this._handleKeyDown}
                  onChange={this.handleChange}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="User ID"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  schließen
                </Button>
                <Button onClick={this._handleClick} color="primary">
                  hinzufügen
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          );
    }
}

export default MemberAddDialog;
