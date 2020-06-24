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
//import Groupmember from './GroupEditDialog';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import MemberAddDialog from '../components/dialogs/MemberAddDialog';


class GroupInformation extends Component {
  render(){
    return (
      <div>
      <Box m={5} />
        <Typography  variant="h4" gutterBottom>
          Groupdetails
        </Typography>
      <Box m={5} />
      <Grid container spaching={3}>
        <Grid item xs={8} sm={2}>
          <Typography variant="h6" gutterBottom>Groupname</Typography>
        </Grid>
        <Grid item xs={8} sm={2}>
        <Fab size="small" color="secondary" aria-label="edit">
                <EditIcon />
          </ Fab>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Typography variant="h6" gutterBottom>owner: name</Typography>
        </Grid>
      </Grid>
      <Box m={4} />
      <Grid container spacing={3}>
        <Grid item xs={8} sm={4}>
          <Typography variant="h6" gutterBottom>creation date: date</Typography>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Typography variant="h6" gutterBottom>last changed: date</Typography>
        </Grid>
      </Grid>
      <Box m={4} />
      <Typography variant="h6" gutterBottom>Groupmember</Typography>
      <Grid item xs={8} sm={4}>
          <Card className="root" style={{minWidth: 275,     marginBottom:10, marginTop:10}}>
            <CardActionArea >
            <CardContent>
                <Typography className="title" style={{fontSize: 14}} color="textPrimary">Groupmember</Typography>
            </CardContent>
            </CardActionArea>    
          </Card> 
      </Grid>
      <Grid item xs={8} sm={4}>
          <Card className="root" style={{minWidth: 275,     marginBottom:10, marginTop:10}}>
            <CardActionArea >
            <CardContent>
                <Typography className="title" style={{fontSize: 14}} color="textPrimary">Groupmember</Typography>
            </CardContent>
            </CardActionArea>    
          </Card> 
      </Grid>
        <MemberAddDialog/>
      </div>
  );
}}

export default GroupInformation;
