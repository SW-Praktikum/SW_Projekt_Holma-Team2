import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid, Divider } from '@material-ui/core';
import firebase from 'firebase/app';


class DropDown extends Component {
    constructor(props) {
        super(props)
    }
    #avatarButtonRef = createRef();
    render() {
        const { classes, user } = this.props;
        return (<div></div>)
    }
}

//export default withStyles(styles)(ProfileDropDown)
export default DropDown