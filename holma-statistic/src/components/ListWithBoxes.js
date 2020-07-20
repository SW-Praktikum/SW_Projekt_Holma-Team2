import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

class ListWithBoxes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loadingInProgress: false,
            loadingError: null,
        }
    }  

    render() {
        const {groupElements} = this.props;
        return (            
        <div className="root" style={{flexGrow: 1,}}>
          {groupElements ?
            <>
            <Grid container spacing ={1}>
                {groupElements}
            </Grid>
            </>
            :
            <>
            <div>NO USER LOGGED IN</div>
            </>
          }
        </div>
        );
    }
}
export default ListWithBoxes;