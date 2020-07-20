import { Button, colors, Paper, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SignIn extends Component{
    
    //Das passiert, wenn der User auf den SignIn-Button drückt
    handleSignInButtonClicked = () => {
        this.props.onSignIn();
    }

    // Das passiert, falls das user-Objekt null ist
    render() {
        const { classes } = this.props;

        return(
            
            <Paper elevation={0} className={classes.root}>
                <div className={classes.content}>
                    <h2>Guten Tag & Herzlichen Willkommen zu <span className={classes.text}>Holma</span>!<br/>
                    Holma ist eine webbasierte ShoppingList-Anwendung die dir dabei hilft, deine anstehenden Einkäufe und Besorgungen zu managen.</h2>
                    <p>Melde dich bitte hier an, um Holma mit all seinen Funktionen nutzen zu können.</p>
                    <Button variant="contained" color="primary" onClick={this.handleSignInButtonClicked}>
                        Sign in with Google
                    </Button>
                </div>
            </Paper>
            
        )
    }

}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    //wird verwendet, wenn der User sich anmelden möchte
    onSignIn: PropTypes.func.isRequired,   
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
    text: {
        color: colors.teal[400],
    }
  });
  
export default withStyles(styles)(SignIn)