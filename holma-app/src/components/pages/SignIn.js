import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class SignIn extends Component{
    
    //Das passiert, wenn der User auf den SignIn-Button drückt
    handleSignInButtonClicked = () => {
        this.props.onSignIn();
    }

    // Das passiert, falls das user-Objekt null ist
    render() {
        //const {classes } = this.props;

        return(
            <div>
                <h2>Sei gegrüßt! Das ist die professionellsten ShoppingList-App die es gibt xD</h2>
                <p>Um diese App nutzen zu können, melde dich bitte hier an :)</p>
                <Button color='green' onClick={this.handleSignInButtonClicked}>
                    Sign in with Google
                </Button>
            </div>
        )
    }

}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    //wird verwendet, wenn der User sich anmelden möchte
    onSignIn: PropTypes.func.isRequired,   
}
export default (SignIn)