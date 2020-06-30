import React, { Component, createRef } from 'react';
import AppAPI from '../api/AppAPI';
import { Grid, Box, Button, withStyles, Paper, Typography, Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import User from '../api/UserBO';
import ListWithBoxes from './ListWithBoxes';
import firebase from 'firebase/app'


class UserProfil extends Component {

  // a refernce to the avatar button
  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
    }
  }

  
  handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
    window.location.reload();
  }


  render() {

      const { classes } = this.props;
      
      return (
          
        <Paper elevation={0} className={classes.root}>
          <div className={classes.content}>
            <Box m={5} />
                <Typography  variant="h4" gutterBottom>
                Userdetails
                </Typography>
            <Box m={5} />
            <Grid container spaching={3}>
              <Grid item xs={8} sm={2}>
                <Typography variant="h6" gutterBottom>Username</Typography>
              </Grid>
              <Grid item xs={8} sm={2}/>
              <Grid item xs={8} sm={4}>
                <Typography variant="h6" gutterBottom>User-Id: id</Typography>
              </Grid>
            </Grid>
            <Box m={4} />
              <Grid container spacing={3}>
                  <Grid item xs={8} sm={4}>
                      <Typography variant="h6" gutterBottom>Member since: date</Typography>
                  </Grid>
              </Grid>
            <Box m={4} />
            <Grid item>
                    <Button color='primary' onClick={this.handleSignOutButtonClicked}>Logout</Button>
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
  }
});

export default withStyles(styles)(UserProfil);
