import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppAPI from '../../api/AppAPI';
import GroupBO from '../../api/GroupBO';
import AddIcon from '@material-ui/icons/Add';

class MemberAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            groupName: "",
            open: false
        }        
    }

    handleChange = (e) => {
        this.state.groupName = e.target.value
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
      this.addGroup();
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          //this.addGroup();
        };
    };
    
    addGroup() { 
      const {user} = this.props;
      var grp = new GroupBO(this.state.groupName, user.getId());
      AppAPI.getAPI().createGroup(grp).then(group => {
        AppAPI.getAPI().addUserToGroup(group.getId(), user.getId()).then( () => {
          this.props.loadGroups();
        })  
      })
      this.handleClose();
    }

    render() {
        return (
          <div>
            <Button 
              style={{maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px',}}
              variant="outlined" 
              color="primary"
              startIcon={<AddIcon />} 
              onClick={this.handleClickOpen}>Add Member
              </Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add new Member</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  onKeyDown={this._handleKeyDown}
                  onChange={this.handleChange}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="Gruppenname"
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
