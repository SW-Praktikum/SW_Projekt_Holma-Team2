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

class GroupAddDialog extends Component {
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

        const {user} = this.props
        // current UserID muss abgefragt werden, geht erst wenn firebase läuft
        // id bisher deklarerte Variable
        var grp = new GroupBO(this.state.groupName, user.getId());
        AppAPI.getAPI().createGroup(grp);
        AppAPI.getAPI().addUsersToGroup(37, 1);  
        this.handleClose()
        //valdieren, dass Gruppe erstellt wurde, Fenster schließen
    }

    render() {

        const {user} = this.props
        return (
            <div>
              <Button 
                style={{maxWidth: '120px', maxHeight: '120px', minWidth: '120px', minHeight: '120px',}}
                variant="outlined" 
                color="primary"
                startIcon={<AddIcon />} 
                onClick={this.handleClickOpen}>Add Group
                </Button>
              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Neue Gruppe erstellen</DialogTitle>
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

export default GroupAddDialog
