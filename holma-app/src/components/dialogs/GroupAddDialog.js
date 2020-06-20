import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppAPI from '../../api/AppAPI';
import GroupBO from '../../api/GroupBO';
import AddIcon from '@material-ui/icons/Add';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  let groupName = ""
  let userID = 29
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    groupName = e.target.value
  }

  const _handleClick = () => {
    //console.log(AppAPI.getAPI().getUsers())
    addGroup();
  };
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
    addGroup();
    };
  };
  
  const addGroup = () => {
    // current UserID muss abgefragt werden, geht erst wenn firebase läuft
    // id bisher deklarerte Variable
    var grp = new GroupBO(groupName, userID);
    AppAPI.getAPI().createGroup(grp);
    //valdieren, dass Gruppe erstellt wurde, Fenster schließen
  };
    return (
    <div>
      <Button 
        style={{maxWidth: '120px', maxHeight: '120px', minWidth: '120px', minHeight: '120px',}}
        variant="outlined" 
        color="primary"
        startIcon={<AddIcon />} 
        onClick={handleClickOpen}>Add Group
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Neue Gruppe erstellen</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onKeyDown={_handleKeyDown}
            onChange={handleChange}
            margin="dense"
            id="outlined-basic"
            variant="outlined"
            label="Gruppenname"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            schließen
          </Button>
          <Button onClick={_handleClick} color="primary">
            hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

