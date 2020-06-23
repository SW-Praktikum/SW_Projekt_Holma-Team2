import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/grid';


class GroupListEntry extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
        <div className= "GroupListEntry">
            <Grid variant='outlined' color='white' size='medium'>
              Transfer
            </Grid>
        </div>
        )}
}

export default (GroupListEntry);