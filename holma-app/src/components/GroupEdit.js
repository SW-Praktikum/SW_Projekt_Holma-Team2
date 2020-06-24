import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import MemberAddDialog from '../components/dialogs/MemberAddDialog';
import ListWithBoxes from './ListWithBoxes'
import GroupAddDialog from './dialogs/GroupAddDialog';
import Paper from '@material-ui/core/Paper';


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
    <MemberAddDialog/>
      </div>
  );
}}

class MemberCards extends Component{
  render(){
    return(
      <Grid item xs={8} sm={4}>
          <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
            <CardActionArea >
            <CardContent>
                <Typography className="title" style={{fontSize: 14}} color="textPrimary">{this.props.member.getName()}</Typography>
            </CardContent>
            </CardActionArea>    
          </Card> 
      </Grid>
    );
  }
}

class MemberDetails extends Component{
  constructor(props){
    super(props);
    this.state ={
        elements:[],
        loadingInProgress: false,
        loadingError: null,
    }
  }
  componentDidMount(){
    if(this.props.member){
      this.loadMembers();
    }
  }

  loadMembers = () => {
    const {member} = this.props
      AppAPI.getAPI().getUsers().then(members =>{
        console.log("Loaded members:" + members)
        var elements = members.map((member) =>
        <Grid key={member.getId()} item xs={4}>
            <Paper className="paper" style ={{ textAlign:'center',}} >
              <MemberCards key={member.getId()} member={member}/>
            </Paper>
          </Grid>
      )

      this.setState({
        elements: elements,
        loadingInProgress: true,
        loadingError: null
      })
    }).catch(e =>
      this.setState({
        loadingInProgress: false,
        loadingError: e
      })
      );
}

    render(){
      const {elements} = this.state;
      return(
        <div>
            <ListWithBoxes elements={elements}/>
            <MemberAddDialog member={this.props.member} loadMembers={this.loadMembers}/> 
          </div>
      );
    }
}

export default MemberDetails;
