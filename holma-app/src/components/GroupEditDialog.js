import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppAPI from '../api/AppAPI';
import GroupBO from '../api/GroupBO';
import UserBO from '../api/UserBO';
import BusinessObject from '../api/BusinessObject';
import AddIcon from '@material-ui/icons/Add';
/*Muss noch komplett inhaltlich angepasst werden*/

// API for Lists needs to be created first

class Groupmember extends Component {
    constructor (props) {
        super(props)
        this.state = {
            UserName: "",
            /*UserId: "",
            CreationDate: "",
            LastUpdate: "",
            Owner: "",
            open: false*/
        }        
    }

    handleChange = (e) => {
        this.state.UserName = e.target.value.getname
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
        // GroupID muss abgefragt werden
        // id bisher deklarerte Variable
        var member = new BusinessObject(this.state.UserName);
        AppAPI.getAPI().addUsersToGroup(member, "member");
        //valdieren, dass User hinzugefügt wurde, Fenster schließen
    }

    render() {
        return (
            <div>
              <Button 
                style={{maxWidth: '70px', maxHeight: '40px', minWidth: '70px', minHeight: '30px',}}
                variant="outlined" 
                color="primary"
                onClick={this.handleClickOpen}>Ändern
                </Button>
              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Groupname Editor</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    onKeyDown={this._handleKeyDown}
                    onChange={this.handleChange}
                    margin="dense"
                    id="outlined-basic"
                    variant="outlined"
                    label="Groupname"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    schließen
                  </Button>
                  <Button onClick={this._handleClick} color="primary">
                    change
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
}

export default Groupmember;