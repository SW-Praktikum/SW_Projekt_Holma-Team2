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
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import GroupEntries from './GroupEntries';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';




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
          <Typography variant="h6" gutterBottom>AppAPI.getAPI().get</Typography>
          <Fab size="small" color="secondary" aria-label="edit">
                <EditIcon />
          </ Fab>
        </Grid>
        <Grid item xs={8} sm={2}>
        
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
      <Typography variant="h6" gutterBottom>Groupmembers:</Typography>
      </div>
  );
}}

class MemberCard extends Component{
  render(){
    return(
      <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
      <CardActionArea >
            <CardContent>
                <Typography className="title" style={{fontSize: 14}} color="textPrimary">{this.props.member.getName()}</Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={"/user/"}>
                <Button size="small">Anzeigen</Button>
              </Link>
            </CardActions>
          </Card> 
    );
  }
}

class MemberDetails extends Component{
  constructor(props){
    super(props);
    console.log("Props:", props)
    this.state ={
      memberElements: [],
      groupDetail:AppAPI.getAPI().getGroupById(this.props.match.param.groupId),
      loadingInProgress: false,
      loadingError: null,
    }
  }
  componentDidMount(){
    if(this.props.match.params.groupId){
       this.loadMembers();
     }
  }

  loadMembers = () => {
      AppAPI.getAPI().getUsersByGroupId(this.props.match.params.groupId).then((members) => {
        var memberElements = members.map((member) => 
            <MemberCard key={this.props.location.groupId} member={member}/>
        );

      this.setState({
        memberElements: memberElements,
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
      const {memberElements} = this.state;
      this.loadMembers = this.loadMembers.bind(this)
      return(
        <div>
          <GroupInformation group = {this.state.groupDetail}/>
          <ListWithBoxes groupElements={memberElements}/>
          <MemberAddDialog member={this.state.members} loadMembers={this.loadMembers}/> 
          </div>
      );
    }
}

export default MemberDetails;
