import React from 'react';
import {Paper, Typography, Tabs, Tab, AppBar }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Assessment from '@material-ui/icons/Assessment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import AppAPI from '../../api/AppAPI';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { colors } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import ListWithBoxes from '../ListWithBoxes';


class ListCard extends React.Component {
  render() {
      return (
        <Card className="root" style={{/* minHeight: 250 ,  */minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: colors.teal[600]}}>
          <CardActionArea>
          <CardContent>
              <Typography className="title" style={{fontSize: 14, color: 'white'}}>{this.props.entry.getName()}</Typography>
              <Typography className="title" style={{fontSize: 14, color: 'white'}}>Id: {this.props.entry.getId()}</Typography>
          </CardContent>
          </CardActionArea>     
        </Card>
  )
}
}


class Startpage extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      user: this.props.user,
      userName: this.props.user.name,
      userId: this.props.user.id,
      privatEntries: [],
    }
    
  }

  componentDidMount(){
    if(this.props.user){
        this.loadPrivatList();
      }
  }

  loadPrivatList = () => {
    AppAPI.getAPI().getListEntriesByUserId(this.state.userId).then((entries)=> {
      var privatEntries = entries.map((entry) =>
      <Grid key={entry.getId()} item xs={6} item lg={4}>
      <Paper className="paper" style ={{ textAlign:'center',}} >
        <ListCard key={entry.getId()} entry={entry}/>
      </Paper>
    </Grid>
      )
      this.setState({
        privatEntries: privatEntries,
        loadingInProgress: true, 
        loadingError: null,
        userId: entries.id,
    });
    }).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e
        })
      );  
    } 
  
  makeStyles = (theme) => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(100, 'auto'),
    },
  })

  render() {
    const {privatEntries} = this.state
    const classes = this.makeStyles
    return (
        <Paper>
          <Grid>
          <h2>Hallo {this.state.userName} schön, dass du unsere App verwendest!</h2>
          <h2>Deine persönliche Einkaufsliste - besteht aus den Listeneinträgen deiner gesamten Gruppen:</h2>
          </Grid>
      <Box m={2}/>
      <ListWithBoxes groupElements={privatEntries}/>
      </Paper>
  );
}
}
export default Startpage
