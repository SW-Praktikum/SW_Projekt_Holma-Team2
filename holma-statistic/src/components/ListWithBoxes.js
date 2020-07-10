import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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