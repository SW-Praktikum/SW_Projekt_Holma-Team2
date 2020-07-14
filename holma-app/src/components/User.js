import React, { Component, createRef } from 'react';
import AppAPI from '../api/AppAPI';
import { Grid, Box, Button, withStyles, Paper, Typography, Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import User from '../api/UserBO';
import ListWithBoxes from './ListWithBoxes';
import firebase from 'firebase/app'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Navigation from '../components/Navigation';

class UserProfil extends Component {

  // a refernce to the avatar button
  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);

    // Init the state
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
      return (
          
        <Paper elevation={0} className={classes.root}>
          <div className={classes.content}>
            <Box m={2} />
                <Typography  variant="h4" gutterBottom>
                Nutzerdetails:
                </Typography>
            <Box m={5} />
            <Grid container spaching={3}>
              <Grid item xs={8} sm={2}>
                <Typography variant="h6" style={{fontWeight: "bold"}} gutterBottom>Nutzername: </Typography>
                <Typography variant="h6" gutterBottom>{user.getName()}</Typography>
              </Grid>
              <Grid item xs={8} sm={2}/>
              <Grid item xs={8} sm={4}>
                <Typography variant="h6" style={{fontWeight: "bold"}} gutterBottom>Nutzer-Id: </Typography>
                <Typography variant="h6" gutterBottom>{user.getId()}</Typography>
              </Grid>
            </Grid>
            <Box m={4} />
              <Grid container spacing={3}>
                  <Grid item xs={8} sm={4}>
                      <Typography variant="h6" style={{fontWeight: "bold"}} gutterBottom>Nutzer seit: </Typography>
                      <Typography variant="h6" gutterBottom>{user.getCreationDate()}</Typography>
                  </Grid>
              </Grid>
            <Box m={4} />
            <Grid container spaching={2}>
              <Button variant="contained" color='primary' onClick={this.handleSignOutButtonClicked}>Ausloggen</Button>
              <Grid item xs={2} sm={2}/>
              <Button variant="contained" style={{color: 'white', backgroundColor: 'red'}}className={classes.button} onClick={this.handleDeleteUser}>Nutzer löschen</Button>
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
    color: theme.palette.delete.main,
    
  }
});

export default withStyles(styles)(UserProfil);
