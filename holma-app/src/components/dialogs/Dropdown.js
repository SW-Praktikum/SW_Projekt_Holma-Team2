import React, { Component, createRef } from 'react';


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