import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

/**
 * Durch diesen Dialog kann ein neues Gruppenmitglied einer Gruppe hinzugefügt werden.
 * 
 * Dieser Dialog wird unter 'Groupedit' aufgerufen.
 */

class MemberAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            groupName: "",
        }        
    }

    _handleClick = () => {
      this.props.addMember();
    };

    render() {
      const {memberElements} = this.props;
      return (
          <div>
            <Dialog open={this.props.openMember} onClose={this.props.handleCloseMember} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neues Gruppenmitglied</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  onChange={this.props.handleChangeMember}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="Mitglieds ID"
                  type="number"
                  value={this.props.memberId}
                  fullWidth
                />
              </DialogContent>

                <List>
                  {memberElements}
                </List>

              <DialogActions>
                <Button onClick={this.props.handleCloseMember} color="primary">
                  fertig
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
