import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import firebase from 'firebase/app';
import React, { Component, createRef } from 'react';
import AppAPI from '../api/AppAPI';

/**
 * Es werden die Details des angemeldeten Benutzers angezeigt.
 */

class UserProfil extends Component {

  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userName: this.props.user.name,
      userId: this.props.user.Id
    }
  }

  
  handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
    window.location.reload();

  }

  handleDeleteUser = () => {
    AppAPI.getAPI().deleteUser(this.state.user).then( () =>{
      this.handleSignOutButtonClicked()}
    
    );
  }


  render() {
      const { classes, user } = this.props;
      var userCreationDate = ""
      let ucd = new Date(user.getCreationDate())
      userCreationDate = ucd.toDateString()

      return (
          
        <Paper elevation={0} className={classes.root}>
          <div className={classes.content}>
            
                <Typography  variant="h4" gutterBottom>
                Benutzerdetails:
                </Typography>
            
            <Grid container spaching={3}>
              <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                <Typography style={{fontWeight: "bold"}} gutterBottom>Benutzername: </Typography>
                <Typography gutterBottom>{user.getName()}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                <Typography style={{fontWeight: "bold"}} gutterBottom>Benutzer-Id: </Typography>
                <Typography gutterBottom>{user.getId()}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                <Typography style={{fontWeight: "bold"}} gutterBottom>Benutzer seit: </Typography>
                <Typography gutterBottom>{userCreationDate}</Typography>
              </Grid>
            </Grid>
            
            <Grid style={{paddingTop: 50}} container direction="row" justify="space-between" alignItems="center" spaching={2}>
              <Grid item xs={12} sm={4}>
                <Button className={classes.button} align="center" variant="contained" fullWidth color='primary' onClick={this.handleSignOutButtonClicked}>
                  Ausloggen
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button className={classes.button} align="center" variant="contained" fullWidth style={{color: 'white', backgroundColor: '#D0021B'}} onClick={this.handleDeleteUser}>
                  Konto löschen
                  </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  },
  button: {
    marginBottom : 10,
    
  },
  gridItem: {
    paddingTop: 10,
    paddingBottom: 10,

  }
});

export default withStyles(styles)(UserProfil);
