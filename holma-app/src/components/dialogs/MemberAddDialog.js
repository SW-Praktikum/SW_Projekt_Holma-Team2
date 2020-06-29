import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppAPI from '../../api/AppAPI';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


class MemberEntry extends Component {
  render () {
    return (
      <div>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
          </Typography>
          <div>
            <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Jonas Götz"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
            </List>
          </div>
        </Grid>
      </div>
    )
  }}

class MemberAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            groupName: "",
            members: []
        }        
    }

    
    


    _handleClick = () => {
      this.props.addMember();
    };
    
    
    
    

    


    render() {
        return (
          <div>
            <Dialog open={this.props.openMember} onClose={this.props.handleCloseMember} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Neues Gruppenmitglied</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  onChange={this.props.handleChange}
                  margin="dense"
                  id="outlined-basic"
                  variant="outlined"
                  label="Midlieds ID"
                  type="email"
                  value={this.props.memberId}
                  fullWidth
                />
              </DialogContent>
              <MemberEntry />
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
